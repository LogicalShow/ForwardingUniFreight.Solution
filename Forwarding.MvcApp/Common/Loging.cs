using Forwarding.MvcApp.AutoMapperConfig;
using Forwarding.MvcApp.Entities.Logs;
using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
//using System.Web.Script.Serialization;
//using System.Text.Json;
//using WebMatrix.WebData;

namespace Forwarding.MvcApp.Common
{
    public  static class Logging
    {

        public static Exception Save<T>(ref  T logClass,int recordID, string OperationCode = "0") {
            //var logSerializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            //string log = logSerializer.Serialize(logClass);
            string log = JsonConvert.SerializeObject(logClass);
            var loggingEntity = new CTransactionsLog();
            loggingEntity.lstCVarTransactionsLog.Add(new CVarTransactionsLog() 
            { 
                LogTableName = typeof(T).Name.Substring(4) ,
                RecordID =  recordID, 
                Log = log ,
                OpertionCode = OperationCode,
                ParentCode = "",
                Code = "",
                ParentID = 0
               
            });
            var ex = loggingEntity.SaveMethod(loggingEntity.lstCVarTransactionsLog);

            return ex;
           
        }
        // Because we cand assign to generic , creatorUserName will be set using reflection
        private static bool TrySetProperty(object obj, string property, object value)
        {
            var prop = obj.GetType().GetProperty(property, BindingFlags.Public | BindingFlags.Instance);
            if (prop != null && prop.CanWrite)
            {
                prop.SetValue(obj, value, null);
                return true;
            }
            return false;
        }
        public static MemoryStream GetList<TSource,TDesination>(Int32 recordID , String tableName, String OperationCode = "0")
        {
            Exception ex = null;
            var loggingEntity = new CTransactionsLog();
            //var logSerializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            List<TDesination> logRecord = new List<TDesination>();
            
            if (OperationCode == "0")
            {
                ex = loggingEntity.GetList($"Where RecordID = {recordID} and LogTableName = '{tableName}'");
            } else
            {
                ex = loggingEntity.GetList($"Where OpertionCode ='{OperationCode}' and LogTableName = '{tableName}'");
            }

            if (ex == null && loggingEntity.lstCVarTransactionsLog.Count != 0)
            {
                foreach (var item in loggingEntity.lstCVarTransactionsLog)
                {
                    var logDesc = JsonConvert.DeserializeObject<TSource>(item.Log);
                    TDesination log;
                    try
                    {
                        log = AutoMap.Mapper.Map<TDesination>(logDesc);
                        TrySetProperty(log, "CreatorName", item.CreatorName);
                        TrySetProperty(log, "ModificationDate", item.CreationDate.ToString());
                        logRecord.Add(log);
                    }
                    catch (Exception)
                    {
                        // Incase of bad projection 

                    }
                   
                    
                    
                }
            }
            //return null;
            using (ExcelPackage pck = new ExcelPackage())
            {
                pck.Workbook.Worksheets.Add("Log").Cells[1, 1].LoadFromCollection(logRecord, true);
                var memoryStream = new MemoryStream(pck.GetAsByteArray());
                return memoryStream;
            }
        }
        

    }

    public class baseLog
    {
        public String CreatorName { get; set; }
        public String ModificatorName { get; set; }
        public String ModificationDate { get; set; }
     }
}
