using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;

namespace Forwarding.MvcApp.DocAi
{
    // Reads DocAi configuration and support settings from Web.config appSettings.
    // The secrets (ApiKey, WebhookSecret1/2) come from App_Data\docai.secrets.config
    // through the appSettings "file" attribute — never from source control.
    public static class DocAiSettings
    {
        public static bool Enabled =>
            string.Equals(Value("DocAi:Enabled"), "true", StringComparison.OrdinalIgnoreCase);

        // "Demo": no call leaves the server (see DocAiDemo). Anything else: the real DocAi service.
        public static bool IsDemo => string.Equals(Value("DocAi:Mode"), "Demo", StringComparison.OrdinalIgnoreCase);

        // Only Off disables remote result polling; absent/unknown values preserve production behavior.
        public static bool RemotePolling =>
            !string.Equals(Value("DocAi:RemotePolling"), "Off", StringComparison.OrdinalIgnoreCase);

        public static string SupportName =>
            string.IsNullOrWhiteSpace(Value("DocAi:SupportName")) ? "IST" : Value("DocAi:SupportName");

        public static object SupportContact
        {
            get
            {
                return new
                {
                    name = SupportName,
                    email = Value("DocAi:SupportEmail"),
                    phone = Value("DocAi:SupportPhone"),
                    url = SafeSupportUrl(Value("DocAi:SupportUrl"))
                };
            }
        }

        internal static string SafeSupportUrl(string value)
        {
            Uri uri;
            if (!Uri.TryCreate(value, UriKind.Absolute, out uri))
            {
                return null;
            }

            bool supportedScheme = uri.Scheme == "https" || uri.Scheme == "mailto" || uri.Scheme == "tel";
            return supportedScheme ? value : null;
        }

        public static string BaseUrl => Required("DocAi:BaseUrl");

        public static string ApiKey => Required("DocAi:ApiKey");

        public static TimeSpan TransferBudget => TimeSpan.FromSeconds(Number("DocAi:TransferBudgetSeconds", 120));

        public static int ResultRetentionMonths => Number("DocAi:ResultRetentionMonths", 13);

        // Two slots during a rotation; an empty slot is skipped.
        public static IEnumerable<byte[]> WebhookSecrets
        {
            get
            {
                var slots = new[]
                {
                    Value("DocAi:WebhookSecret1"),
                    Value("DocAi:WebhookSecret2")
                };
                return slots.Where(secret => !string.IsNullOrWhiteSpace(secret))
                    .Select(Convert.FromBase64String).ToList();
            }
        }

        private static string Value(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        private static string Required(string key)
        {
            string value = Value(key);
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ConfigurationErrorsException("DocAi: the setting " + key + " is missing.");
            }

            return value;
        }

        private static int Number(string key, int fallback)
        {
            int value;
            bool parsed = int.TryParse(Value(key), NumberStyles.Integer, CultureInfo.InvariantCulture, out value);
            return parsed && value > 0 ? value : fallback;
        }
    }
}
