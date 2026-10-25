//using Shipping.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using Forwarding.MvcApp.Models.Customized;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

using Forwarding.MvcApp.Models.ReceiptsAndPayments.ShipLinkEGL.Generated;

namespace Forwarding.MvcApp.Controllers.Sales.API_MasterData
{
    public class ServicesTempController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadAll(string pWhereClause, string pOrderBy)
        {
            Exception checkException = null;
            CvwServiceTypeTemp objCvwA_CostCenters = new CvwServiceTypeTemp();
            pWhereClause = " WHERE " + pWhereClause;
            checkException = objCvwA_CostCenters.GetList(pWhereClause + " ORDER BY " + pOrderBy);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };

            return new object[] {
                serializer.Serialize(objCvwA_CostCenters.lstCVarvwServiceTypeTemp)
            };

            //CCustomizedDBCall b = new CCustomizedDBCall();
            //DataTable dtvwA_SubAccounts =  b.("select* from vwA_SubAccounts WHERE IsMain = 1 AND SUBSTRING(RealSubAccountCode,1, 1)= '3' AND ID IN(SELECT SubAccount_ID from A_SubAccounts_Details)");
        }
        ////[HttpGet, HttpPost]
        ////public Object[] GetServiceType(string pWhereClause, string pOrderBy)
        ////{
        ////    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
        ////    DataTable dtGetGroupSubAccounts1 = objCCustomizedDBCall.ExecuteQuery_DataTable("geterviceType");
        ////    CVarServicesTemp ObjCVarPS_Suppliers = new CVarServicesTemp();
        ////    CServicesTemp objCSuppliers = new CServicesTemp();
        ////    for (int i = 0; i < dtGetGroupSubAccounts1.Rows.Count; i++)
        ////    {
        ////       // ObjCVarPS_Suppliers.mServiceType = Convert.ToInt32(dtGetGroupSubAccounts1.Rows[i]["ID"].ToString());
        ////        ObjCVarPS_Suppliers.mServiceName = dtGetGroupSubAccounts1.Rows[i]["Purchase"].ToString();
        ////        objCSuppliers.lstCVarServicesTemp.Add(ObjCVarPS_Suppliers);
        ////    }
        ////    return new Object[] { new JavaScriptSerializer().Serialize(objCSuppliers.lstCVarServicesTemp) };
        ////}
        [HttpGet, HttpPost]
        public Object[] IntializeData(string pID) //pID : AccountID
        {
            int _RowCount = 0;

            if (pID == null)
            {
                CvwA_Accounts objCA_Accounts = new CvwA_Accounts();
               // CA_Accounts objCA_Accounts = new CA_Accounts();
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                // CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                //objCA_Accounts.GetList("Where 1 = 1");
                objCA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount);
                // cA_SubAccounts.GetList("where ID IN(select SubAccountID from ServicesTemp)");
                return new Object[] { new JavaScriptSerializer().Serialize(objCA_Accounts.lstCVarvwA_Accounts), new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
            else
            {
                CA_SubAccounts cA_SubAccounts = new CA_SubAccounts();
                cA_SubAccounts.GetList("where Parent_ID = "+ pID + "");
                return new Object[] {  new JavaScriptSerializer().Serialize(cA_SubAccounts.lstCVarA_SubAccounts) };
            }
        }


        // [Route("/api/ServicesTemp/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwServicesTemp objCServicesTemp = new CvwServicesTemp();
            //objCvwServicesTemp.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwServicesTemp.lstCVarServicesTemp.Count;
            
            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where Name LIKE '%" + pSearchKey + "%' "
                + " OR AccountName LIKE '%" + pSearchKey + "%' "
            +" OR SubAccountName LIKE '%" + pSearchKey + "%' ";

            objCServicesTemp.GetListPaging(pPageSize, pPageNumber, whereClause, " Name ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(objCServicesTemp.lstCVarvwServicesTemp), _RowCount };
        }

        // [Route("/api/ServicesTemp/Insert/{pCode}/{pModificatorUser}/{pLocalName}}")]
        [HttpGet, HttpPost]
        public bool Insert(
            string pName,
            String pAccountID, 
            String pSubAccountID,
            String ptaxID,
            Int32 pIsPurchase,
            string pPortalCode,
           String pAccountID2,
           String pSubAccountID2
            )
        {
            bool _result = false;

            CVarServicesTemp objCVarServicesTemp = new CVarServicesTemp();
            objCVarServicesTemp.Name = pName;
            objCVarServicesTemp.PortalCode = pPortalCode;

            objCVarServicesTemp.AccountID = int.Parse(pAccountID);
            objCVarServicesTemp.SubAccountID = int.Parse(pSubAccountID);
            objCVarServicesTemp.taxID = int.Parse(ptaxID);
            objCVarServicesTemp.mIsPurchase = pIsPurchase;
            objCVarServicesTemp.AccountID2 = int.Parse(pAccountID2);
            objCVarServicesTemp.SubAccountID2 = int.Parse(pSubAccountID2);
            CServicesTemp objCServicesTemp = new CServicesTemp();
            objCServicesTemp.lstCVarServicesTemp.Add(objCVarServicesTemp);
            Exception checkException = objCServicesTemp.SaveMethod(objCServicesTemp.lstCVarServicesTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(
            string pID ,
           string pName,
           String pAccountID,
           String pSubAccountID,
           String ptaxID,
            Int32 pIsPurchase,
            string pPortalCode,
             String pAccountID2,
           String pSubAccountID2
           )
        {
            bool _result = false;

            CVarServicesTemp objCVarServicesTemp = new CVarServicesTemp();
            objCVarServicesTemp.ID = int.Parse( pID );
            objCVarServicesTemp.Name = pName;
            objCVarServicesTemp.PortalCode = pPortalCode;

            objCVarServicesTemp.AccountID = int.Parse(pAccountID);
            objCVarServicesTemp.SubAccountID = int.Parse(pSubAccountID);
            objCVarServicesTemp.taxID = int.Parse(ptaxID);
            objCVarServicesTemp.mIsPurchase = pIsPurchase;
            objCVarServicesTemp.AccountID2 = int.Parse(pAccountID2);
            objCVarServicesTemp.SubAccountID2 = int.Parse(pSubAccountID2);
            CServicesTemp objCServicesTemp = new CServicesTemp();
            objCServicesTemp.lstCVarServicesTemp.Add(objCVarServicesTemp);
            Exception checkException = objCServicesTemp.SaveMethod(objCServicesTemp.lstCVarServicesTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else //not unique
                _result = true;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pServicesTempIDs)
        {
            bool _result = false;
            CServicesTemp objCServicesTemp = new CServicesTemp();
            foreach (var currentID in pServicesTempIDs.Split(','))
            {
                objCServicesTemp.lstDeletedCPKServicesTemp.Add(new CPKServicesTemp() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCServicesTemp.DeleteItem(objCServicesTemp.lstDeletedCPKServicesTemp);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("DELETE")) // some or all of the rows were not deleted due to dependencies
                    _result = false;
            }
            else //deleted successfully
                _result = true;
            return _result;
        }
    }
}
