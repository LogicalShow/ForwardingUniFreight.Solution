using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Web.Script.Serialization;

namespace Forwarding.MvcApp.DocAi
{
    // Validates JSON tokens and records original value spans without converting canonical result values.
    internal sealed class DocAiJsonScanner
    {
        private readonly string text;
        internal int Position;

        internal DocAiJsonScanner(string value)
        {
            text = value;
        }

        internal void SkipWhitespace()
        {
            while (Position < text.Length && " \r\n\t".IndexOf(text[Position]) >= 0)
            {
                Position++;
            }
        }

        internal Dictionary<string, string> ReadObject(int depth, bool capture)
        {
            Expect('{');
            var members = capture ? new Dictionary<string, string>(StringComparer.Ordinal) : null;
            if (TryConsume('}'))
            {
                return members;
            }

            do
            {
                string key = ReadString();
                Expect(':');
                SkipWhitespace();
                int start = Position;
                ReadValue(depth + 1);
                if (capture)
                {
                    string name = new JavaScriptSerializer().Deserialize<string>(key);
                    if (string.IsNullOrEmpty(name) || members.ContainsKey(name))
                    {
                        throw InvalidJson();
                    }

                    members.Add(name, text.Substring(start, Position - start));
                }

                if (TryConsume('}'))
                {
                    return members;
                }
            }
            while (TryConsume(','));

            throw InvalidJson();
        }

        private bool TryConsume(char character)
        {
            SkipWhitespace();
            if (Position < text.Length && text[Position] == character)
            {
                Position++;
                return true;
            }

            return false;
        }

        private void Expect(char character)
        {
            if (!TryConsume(character))
            {
                throw InvalidJson();
            }
        }

        private string ReadString()
        {
            SkipWhitespace();
            int start = Position;
            Expect('"');
            while (Position < text.Length)
            {
                char character = text[Position++];
                if (character == '"')
                {
                    return text.Substring(start, Position - start);
                }

                if (character < 32)
                {
                    throw InvalidJson();
                }

                if (character != '\\')
                {
                    continue;
                }

                if (Position == text.Length)
                {
                    throw InvalidJson();
                }

                char escape = text[Position++];
                if (escape == 'u')
                {
                    for (int i = 0; i < 4; i++)
                    {
                        if (Position == text.Length || !Uri.IsHexDigit(text[Position++]))
                        {
                            throw InvalidJson();
                        }
                    }
                }
                else if ("\"\\/bfnrt".IndexOf(escape) < 0)
                {
                    throw InvalidJson();
                }
            }

            throw InvalidJson();
        }

        private void ReadValue(int depth)
        {
            if (depth > 128)
            {
                throw InvalidJson();
            }

            SkipWhitespace();
            if (Position == text.Length)
            {
                throw InvalidJson();
            }

            char character = text[Position];
            if (character == '{')
            {
                ReadObject(depth, false);
                return;
            }

            if (character == '"')
            {
                ReadString();
                return;
            }

            if (TryConsume('['))
            {
                if (TryConsume(']'))
                {
                    return;
                }

                do
                {
                    ReadValue(depth + 1);
                    if (TryConsume(']'))
                    {
                        return;
                    }
                }
                while (TryConsume(','));

                throw InvalidJson();
            }

            int start = Position;
            while (Position < text.Length && ",]} \t\r\n".IndexOf(text[Position]) < 0)
            {
                Position++;
            }

            string token = text.Substring(start, Position - start);
            if (token != "true" && token != "false" && token != "null")
            {
                bool number = Regex.IsMatch(
                    token,
                    @"\A-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?\z",
                    RegexOptions.CultureInvariant);
                if (!number)
                {
                    throw InvalidJson();
                }
            }
        }

        private static ArgumentException InvalidJson()
        {
            return new ArgumentException("DocAi: invalid v2 response.");
        }
    }
}
