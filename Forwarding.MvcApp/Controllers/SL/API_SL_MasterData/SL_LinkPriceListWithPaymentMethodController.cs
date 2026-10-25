using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.SL.SL_MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.MasterData.API_Invoicing
{
    public class SL_LinkPriceListWithPaymentMethodController : ApiController
    {
        [HttpGet, HttpPost]
        public bool CheckIfItemFound(Int64 pPriceListID, Int64 pPaymentTermsID, Int64 pID)
        {
            bool _result = false;

            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("SL_CheckIfItemFoundLinkPriceListWithPaymentMethod " + pPriceListID + "," + pPaymentTermsID + "," + pID);
            if (dt.Rows.Count > 0)
            {
                _result = true;
            }
            else
            {
                _result = false;

            }
            return _result;

        }
        [HttpGet, HttpPost]
        //sherif: to be used in select boxes
        public Object[] LoadAll(string pWhereClause)
        {
            CvwSL_LinkPriceListWithPaymentMethod objCvwSL_LinkPriceListWithPaymentMethod = new CvwSL_LinkPriceListWithPaymentMethod();
            CI_PriceList cI_PriceList = new CI_PriceList();
            CNoAccessPaymentType cNoAccessPaymentType = new CNoAccessPaymentType();
            CPaymentTerms objCPaymentTerms = new CPaymentTerms();
            objCvwSL_LinkPriceListWithPaymentMethod.GetList(pWhereClause);
            cI_PriceList.GetList("where 1 = 1");
            //cNoAccessPaymentType.GetList("where 1 = 1");
            objCPaymentTerms.GetList("where 1 = 1");

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwSL_LinkPriceListWithPaymentMethod.lstCVarvwSL_LinkPriceListWithPaymentMethod),
                new JavaScriptSerializer().Serialize(cI_PriceList.lstCVarI_PriceList),
                new JavaScriptSerializer().Serialize(objCPaymentTerms.lstCVarPaymentTerms)
            };
        }

        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwSL_LinkPriceListWithPaymentMethod objCvwSL_LinkPriceListWithPaymentMethod = new CvwSL_LinkPriceListWithPaymentMethod();
            //objCCustody.GetList(string.Empty); //GetList() fn loads without paging



            pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            Int32 _RowCount = objCvwSL_LinkPriceListWithPaymentMethod.lstCVarvwSL_LinkPriceListWithPaymentMethod.Count;
            string whereClause = " Where PriceListName LIKE N'%" + pSearchKey + "%' "
                + " OR PaymentTerm LIKE N'%" + pSearchKey + "%' ";
            objCvwSL_LinkPriceListWithPaymentMethod.GetListPaging(pPageSize, pPageNumber, whereClause, "ID", out _RowCount);


            return new Object[] { new JavaScriptSerializer().Serialize(objCvwSL_LinkPriceListWithPaymentMethod.lstCVarvwSL_LinkPriceListWithPaymentMethod), _RowCount };
        }

       
        [HttpGet, HttpPost]
        public bool Insert(Int32 pPriceListID, Int32 pPaymentTermsID, decimal pPercentage)
        {
            bool _result = false;

            CVarSL_LinkPriceListWithPaymentMethod objCVarCustody = new CVarSL_LinkPriceListWithPaymentMethod();

            objCVarCustody.ID = 0;
            objCVarCustody.PriceListID = pPriceListID;
            objCVarCustody.PaymentTermsID = pPaymentTermsID;
            objCVarCustody.Percentage = pPercentage;

            CSL_LinkPriceListWithPaymentMethod objCCustody = new CSL_LinkPriceListWithPaymentMethod();
            objCCustody.lstCVarSL_LinkPriceListWithPaymentMethod.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_LinkPriceListWithPaymentMethod);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, Int32 pPriceListID, Int32 pPaymentTermsID, decimal pPercentage)
        {
            bool _result = false;

            CVarSL_LinkPriceListWithPaymentMethod objCVarCustody = new CVarSL_LinkPriceListWithPaymentMethod();

            //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
            CSL_LinkPriceListWithPaymentMethod objCGetCreationInformation = new CSL_LinkPriceListWithPaymentMethod();
            
            objCVarCustody.ID = pID;
            objCVarCustody.PriceListID = pPriceListID;
            objCVarCustody.PaymentTermsID = pPaymentTermsID;
            objCVarCustody.Percentage = pPercentage;

            CSL_LinkPriceListWithPaymentMethod objCCustody = new CSL_LinkPriceListWithPaymentMethod();
            objCCustody.lstCVarSL_LinkPriceListWithPaymentMethod.Add(objCVarCustody);
            Exception checkException = objCCustody.SaveMethod(objCCustody.lstCVarSL_LinkPriceListWithPaymentMethod);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pSL_LinkPriceListWithPaymentMethodIDs)
        {
            bool _result = false;
            CSL_LinkPriceListWithPaymentMethod objCCustody = new CSL_LinkPriceListWithPaymentMethod();
            foreach (var currentID in pSL_LinkPriceListWithPaymentMethodIDs.Split(','))
            {
                objCCustody.lstDeletedCPKSL_LinkPriceListWithPaymentMethod.Add(new CPKSL_LinkPriceListWithPaymentMethod() { ID = Int32.Parse(currentID.Trim()) });
            }

            Exception checkException = objCCustody.DeleteItem(objCCustody.lstDeletedCPKSL_LinkPriceListWithPaymentMethod);
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
