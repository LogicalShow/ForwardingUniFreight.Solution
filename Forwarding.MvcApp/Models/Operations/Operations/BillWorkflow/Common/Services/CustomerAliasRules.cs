using System.Security.Cryptography;
using System.Text;

namespace BillWorkflow.Common.Services
{
    public static class CustomerAliasRules
    {
        public static string Normalize(string value)
        {
            var result = new StringBuilder();
            foreach (var character in value ?? "")
            {
                if (!char.IsWhiteSpace(character)) result.Append(character);
                else if (result.Length > 0 && result[result.Length - 1] != ' ') result.Append(' ');
            }
            return result.ToString().TrimEnd().ToUpperInvariant();
        }

        public static byte[] GetHash(string normalizedAlias)
        {
            using (var hash = SHA256.Create())
                return hash.ComputeHash(Encoding.Unicode.GetBytes(normalizedAlias));
        }
    }
}
