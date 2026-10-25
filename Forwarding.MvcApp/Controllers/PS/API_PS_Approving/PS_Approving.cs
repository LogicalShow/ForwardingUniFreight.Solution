using Forwarding.MvcApp.Models.SC.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;
using MoreLinq;
using Forwarding.MvcApp.Models.SL.SL_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;

namespace Forwarding.MvcApp.Controllers.PS
{
    public class PS_ApprovingController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] IntializeData()
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;


            CSuppliers cSuppliers = new CSuppliers();
            CvwCurrencyDetails cCurrencies = new CvwCurrencyDetails();
            CNoAccessPaymentType cNoAccessPaymentType = new CNoAccessPaymentType();
            CA_CostCenters cA_CostCenters = new CA_CostCenters();
            CTaxeTypes objCTaxeTypes = new CTaxeTypes();

            cSuppliers.GetList("where 1 = 1 order by Name");
            cCurrencies.GetList(" where  1 = 1");
            cNoAccessPaymentType.GetList("where 1 = 1");
            cA_CostCenters.GetList("where 1 = 1");
            objCTaxeTypes.GetList("where 1 = 1");

            CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
            int _RowCount2 = 0;
            objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount2);

            return new Object[]
            {
                srialize.Serialize(cSuppliers.lstCVarSuppliers),
                srialize.Serialize(cCurrencies.lstCVarvwCurrencyDetails),
                srialize.Serialize(cNoAccessPaymentType.lstCVarNoAccessPaymentType),
                srialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) ,
                srialize.Serialize(objCTaxeTypes.lstCVarTaxeTypes.Where(x => x.IsDebitAccount == true).ToList()),
                srialize.Serialize(objCTaxeTypes.lstCVarTaxeTypes.Where(x => x.IsDebitAccount == false).ToList()),
                srialize.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts)
            };
        }

        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwPS_Invoices cPS_Invoices = new CvwPS_Invoices();
            Int32 _RowCount = 0;
            cPS_Invoices.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cPS_Invoices.lstCVarvwPS_Invoices), _RowCount };
        }

        [HttpGet, HttpPost]
        public object[] Approve(string pSelectedIDs  , bool pApproved ,string pSupplierID , int pTaxDebitID , int pTaxCreditID
            ,DateTime pJvDate)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            Exception Exception = null ;
            var ErrorMessage = "";
                CPS_PostingInvoices cSLPostingGoods = new CPS_PostingInvoices();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            string InvoiceNo = "";
            if ( (pTaxCreditID != 0 || pTaxDebitID != 0))
            {
                CvwPS_InvoicesTaxes objCvwPS_InvoicesTaxes = new CvwPS_InvoicesTaxes();
                objCvwPS_InvoicesTaxes.GetList(" Where InvoiceID in (" + pSelectedIDs + ")");

                if(objCvwPS_InvoicesTaxes.lstCVarvwPS_InvoicesTaxes.Count > 0)
                {
                    for (int i = 0; i < objCvwPS_InvoicesTaxes.lstCVarvwPS_InvoicesTaxes.Count; i++)
                    {
                        InvoiceNo = InvoiceNo + " - " + objCvwPS_InvoicesTaxes.lstCVarvwPS_InvoicesTaxes[i].InvoiceNo;
                    }
                    ErrorMessage = " Invoices With Tax " + InvoiceNo;
                }
                else if(pJvDate == Convert.ToDateTime("1900-01-01"))
                {
                    ErrorMessage = " Select JV Date " ;
                }
                else
                   Exception = objCCustomizedDBCall.SP_PS_PostingInvoicesGroubByTax("PS_PostingInvoicesGroubByTax", ","+ pSelectedIDs + ",", pJvDate, pTaxDebitID, pTaxCreditID, WebSecurity.CurrentUserId);

            }
            else
                Exception = cSLPostingGoods.GetList("," + pSelectedIDs + ",", WebSecurity.CurrentUserId, pApproved);

            CvwDefaults objCDefaults = new CvwDefaults();
            //int _RowCount2 = 0;
            //objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            //string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            //if (CompanyName == "CHM" && Exception == null)
            //{
            //    foreach (var currentID in pSelectedIDs.Split(','))
            //    {
            //        CTaxLink cCTaxLink = new CTaxLink();
            //        cCTaxLink.GetList("where notes='PS_Invoices' and originid=" + currentID);
            //        if (cCTaxLink.lstCVarTaxLink.Count > 0)
            //        {
            //            Exception = cSLPostingGoods.GetListTax("," + (cCTaxLink.lstCVarTaxLink[0].TaxID) + ",", WebSecurity.CurrentUserId, pApproved);


            //        }



            //    }

            //}
            if (Exception != null)
                ErrorMessage = Exception.Message; //cSLPostingGoods.lstCVarSLPostingGoodsReceiptNotes[0].ErrMessage;
            
            
            if(ErrorMessage.Trim() == "")
            {
                _Result = true;

            }
        
            return new Object[] { _Result, ErrorMessage };
        }
        [HttpGet, HttpPost]
        public object[] ApproveTax(string pSelectedIDs, bool pApproved, string pSupplierID, int pTaxDebitID, int pTaxCreditID
        , DateTime pJvDate,Int32 pAccountID= 0)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            Exception Exception = null;
            var ErrorMessage = "";
            CPS_PostingInvoices cSLPostingGoods = new CPS_PostingInvoices();
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();

            string InvoiceNo = "";
       

            CvwDefaults objCDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if ((CompanyName == "CHM" || CompanyName == "EGL" || CompanyName == "SWI") && Exception == null)
            {
                foreach (var currentID in pSelectedIDs.Split(','))
                {


                    ////
                    CTaxLink cCTaxLink = new CTaxLink();
                    CTaxLink objCTaxLinkFOUND = new CTaxLink();

                    objCTaxLinkFOUND.GetList("WHERE Notes='PS_Invoices' and jvid is NOT null and OriginID=" + currentID);

                    cCTaxLink.GetList("where notes='PS_Invoices' and jvid is null and originid=" + currentID);
                    if (cCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count == 0)
                    {
                        //link
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + currentID + "," + 0 + "," + "PS_Invoices");
                        cCTaxLink.GetList("where jvid is null and notes='PS_Invoices' and OriginID =" + currentID);


                    }
                    else if (cCTaxLink.lstCVarTaxLink.Count == 0 && objCTaxLinkFOUND.lstCVarTaxLink.Count > 0 && pApproved == true)
                    {
                        cCTaxLink.GetList("where jvid is null and notes='PS_Invoices' and OriginID =" + currentID);

                    }
                    else if (pApproved == false)
                    {
                        cCTaxLink.GetList("where jvid is not null and notes='PS_Invoices' and OriginID =" + currentID);
                    }

                    Exception = cSLPostingGoods.GetListTax("," + (currentID) + ",", WebSecurity.CurrentUserId, pApproved, pAccountID);

                }

            }
            if (Exception != null)
                ErrorMessage = Exception.Message; //cSLPostingGoods.lstCVarSLPostingGoodsReceiptNotes[0].ErrMessage;


            if (ErrorMessage.Trim() == "")
            {
                _Result = true;

            }

            return new Object[] { _Result, ErrorMessage };
        }
    }






}


