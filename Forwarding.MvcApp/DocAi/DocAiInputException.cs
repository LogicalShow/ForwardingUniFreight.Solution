using System;

namespace Forwarding.MvcApp.DocAi
{
    // A file the kit refuses before anything is stored or sent; the message is shown to the user as is.
    public class DocAiInputException : Exception
    {
        public string Code { get; private set; }

        public DocAiInputException(string code, string message) : base(message)
        {
            Code = code;
        }
    }
}
