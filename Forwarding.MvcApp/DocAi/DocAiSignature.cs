using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Forwarding.MvcApp.DocAi
{
    // Verifies webhook signatures to prevent body tampering and limit replay.
    // X-Signature = "sha256=" + lowercase hex of HMAC-SHA256(secret, X-Timestamp + "." + body).
    public static class DocAiSignature
    {
        public static bool LooksValid(string timestamp, string signature)
        {
            bool validTimestamp = timestamp != null
                && timestamp.Length > 0
                && timestamp.Length <= 12
                && timestamp.All(char.IsDigit);

            return validTimestamp
                && signature != null
                && signature.Length == 71
                && signature.StartsWith("sha256=", StringComparison.Ordinal)
                && signature.Skip(7).All(IsLowercaseHex);
        }

        // Compare Unix seconds directly so extreme values cannot throw during date construction.
        public static bool IsFresh(string timestamp, long windowSeconds)
        {
            long unixSeconds;
            if (!long.TryParse(timestamp, NumberStyles.None, CultureInfo.InvariantCulture, out unixSeconds))
            {
                return false;
            }

            long now = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            return unixSeconds >= now - windowSeconds && unixSeconds <= now + windowSeconds;
        }

        public static bool IsValid(string timestamp, byte[] body, string signature, IEnumerable<byte[]> secrets)
        {
            byte[] prefix = Encoding.UTF8.GetBytes(timestamp + ".");
            byte[] signed = new byte[prefix.Length + body.Length];
            Buffer.BlockCopy(prefix, 0, signed, 0, prefix.Length);
            Buffer.BlockCopy(body, 0, signed, prefix.Length, body.Length);

            // Accept either secret during rotation.
            foreach (byte[] secret in secrets)
            {
                using (var hmac = new HMACSHA256(secret))
                {
                    string hex = BitConverter.ToString(hmac.ComputeHash(signed)).Replace("-", "").ToLowerInvariant();
                    if (FixedTimeEquals("sha256=" + hex, signature))
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        private static bool IsLowercaseHex(char character)
        {
            return (character >= '0' && character <= '9') || (character >= 'a' && character <= 'f');
        }

        // .NET Framework 4.8 lacks CryptographicOperations; compare every character for equal-length inputs.
        private static bool FixedTimeEquals(string first, string second)
        {
            if (first.Length != second.Length)
            {
                return false;
            }

            int difference = 0;
            for (int i = 0; i < first.Length; i++)
            {
                difference |= first[i] ^ second[i];
            }

            return difference == 0;
        }
    }
}
