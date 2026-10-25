using Forwarding.MvcApp.Models.MasterData.Finance365;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.Finance365
{
    public class Finance365RefLogController : ApiController
    {
        public Exception Insert(Finance365RefLogInsertDto InsertDto)
        {
            Exception Ex = null; 
            CFinance365RefLog objCFinance365RefLog = new CFinance365RefLog();
            CVarFinance365RefLog objCVarFinance365RefLog = new CVarFinance365RefLog();
            List<CVarFinance365RefLog> lstCVarFinance365RefLog = new List<CVarFinance365RefLog>();

            objCVarFinance365RefLog.TableName = InsertDto.TableName;
            objCVarFinance365RefLog.RecordID = InsertDto.RecordID;
            objCVarFinance365RefLog.OldValue = InsertDto.OldValue;
            objCVarFinance365RefLog.NewValue = InsertDto.NewValue;
            objCVarFinance365RefLog.UserID = WebSecurity.CurrentUserId;
            objCVarFinance365RefLog.ModifiedOn = DateTime.Now;
            Common.Common.ReplaceNull(objCVarFinance365RefLog);
            lstCVarFinance365RefLog.Add(objCVarFinance365RefLog);
            Ex = objCFinance365RefLog.SaveMethod(lstCVarFinance365RefLog);

            return Ex;
        }
    }

    public class Finance365RefLogInsertDto
    {
        public string TableName { get; set; }
        public long RecordID { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
    }
}
