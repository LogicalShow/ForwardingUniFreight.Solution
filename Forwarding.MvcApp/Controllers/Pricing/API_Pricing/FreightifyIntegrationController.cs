using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Forwarding.MvcApp.Controllers.Pricing.API_Pricing
{
    public class FreightifyIntegrationController : ApiController
    {
        private readonly string clientID = "ea52ca40-c9f1-11ec-8a52-f1d06bcd2b53";
        private readonly string clientSecretKey = "rfaGLwBkPjL4PVEpG15Uh1B13opbXE0LMWKMukrY";
        private readonly string x_api_key = "ep4kXpuz6d860bZbChjoq7CpzLwpikRY4pLhSghK";
        private readonly string username = "test68@freightify.com";
        private readonly string password = "Alpha@123";
        private readonly string grant_type = "password";
        private readonly string url = "https://api.freightify.com";

        private string Auth()
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
             var httpClient = new HttpClient();
            var body = new
            {
                grant_type = grant_type,
                username = username,
                password = password,
            };
            //var serializedBody = JsonConvert.SerializeObject(body);
            //var content = new StringContent(serializedBody, System.Text.Encoding.UTF8, "application/json");
            //httpClient.DefaultRequestHeaders.Add("Authorization", $"Basic {Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes($"{clientID}:{clientSecretKey}"))}");
            var client = new RestClient($"{url}/oauth2/token");
            var request = new RestRequest(Method.POST);
            //request.AddHeader("Accept", "application/json");
            request.AddObject(body);
            var credentials = $"{clientID}:{clientSecretKey}";
            var base64Credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes(credentials));
            request.AddHeader("Authorization", $"Basic {base64Credentials}");
            try
            {
                var response = client.Execute(request);
                var AuthResponse = (JObject)JsonConvert.DeserializeObject(response.Content);
                string access_token = AuthResponse["access_token"].Value<string>();
                return access_token;
            }
            catch (Exception ex)
            {
            return $"An error occurred: {ex.Message}";
            }
        }
        [HttpGet]
        public async Task<string> Pricing()
        {
            var accessToken = Auth();
            var httpClient = new HttpClient();

            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
            httpClient.DefaultRequestHeaders.Add("x-api-key", x_api_key);


            var originPort = "INDIG";
           var  destinationPort = "JPTYO";
           var  departureDate = "2022-01-04";
          var  mode = "FCL";
          var  containers = "1X40GPX1000XKGs";


            //var jsonContent = JsonConvert.SerializeObject(pricingDTO);

            try
            {
                var response = await httpClient.GetAsync($"{url}/v1/prices?originPort={originPort}&destinationPort={destinationPort}&departureDate={departureDate}&mode={mode}&containers={containers}");

                if (response.IsSuccessStatusCode)
                {
                    var responseBody = await response.Content.ReadAsStringAsync();
                    var jsonObject = JsonConvert.DeserializeObject(responseBody);
                    return responseBody;
                }
                else
                {
                    return "Not Found";
                }
            }
            catch (HttpRequestException ex)
            {
                return ex.Message;
            }
        }

        public class PricingDTO
        {
            public string originPort { get; set; } = "INDIG";
            public string destinationPort { get; set; } = "JPTYO";
            public string departureDate { get; set; } = "2022-01-04";
            public string mode { get; set; } = "FCL";
            public string containers { get; set; } = "1X40GPX1000XKGs";
        }





    }
}
