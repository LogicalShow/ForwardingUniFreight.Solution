using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Forwarding.MvcApp.Common
{
    public static class CreateResponse
    {
        public static HttpResponseMessage Create(MemoryStream stream)
        {
            // processing the stream.
            HttpRequestMessage httpRequestMessage = new HttpRequestMessage();
            HttpResponseMessage httpResponseMessage;


            httpResponseMessage = httpRequestMessage.CreateResponse(HttpStatusCode.OK);
            httpResponseMessage.Content = new StreamContent(stream);
            //httpResponseMessage.Content = new ByteArrayContent(bookStuff.ToArray());  
            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = "Log.xlsx";
            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            return httpResponseMessage;
        }
    }
}
