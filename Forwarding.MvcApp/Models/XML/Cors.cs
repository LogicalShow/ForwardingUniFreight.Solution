using System.Web;
using System.Web.Mvc;

public class AllowCorsAttribute : ActionFilterAttribute
{
    //public override void OnActionExecuting(ActionExecutingContext filterContext)
    //{
    //    var response = HttpContext.Current.Response;
    //    response.AddHeader("Access-Control-Allow-Origin", "*"); // Change * to specific origin
    //    response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    //    response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    //    base.OnActionExecuting(filterContext);
    //}

    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        var request = HttpContext.Current.Request;
        var response = HttpContext.Current.Response;
        // Always add CORS headers if attribute is applied
        response.AddHeader("Access-Control-Allow-Origin", "*");
        response.AddHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
        response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        // If it's a preflight request (OPTIONS), short-circuit and return 200 OK
        if (request.HttpMethod == "OPTIONS")
        {
            filterContext.Result = new HttpStatusCodeResult(200);
        }
        base.OnActionExecuting(filterContext);
    }
}