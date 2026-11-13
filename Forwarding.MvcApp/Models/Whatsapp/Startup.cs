using Hangfire;
using Hangfire.SqlServer;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Forwarding.MvcApp.Models.Whatsapp.Startup))]

namespace Forwarding.MvcApp.Models.Whatsapp
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalConfiguration.Configuration
                .UseSqlServerStorage(System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ToString());

            app.UseHangfireServer(new Hangfire.Server.IBackgroundProcess[] {
                new Forwarding.MvcApp.DocAi.DocAiClient.PendingSendProcess()
            });
            app.UseHangfireDashboard("/hangfire");

            // DocAi: 15-second Pending dispatcher above; five-minute maintenance also refreshes older submissions.
            // Does nothing while DocAi:Enabled is false.
            RecurringJob.AddOrUpdate("docai-maintenance", () => Forwarding.MvcApp.DocAi.DocAiClient.RunMaintenance(), "*/5 * * * *");
        }
    }
}
