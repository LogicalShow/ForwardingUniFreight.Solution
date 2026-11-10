using System;
using System.Threading;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using WebMatrix.WebData;
using Forwarding.MvcApp.AutoMapperConfig;
namespace Forwarding.MvcApp
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode,
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {


        private static SimpleMembershipInitializer _initializer;
        private static object _initializerLock = new object();
        private static bool _isInitialized;

        protected void Application_Start()
        {
            if (!DocAi.DocAiSettings.RemotePolling)
                System.Diagnostics.Trace.TraceWarning("DocAi: remote polling is OFF; results arrive only via webhook (test mode).");
            // Code that runs on application startup 
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AutoMap.RegisterMappings();
            #region no of users
            //Application.Add("NOF_USER_SESSION", 0);

            #endregion no of users
            
            //BundleConfig.RegisterBundles(BundleTable.Bundles);
            //AuthConfig.RegisterAuth();

            LazyInitializer.EnsureInitialized(ref _initializer, ref _isInitialized, ref _initializerLock);
        }

        #region no of users
        //public void Session_Start(object sender, EventArgs e)
        //{
        //    // Code that runs when a new session is started
        //    Application["NOF_USER_SESSION"] = (int)Application["NOF_USER_SESSION"] + 1;
        //}
        //public void Session_End(object sender, EventArgs e)
        //{
        //    // Code that runs when a session ends. 
        //    // Note: The Session_End event is raised only when the sessionstate mode
        //    // is set to InProc in the Web.config file. If session mode is set to StateServer 
        //    // or SQLServer, the event is not raised.
        //    Application["NOF_USER_SESSION"] = (int)Application["NOF_USER_SESSION"] - 1;
        //}
        #endregion no of users

        public class SimpleMembershipInitializer
        {
            public SimpleMembershipInitializer()
            {
                //using (var context = new UsersContext())
                //    context.UserProfiles.Find(1);

                if (!WebSecurity.Initialized)
                    WebSecurity.InitializeDatabaseConnection("ConnectionString", "Users", "ID", "Username", autoCreateTables: false);
            }
        }
    }
}