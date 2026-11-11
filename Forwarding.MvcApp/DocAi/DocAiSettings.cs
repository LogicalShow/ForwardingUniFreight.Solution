namespace Forwarding.MvcApp.DocAi
{
    // UI-only stand-in so the "Extract with AI" views compile and show while the DocAi backend is not in this
    // solution. The browser answers the /api/DocAi calls with sample data (Scripts/DocAi/DocAiDemoData.js).
    // Delete this file when the real DocAi kit (DocAiClient.cs, which defines DocAiSettings) is added.
    public static class DocAiSettings
    {
        public static bool Enabled { get { return true; } }
        public static bool IsDemo { get { return true; } }
        public static string SupportName { get { return "IST"; } }
    }
}
