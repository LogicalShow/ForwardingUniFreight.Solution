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

            app.UseHangfireServer();
            app.UseHangfireDashboard("/hangfire");
        }
    }
}