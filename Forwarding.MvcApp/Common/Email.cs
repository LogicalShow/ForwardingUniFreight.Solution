using System;
using System.IO;
using MailKit.Net.Smtp;
using MimeKit;
using MailKit.Security;
using MailKit.Net.Imap;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;
namespace Forwarding.MvcApp.Common
{
    public class Email
    {
        private MimeMessage _message { get; set; }
        public String _err { get; set; }
        private BodyBuilder _bodyBuilder { get; set; }


        public Email()
        {
            _message = new MimeMessage();
            _bodyBuilder = new BodyBuilder();
        }

        public void To(string name, string address)
        {
            var mailboxAddress = new MailboxAddress(name, address);
            _message.To.Add(mailboxAddress);
        }
        public void To(string address)
        {
            var mailboxAddress = new MailboxAddress(string.Empty, address);
            _message.To.Add(mailboxAddress);
        }

        public void From(string name, string address)
        {
            var mailboxAddress = new MailboxAddress(name, address);
            _message.From.Add(mailboxAddress);
        }

        public void CC(string address, string name)
        {
            var mailboxAddress = new MailboxAddress(name, address);
            _message.Cc.Add(mailboxAddress);
        }
        public void CC(string address)
        {
            var mailboxAddress = new MailboxAddress(String.Empty, address);
            _message.Cc.Add(mailboxAddress);
        }

        public void Subject(string subject)
        {
            _message.Subject = subject;
        }

        public void Body(string body, bool isHtml)
        {
            if (isHtml)
            {
                _bodyBuilder.HtmlBody = body;
            }
            else
            {
                _bodyBuilder.TextBody = body;
            }
            // string textFormat = isHtml ? "Html" : "plain";
            // var _body = new TextPart(textFormat);
            // _body.Text = body;
            // _message.Body = _body;
        }

        public void Footer(string footer, bool isHtml)
        {
            string textFormat = isHtml ? "Html" : "plain";

            var _footer = new TextPart(textFormat);

            _footer.Text = isHtml ? "<br> " + footer : Environment.NewLine + footer;

            _message.Body = _footer;

        }

        public void Attachment(string name, byte[] stream)
        {
            _bodyBuilder.Attachments.Add(name, stream);
        }

        public void Attachment(string fileName, Stream stream)
        {
            _bodyBuilder.Attachments.Add(fileName, stream);
        }

        public void Attachment(string filePath)
        {
            _bodyBuilder.Attachments.Add(filePath);
        }
        public void Send(string server, string port, string username, string password)
        {
            _message.Body = _bodyBuilder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(server.TrimStart('\t'), Int32.Parse(port), false);

                    // Note: only needed if the SMTP server requires authentication
                    client.Authenticate(username, password);

                    client.Send(_message);
                    //var s = client.MessageSent;
                    client.Disconnect(true);
                }
                catch (Exception e)
                {
                    _err = e.Message;
                }
            }
        }
    }
}