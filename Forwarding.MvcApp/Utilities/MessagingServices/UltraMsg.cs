using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using RestSharp;
using System;
using System.Web.Helpers;

namespace Forwarding.MvcApp.Utilities.MessagingServices
{
	public class UltraMsg : IDisposable
	{
		string _instanceId;
		string _tokenId;

		public UltraMsg()
		{
			CDefaults objCDefaults = new CDefaults();
			objCDefaults.GetList("where 1=1");
			_instanceId = objCDefaults.lstCVarDefaults[0].AddressLine4;
			_tokenId = objCDefaults.lstCVarDefaults[0].AddressLine5;
		}
		public UltraMsg(string InstanceID, string TokenID)
		{
			_instanceId = InstanceID;
			_tokenId = TokenID;
		}

		public bool SendWhatsAppMsg(string ToNumber, string Msg)
		{
			var url = $"https://api.ultramsg.com/{_instanceId}/messages/chat";
			var client = new RestClient(url);

			var request = new RestRequest(Method.POST);
			request.AddHeader("content-type", "application/x-www-form-urlencoded");
			request.AddParameter("token", _tokenId);
			request.AddParameter("to", ToNumber);
			request.AddParameter("body", Msg);

			IRestResponse response = client.Execute(request);
			ResponseContent result = Json.Decode<ResponseContent>(response.Content);

			return result.sent;
		}
		public bool SendWhatsAppFile(string ToNumber, string Msg, byte[] FileContent)
		{
			string FileContentBase64 = Convert.ToBase64String(FileContent);

			var client = new RestClient($"https://api.ultramsg.com/{_instanceId}/messages/document");
			var request = new RestRequest(Method.POST);
			request.AddHeader("content-type", "application/x-www-form-urlencoded");
			request.AddParameter("token", _tokenId, ParameterType.GetOrPost);
			request.AddParameter("to", ToNumber, ParameterType.GetOrPost);
			request.AddParameter("document", FileContentBase64, ParameterType.GetOrPost);
			request.AddParameter("caption", Msg, ParameterType.GetOrPost);


			IRestResponse response = client.Execute(request);
			ResponseContent result = Json.Decode<ResponseContent>(response.Content);

			return result.sent;
		}
		class ResponseContent
		{
			public bool sent { get; set; }
			public string message { get; set; }
			public int id { get; set; }
		}

		#region IDisposable Support
		private bool disposedValue = false; // To detect redundant calls

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{
					// TODO: dispose managed state (managed objects).
				}

				// TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
				// TODO: set large fields to null.

				disposedValue = true;
			}
		}

		// TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
		// ~UltraMsg() {
		//   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
		//   Dispose(false);
		// }

		// This code added to correctly implement the disposable pattern.
		public void Dispose()
		{
			// Do not change this code. Put cleanup code in Dispose(bool disposing) above.
			Dispose(true);
			// TODO: uncomment the following line if the finalizer is overridden above.
			// GC.SuppressFinalize(this);
		}
		#endregion
	}
}