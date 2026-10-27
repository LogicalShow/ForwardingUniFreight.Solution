using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebMatrix.WebData;
using LogsModal = Forwarding.MvcApp.Models.Logs.Generated;
namespace Forwarding.MvcApp.Entities.Logs
{
    [Serializable]
    public class CPKTransactionsLog : LogsModal.CPKTransactionsLog
    {

    }

    [Serializable]
    public partial class CVarTransactionsLog : LogsModal.CVarTransactionsLog
    {
        //  set default for property for insert operations   
        public CVarTransactionsLog()
        {
            CreationDate = DateTime.Now;
            CreatorName = WebSecurity.CurrentUserName;
            CreatorID = WebSecurity.CurrentUserId;
        }
    }

    public partial class CTransactionsLog : LogsModal.CTransactionsLog
    {

    }
}
