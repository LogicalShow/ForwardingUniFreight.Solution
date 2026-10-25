using Forwarding.MvcApp.Entities.Operations;
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
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.PR.MasterData.Generated;
using System.Globalization;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.MasterData.Trucking.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;

namespace Forwarding.MvcApp.Controllers.SC.API_SC_Transactions
{
    public class SC_TransactionsController : ApiController
    {
        
        [HttpGet, HttpPost]
        public Object[] FillInvoicesAndRelatedData(string pTransactionTypeID, string pID, string IsForwarding_Invoice)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            //if (int.Parse(pTransactionTypeID) == 10)
            //{
            CSC_Stores cSC_Stores = new CSC_Stores();
            //CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
            CvwSC_PurchaseItemPS cPurchaseItem = new CvwSC_PurchaseItemPS();

            CPS_Invoices cPS_Invoices = new CPS_Invoices();
            CPackageTypes Units = new CPackageTypes();
            CvwSC_Transactions SC_ExminationOrder = new CvwSC_Transactions();
            CvwPS_Invoices cPS_Invoices1 = new CvwPS_Invoices();
            CPurchaseInvoice ForwardingPurchaseInvoice = new CPurchaseInvoice();
            CTruckers objCTruckers = new CTruckers();
            CPurchaseInvoice ForwardingPurchaseInvoice1 = new CPurchaseInvoice();
            CSuppliers objSuppliers = new CSuppliers();
            objSuppliers.GetList("where 1 = 1");


            if (pID == null)
            {

                cSC_Stores.GetList("where 1 = 1");
             
                //----

                cPurchaseItem.GetList("where 1 = 1");
                //----
                if (bool.Parse(IsForwarding_Invoice))
                    ForwardingPurchaseInvoice.GetList("where 1 = 1");
                else
                    cPS_Invoices.GetList("where 1 = 1");


                Units.GetList("where 1 = 1");

            }
            else
            {

                // cPurchaseInvoice
                objCTruckers.GetList("where 1 = 1");
                // cPS_Invoices1.GetList("where ID NOT In(select PurchaseInvoiceID from SC_Transactions where SC_Transactions.TransactionTypeID = 10 AND ( SC_Transactions.IsDeleted = 0 or SC_Transactions.IsDeleted IS NULL ))");
                var SC_ExminationOrderWhereCLause = "WHERE TransactionTypeID = 60 and isnull( IsApproved , 0 ) = 1  and  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select ExaminationID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 10 and  SC_Transactions.ExaminationID is not null and SC_Transactions.ID <> " + pID + ")";
                var SC_ExminationOrderWhereCLauseTotalROws = 0;
               SC_ExminationOrder.GetListPaging(10000, 1, SC_ExminationOrderWhereCLause, " ID ", out SC_ExminationOrderWhereCLauseTotalROws);


                // cPurchaseInvoice

                // cPS_Invoices1.GetList("where ID NOT In(select PurchaseInvoiceID from SC_Transactions where SC_Transactions.TransactionTypeID = 10 AND ( SC_Transactions.IsDeleted = 0 or SC_Transactions.IsDeleted IS NULL ))");
                // cPS_Invoices1.GetList("WHERE  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select PurchaseInvoiceID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 10 and PurchaseInvoiceID is not null and SC_Transactions.ID <> " + pID + ")");
                if (bool.Parse(IsForwarding_Invoice))
                    ForwardingPurchaseInvoice1.GetList("WHERE  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select ForwardingPSInvoiceID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 10 and ForwardingPSInvoiceID is not null and SC_Transactions.ID <> " + pID + ")");
                else
                    cPS_Invoices1.GetList("WHERE isnull(IsApproved , 0) = 1 and  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select PurchaseInvoiceID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 10 and PurchaseInvoiceID is not null and SC_Transactions.ID <> " + pID + ")");
                //---------

            }

            return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItemPS), //0
                serialize.Serialize(cPS_Invoices.lstCVarPS_Invoices),//1
                serialize.Serialize(cPS_Invoices1.lstCVarvwPS_Invoices),//2
                serialize.Serialize(cSC_Stores.lstCVarSC_Stores),//3
                serialize.Serialize(Units.lstCVarPackageTypes),//4
                serialize.Serialize(SC_ExminationOrder.lstCVarvwSC_Transactions) ,//5
            serialize.Serialize(ForwardingPurchaseInvoice.lstCVarPurchaseInvoice) ,//6
            serialize.Serialize(ForwardingPurchaseInvoice1.lstCVarPurchaseInvoice), //7
            serialize.Serialize(objSuppliers.lstCVarSuppliers) , //8
            serialize.Serialize(objCTruckers.lstCVarTruckers)//9
            }; //10

            // }
        }

        [HttpGet, HttpPost]
        public Object[] IntializeData(string pTransactionTypeID , int? pID)
        {
            var serialize = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };


            CSystemOptions cSystemOptions = new CSystemOptions();
            cSystemOptions.GetList(" where 1 = 1 ");

            CDefaults cDefaults = new CDefaults();
            //cDefaults.GetList(" where 1 = 1 ");
            var defcount = 0;
            cDefaults.GetListPaging(10000, 1, " WHERE 1 = 1 ", " ID ", out defcount);



            var SCConnectWithOperation = false;
            var SCHasExpenses = false;

            var SCConnectWithOperationList = cSystemOptions.lstCVarSystemOptions.Where(x => x.OptionID == 2020).ToList();
            var SCHasExpensesList = cSystemOptions.lstCVarSystemOptions.Where(x => x.OptionID == 2036).ToList();


            if (SCConnectWithOperationList == null || SCConnectWithOperationList.Count == 0 || SCConnectWithOperationList[0].OptionValue == false)
                SCConnectWithOperation = false;
            else
                SCConnectWithOperation = true;


            if (SCHasExpensesList == null || SCHasExpensesList.Count == 0 || SCHasExpensesList[0].OptionValue == false)
                SCHasExpenses = false;
            else
                SCHasExpenses = true;


            if (int.Parse(pTransactionTypeID) == 10)
            {
                CSC_Stores cSC_Stores = new CSC_Stores();
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                CPS_Invoices cPS_Invoices = new CPS_Invoices();
                CPackageTypes Units = new CPackageTypes();
                CSC_Transactions SC_ExminationOrder = new CSC_Transactions();
                CPS_Invoices cPS_Invoices1 = new CPS_Invoices();





                if (pID == null)
                {

                    cSC_Stores.GetList("where 1 = 1");
                    //----

                    cPurchaseItem.GetList("where 1 = 1 order by Name");
                    //----

                    cPS_Invoices.GetList("where 1 = 1");


                    Units.GetList("where 1 = 1");
                }
                else
                {

                    // cPurchaseInvoice

                    // cPS_Invoices1.GetList("where ID NOT In(select PurchaseInvoiceID from SC_Transactions where SC_Transactions.TransactionTypeID = 10 AND ( SC_Transactions.IsDeleted = 0 or SC_Transactions.IsDeleted IS NULL ))");
                    SC_ExminationOrder.GetList("WHERE TransactionTypeID = 60 and isnull( IsApproved , 0 ) = 1  and  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select ExaminationID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 10 and  SC_Transactions.ExaminationID is not null and SC_Transactions.ID <> " + pID + ")");




                    // cPurchaseInvoice

                    // cPS_Invoices1.GetList("where ID NOT In(select PurchaseInvoiceID from SC_Transactions where SC_Transactions.TransactionTypeID = 10 AND ( SC_Transactions.IsDeleted = 0 or SC_Transactions.IsDeleted IS NULL ))");
                    cPS_Invoices1.GetList("WHERE  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select PurchaseInvoiceID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 10 and PurchaseInvoiceID is not null and SC_Transactions.ID <> " + pID + ")");

                    //---------

                }
                
                return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem) , serialize.Serialize(cPS_Invoices.lstCVarPS_Invoices) , serialize.Serialize(cPS_Invoices1.lstCVarPS_Invoices), serialize.Serialize(cSC_Stores.lstCVarSC_Stores) , serialize.Serialize(Units.lstCVarPackageTypes) , serialize.Serialize(SC_ExminationOrder.lstCVarSC_Transactions) };

            }
            else if (int.Parse(pTransactionTypeID) == 20)
            {
                CSC_Stores cSC_Stores = new CSC_Stores();
                CvwTaxeTypes cvwTaxeTypes = new CvwTaxeTypes();
                //----
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetList("where 1 = 1");

                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                if(pID == null)
                {
                    cPurchaseItem.GetList("where 1 = 1 order by Name");
                    cSC_Stores.GetList("where 1 = 1");
                    cvwTaxeTypes.GetList("where 1 = 1");
                }



                CvwSL_Invoices cSL_Invoices = new CvwSL_Invoices(); // invo
                CvwSC_Transactions cSC_Transactions = new CvwSC_Transactions();
                CvwSL_Invoices cSL_Invoices1 = new CvwSL_Invoices(); // invo
                CvwSC_Transactions cSC_Transactions1 = new CvwSC_Transactions();
              //  CvwSC_Transactions cSC_Transactions2 = new CvwSC_Transactions();
                CvwSC_Transactions cvwGoodRecieptNotes = new CvwSC_Transactions();
                CvwSC_Transactions cvwGoodRecieptNotes1 = new CvwSC_Transactions();

                CFlexiSerial objCFlexiSerial = new CFlexiSerial();



                //ForTransO
                //CvwOperations cvwOperations = new CvwOperations();
                COperations cOperations = new COperations();
                if (pID != null && pID != 0) // for update
                {
                    // الفواتير اللي فيها كمية كفاية من الاصناف  اقدر اصرف منها
                    cSL_Invoices.GetList("WHERE ( isnull( IsApproved , 0 ) = 1 and  isnull(IsDeleted , 0 ) = 0 and isnull(RemainQuantity , 0.00 )  > 0)");
                    // الفاتورة اللي اخترتها قبل كدا
                    cSL_Invoices1.GetList("WHERE (ID = (select st.SLInvoiceID from  SC_Transactions st where st.ID = " + pID + "))");
                    // ضيفهم في الليست
                    cSL_Invoices.lstCVarvwSL_Invoices.AddRange(cSL_Invoices1.lstCVarvwSL_Invoices);


                    var cSC_TransactionsTotalROws = 0;
                    var cSC_Transactions1TotalROws = 0;


                    var cvwGoodRecieptNotesTotalROws = 0;
                    var cvwGoodRecieptNotes1TotalROws = 0;


                    if(cDefaults.lstCVarDefaults[0].UnEditableCompanyName != "ALW")
                    {
                        cSC_Transactions.GetListPaging(10000, 1, " WHERE (ID = (select st.MaterialIssueRequesitionsID from  vwSC_Transactions st where st.ID = " + pID + "))  ", " Code ", out cSC_TransactionsTotalROws);
                        cSC_Transactions1.GetListPaging(10000, 1, " WHERE (  isnull(vwSC_Transactions.IsDeleted , 0) = 0 and isnull(vwSC_Transactions.IsClosed , 0 ) = 0 and isnull(vwSC_Transactions.IsApproved , 0 ) = 1 and (SELECT SUM(isnull(MaterilaIssueRequest_RemainQty , 0.00)) FROM vwSC_TransactionsHeaderDetails WHERE ID = vwSC_Transactions.ID ) > 0 and vwSC_Transactions.TransactionTypeID = 70) ", " ID ", out cSC_Transactions1TotalROws);
                        cSC_Transactions.lstCVarvwSC_Transactions.AddRange(cSC_Transactions1.lstCVarvwSC_Transactions);
                        //cvwGoodRecieptNotes.GetListPaging(10000, 1, " WHERE (ID = (select st.ParentID from  vwSC_Transactions st where st.ID = " + pID + "))  ", " Code ", out cvwGoodRecieptNotesTotalROws);
                        //cvwGoodRecieptNotes1.GetListPaging(10000, 1, " WHERE (  isnull(vwSC_Transactions.IsDeleted , 0) = 0 and isnull(vwSC_Transactions.IsClosed , 0 ) = 0 and isnull(vwSC_Transactions.IsApproved , 0 ) = 1 and (SELECT SUM(isnull(Parent_RemainQty , 0.00)) FROM vwSC_TransactionsHeaderDetails WHERE ID = vwSC_Transactions.ID ) > 0 and vwSC_Transactions.TransactionTypeID = 10) ", " ID ", out cvwGoodRecieptNotes1TotalROws);
                        //cvwGoodRecieptNotes.lstCVarvwSC_Transactions.AddRange(cvwGoodRecieptNotes1.lstCVarvwSC_Transactions);
                    }

                    if (SCConnectWithOperation)
                    cOperations.GetList(" where (dbo.Operations.ID = (select st.OperationID from  SC_Transactions st where st.ID = " + pID + ")) or  year( OpenDate ) > 2020 ");

                }
                else
                {

                    cSL_Invoices.GetList("WHERE isnull( IsApproved , 0 ) = 1 and  isnull(IsDeleted , 0 ) = 0 and isnull(RemainQuantity , 0.00 )  > 0");

                    var cSC_TransactionsTotalROws = 0;
                    var cvwGoodRecieptNotesTotalROws = 0;

                    if (cDefaults.lstCVarDefaults[0].UnEditableCompanyName != "ALW")
                    {

                        //reuest
                        cSC_Transactions.GetListPaging(10000, 1, "where isnull(vwSC_Transactions.IsDeleted , 0) = 0 and isnull(vwSC_Transactions.IsClosed , 0 ) = 0 and isnull(vwSC_Transactions.IsApproved , 0 ) = 1  and (SELECT SUM(isnull(MaterilaIssueRequest_RemainQty , 0.00)) FROM vwSC_TransactionsHeaderDetails WHERE ID = vwSC_Transactions.ID ) > 0 and vwSC_Transactions.TransactionTypeID = 70  ", " ID ", out cSC_TransactionsTotalROws);
                        //cvwGoodRecieptNotes.GetListPaging(10000, 1, "where isnull(vwSC_Transactions.IsDeleted , 0) = 0 and isnull(vwSC_Transactions.IsClosed , 0 ) = 0 and isnull(vwSC_Transactions.IsApproved , 0 ) = 1  and (SELECT SUM(isnull(Parent_RemainQty , 0.00)) FROM vwSC_TransactionsHeaderDetails WHERE ID = vwSC_Transactions.ID ) > 0 and vwSC_Transactions.TransactionTypeID = 10  ", " ID ", out cvwGoodRecieptNotesTotalROws);

                        //cvwGoodRecieptNotes.lstCVarvwSC_Transactions = cvwGoodRecieptNotes.lstCVarvwSC_Transactions.DistinctBy(x => x.ID).ToList();

                    }




                    if (SCConnectWithOperation)
                    cOperations.GetList(" where year( OpenDate ) > 2020 ");

                }



                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CPackageTypes Units = new CPackageTypes();
                CCustomers cCustomers = new CCustomers();
                CBranches cBranches = new CBranches();
                CTRCK_Trailers cTRCK_Trailers = new CTRCK_Trailers();
                CTRCK_Equipments cTRCK_Equipments = new CTRCK_Equipments();
                CNoAccessDepartments cNoAccessDepartments = new CNoAccessDepartments();
                CExpenses cExpenses = new CExpenses();


                if (pID == null)
                {
                    cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0");
                    Units.GetList("where 1 = 1");

                    //if (cDefaults.lstCVarDefaults[0].UnEditableCompanyName != "EGL")
                    //cCustomers.GetList("where 1 = 1");
                }


                
               


              

                if (cDefaults.lstCVarDefaults[0].UnEditableCompanyName != "ALW")
                {
                    if (pID == null)
                    {
                        cBranches.GetList("where 1 = 1");
                        cTRCK_Trailers.GetList("where 1 = 1");
                        cTRCK_Equipments.GetList("where 1 = 1");
                        cNoAccessDepartments.GetList("where 1 = 1");
                        cExpenses.GetList("where 1 = 1");
                    }


                 
                }


                CvwA_Accounts objCvwA_Accounts = new CvwA_Accounts();
                int _RowCount2 = 0;

                objCvwA_Accounts.GetListPaging(9999, 1, "WHERE IsMain=0", "Name, Code", out _RowCount2);

                objCFlexiSerial.GetList("where 1 = 1 and ExportPurchaseInvoiceItemID is null");

                return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),//0
                    serialize.Serialize(""), //1
                    serialize.Serialize(""),//2
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores) , //3
                    serialize.Serialize(cSL_Invoices.lstCVarvwSL_Invoices), //4
                    serialize.Serialize(Units.lstCVarPackageTypes) , //5
                    serialize.Serialize(cSC_Transactions.lstCVarvwSC_Transactions) ,//6
                    serialize.Serialize(cA_CostCenters.lstCVarA_CostCenters), //7
                    serialize.Serialize(cOperations.lstCVarOperations), //8
                    serialize.Serialize(cBranches.lstCVarBranches) ,//9  
                    serialize.Serialize(cvwGoodRecieptNotes.lstCVarvwSC_Transactions) ,//10  
                    serialize.Serialize(cCustomers.lstCVarCustomers) , //11 ,
                    serialize.Serialize(cTRCK_Trailers.lstCVarTRCK_Trailers ), //12
                    serialize.Serialize(cTRCK_Equipments.lstCVarTRCK_Equipments ),//13
                    serialize.Serialize(cNoAccessDepartments.lstCVarNoAccessDepartments ),//14
                     serialize.Serialize(cExpenses.lstCVarExpenses ), //15
                     serialize.Serialize(cvwTaxeTypes.lstCVarvwTaxeTypes ), //16
                     serialize.Serialize(objCvwA_Accounts.lstCVarvwA_Accounts ), //17
                     serialize.Serialize(objCFlexiSerial.lstCVarFlexiSerial),//18
                     serialize.Serialize(objCTruckers.lstCVarTruckers)//19

                };



            }
            else if (int.Parse(pTransactionTypeID) == 30)
            {

                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");

                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1 order by Name");

                //----
                var CvwPurchaseInvoice_OpeningBalanceTotalROws = 0;
                CvwPurchaseInvoice_OpeningBalance cvwPurchaseInvoice_OpeningBalance = new CvwPurchaseInvoice_OpeningBalance();
                cvwPurchaseInvoice_OpeningBalance.GetListPaging(10000, 1, "WHERE  isnull(IsDeleted , 0 ) = 0 and ID NOT In(select PurchaseInvoiceOpeningBalanceID from SC_Transactions where isnull(SC_Transactions.IsDeleted , 0 ) = 0 and   SC_Transactions.TransactionTypeID = 30 and PurchaseInvoiceOpeningBalanceID is not null and SC_Transactions.ID <> " +( pID == null ? 0 : pID) + ")" , " ID " , out CvwPurchaseInvoice_OpeningBalanceTotalROws);


                //----
                return new Object[] { 
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),
                    serialize.Serialize(""),
                    serialize.Serialize(""),
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores),
                    serialize.Serialize(Units.lstCVarPackageTypes),
                    serialize.Serialize(cvwPurchaseInvoice_OpeningBalance.lstCVarvwPurchaseInvoice_OpeningBalance)

                };





            }
            else if (int.Parse(pTransactionTypeID) == 120) // Department Returns Voucher
            {
                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");
                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");


                CTRCK_Equipments cTRCK_Equipments = new CTRCK_Equipments();
                cTRCK_Equipments.GetList("where 1 = 1");

                CTRCK_Trailers cTRCK_Trailers = new CTRCK_Trailers();
                cTRCK_Trailers.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                if (pID == null)
                {
                    cPurchaseItem.GetList("where IsNull( ItemTypeID , 0 ) <> 6 order by Name");
                }

                //cPurchaseItem.GetList("where IsNull( ItemTypeID , 0 ) <> 6 order by Name");
                //-----
                CNoAccessDepartments cNoAccessDepartments = new CNoAccessDepartments();
                cNoAccessDepartments.GetList("where 1 = 1 ");
                //-----
                return new Object[] {
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),
                    serialize.Serialize(cNoAccessDepartments.lstCVarNoAccessDepartments),
                    serialize.Serialize(""),
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores),
                    serialize.Serialize(Units.lstCVarPackageTypes) ,
                    serialize.Serialize(cTRCK_Trailers.lstCVarTRCK_Trailers),
                    serialize.Serialize(cTRCK_Equipments.lstCVarTRCK_Equipments)
                };

            }
            else if (int.Parse(pTransactionTypeID) == 130) // Department Returns Voucher
            {
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                var SC_TransactionsCondition = "  where (SC_Transactions.ID not In( select isnull( vw.ParentID , 0 ) from SC_Transactions vw where isnull(vw.IsDeleted,0) = 0 and vw.ParentID is not null ) or SC_Transactions.ID   = " + (pID ==null ? 0 : pID) + ") and SC_Transactions.TransactionTypeID = 20 and isnull(SC_Transactions.IsDeleted , 0) = 0";
                cSC_Transactions.GetList(SC_TransactionsCondition);


                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");
                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");


                CTRCK_Equipments cTRCK_Equipments = new CTRCK_Equipments();
                cTRCK_Equipments.GetList("where 1 = 1");

                CTRCK_Trailers cTRCK_Trailers = new CTRCK_Trailers();
                cTRCK_Trailers.GetList("where 1 = 1");
                //----
                CPurchaseItem cPurchaseItem = new CPurchaseItem();
                if (pID == null)
                {
                    cPurchaseItem.GetList("where 1=1 order by Name");

                }
                //-----
                CNoAccessDepartments cNoAccessDepartments = new CNoAccessDepartments();
                cNoAccessDepartments.GetList("where 1 = 1 ");
                //-----
                return new Object[] {
                    serialize.Serialize(cPurchaseItem.lstCVarPurchaseItem),
                    serialize.Serialize(cNoAccessDepartments.lstCVarNoAccessDepartments),
                    serialize.Serialize(cSC_Transactions.lstCVarSC_Transactions),
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores),
                    serialize.Serialize(Units.lstCVarPackageTypes) ,
                    serialize.Serialize(cTRCK_Trailers.lstCVarTRCK_Trailers),
                    serialize.Serialize(cTRCK_Equipments.lstCVarTRCK_Equipments)
                };

            }

            else if (int.Parse(pTransactionTypeID) == 60)
            {

                CSC_Stores cSC_Stores = new CSC_Stores();
                CPackageTypes Units = new CPackageTypes();
                //CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                CvwSC_PurchaseItemPS cPurchaseItem = new CvwSC_PurchaseItemPS();

                CSuppliers suppliers = new CSuppliers();
                cSC_Stores.GetList("where 1 = 1");

                if(pID == null || pID == 0)
                {
                    //---

                    Units.GetList("where 1 = 1");
                    //----

                    cPurchaseItem.GetList("where 1 = 1");
                    //----

                    suppliers.GetList("where 1 = 1");

                }

                CPS_SupplyOrders cPS_SupplyOrders = new CPS_SupplyOrders();

                var PS_SupplyOrdersConditionCondition = " where ";
                PS_SupplyOrdersConditionCondition += " ( ";
                PS_SupplyOrdersConditionCondition += " Isnull(dbo.PS_SupplyOrders.IsApproved , 0 ) = 1 ";
                PS_SupplyOrdersConditionCondition += " AND ";
                PS_SupplyOrdersConditionCondition += " Isnull(dbo.PS_SupplyOrders.IsDeleted , 0 ) = 0 ";
                PS_SupplyOrdersConditionCondition += " AND ";
                PS_SupplyOrdersConditionCondition += " (not EXISTS (select top(1) ST.ID from dbo.SC_Transactions ST where ST.SupplyOrderID = dbo.PS_SupplyOrders.ID AND IsNull( ST.IsDeleted , 0 ) = 0 AND ST.ID <> " + (pID == null ? 0 : pID) + " )) ";
                PS_SupplyOrdersConditionCondition += " ) ";
                cPS_SupplyOrders.GetList(PS_SupplyOrdersConditionCondition);

                return new Object[] {
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItemPS), //0
                    serialize.Serialize(suppliers.lstCVarSuppliers),  //1
                    serialize.Serialize(""),  //2
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores),  //3
                    serialize.Serialize(Units.lstCVarPackageTypes) , //4
                    serialize.Serialize(cPS_SupplyOrders.lstCVarPS_SupplyOrders) , //5
                };
                
            }
            else if (int.Parse(pTransactionTypeID) == 70)
            {

                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");

                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1 order by Name");
                //----
                CCustomers Customers = new CCustomers();
                if (cDefaults.lstCVarDefaults[0].UnEditableCompanyName != "EGL")
                {
                    Customers.GetList("where 1 = 1");
                }
               
                //CSL_Invoices cSL_Invoices = new CSL_Invoices(); // invo
                //cSL_Invoices.GetList("WHERE  isnull(IsDeleted , 0 ) = 0 and (SELECT SUM(isnull(RemainQuantity , 0.00)) FROM SL_InvoicesDetails WHERE InvoiceID = SL_Invoices.ID ) > 0");
                //----
                // CPurchaseInvoice cPurchaseInvoice = new CPurchaseInvoice();
                // cPurchaseInvoice.GetList("where 1 = 1");
                // cPurchaseInvoice
                // CPurchaseInvoice cPurchaseInvoice1 = new CPurchaseInvoice();
                // cPurchaseInvoice1.GetList("where ID NOT In(select PurchaseInvoiceID from SC_Transactions where SC_Transactions.TransactionTypeID = 10 AND ( SC_Transactions.IsDeleted = 0 or SC_Transactions.IsDeleted IS NULL ))");


                return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem), serialize.Serialize(Customers.lstCVarCustomers), serialize.Serialize(""), serialize.Serialize(cSC_Stores.lstCVarSC_Stores), serialize.Serialize(Units.lstCVarPackageTypes) };

            }
            else if (int.Parse(pTransactionTypeID) == 40) // Client Returns Voucher
            {

                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");

                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1 order by Name");
                //-----
                CCustomers customers = new CCustomers();
                customers.GetList("where 1 = 1 ");
                //-----
                return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem), serialize.Serialize(customers.lstCVarCustomers), serialize.Serialize(""), serialize.Serialize(cSC_Stores.lstCVarSC_Stores), serialize.Serialize(Units.lstCVarPackageTypes) };





            }
            else if (int.Parse(pTransactionTypeID) == 50) // Supplier Returns Voucher
            {

                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");

                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1 order by Name");
                //-----
                CSuppliers suppliers = new CSuppliers();
                suppliers.GetList("where 1 = 1 ");
                //-----
                return new Object[] { serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem), serialize.Serialize(suppliers.lstCVarSuppliers), serialize.Serialize(""), serialize.Serialize(cSC_Stores.lstCVarSC_Stores), serialize.Serialize(Units.lstCVarPackageTypes) };





            }
            else if (int.Parse(pTransactionTypeID) == 80)
            {
                var TotalRows = 0;
                CvwSC_Stores cSC_Stores = new CvwSC_Stores();
                cSC_Stores.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1");
                //----
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                CvwSC_Transactions VirtualStoreTrans = new CvwSC_Transactions();
                CSC_Transactions cSC_Transactions1 = new CSC_Transactions();
                CvwSC_Transactions VirtualStoreTrans1 = new CvwSC_Transactions();
                if (pID != null && pID != 0)
                {
                    cSC_Transactions.GetList("where (  isnull(SC_Transactions.IsDeleted , 0) = 0 and isnull(SC_Transactions.IsClosed , 0 ) = 0 and isnull(SC_Transactions.IsApproved , 0 ) = 1 and (SELECT SUM(isnull(MaterilaIssueRequest_RemainQty , 0.00)) FROM vwSC_TransactionsHeaderDetails WHERE ID = SC_Transactions.ID ) > 0 and SC_Transactions.TransactionTypeID = 70) ");
                    cSC_Transactions1.GetList("where (ID = (select st.MaterialIssueRequesitionsID from  SC_Transactions st where st.ID = " + pID + "))");

                    cSC_Transactions.lstCVarSC_Transactions.AddRange(cSC_Transactions1.lstCVarSC_Transactions);
                    // VirtualStoreTrans.GetList(" WHERE (ID = (select st.TransferParentID from  SC_Transactions st where st.ID = " + pID + ")) or (  ( select Count(*) from SC_Transactions s where s.TransferParentID = ID ) <= 0 and isnull(IsDeleted , 0) = 0 and TransactionTypeID = 80 and IsBrokerStore <> 0) ");
                    VirtualStoreTrans.GetListPaging(10000, 1, " WHERE (   isnull(IsDeleted , 0) = 0 and  TransactionTypeID = 80 and IsBrokerStore <> 0 AND NOT EXISTS(SELECT 1 FROM SC_Transactions AS st WHERE isnull( st.IsDeleted , 0 ) = 0 and  st.TransferParentID = vwSC_Transactions.ID)) ", " ID ", out TotalRows);
                    VirtualStoreTrans1.GetListPaging(10000, 1, " WHERE (ID = (select st.TransferParentID from  SC_Transactions st where st.ID = " + pID + "))", " ID ", out TotalRows);

                    VirtualStoreTrans.lstCVarvwSC_Transactions.AddRange(VirtualStoreTrans1.lstCVarvwSC_Transactions);
                }
                else
                {
                    cSC_Transactions.GetList("where isnull(SC_Transactions.IsDeleted , 0) = 0 and isnull(SC_Transactions.IsClosed , 0 ) = 0 and isnull(SC_Transactions.IsApproved , 0 ) = 1  and (SELECT SUM(isnull(MaterilaIssueRequest_RemainQty , 0.00)) FROM vwSC_TransactionsHeaderDetails WHERE ID = SC_Transactions.ID ) > 0 and SC_Transactions.TransactionTypeID = 70 ");
                    VirtualStoreTrans.GetListPaging(10000, 1, " WHERE    isnull(IsDeleted , 0) = 0 and  TransactionTypeID = 80 and IsBrokerStore <> 0 AND NOT EXISTS(SELECT 1 FROM SC_Transactions AS st WHERE isnull( st.IsDeleted , 0 ) = 0 and  st.TransferParentID = vwSC_Transactions.ID)", " ID ", out TotalRows);
                   // VirtualStoreTrans.GetList(" WHERE   ( select Count(*) from SC_Transactions s where s.TransferParentID = ID ) <= 0 and isnull(IsDeleted , 0) = 0 and TransactionTypeID = 80 and IsBrokerStore <> 0 ");
                }


                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0");

                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");

                return new Object[] {
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem), //0
                    serialize.Serialize(cSC_Stores.lstCVarvwSC_Stores) ,//1
                    serialize.Serialize(Units.lstCVarPackageTypes) ,//2
                    serialize.Serialize(cSC_Transactions.lstCVarSC_Transactions) ,//3
                    serialize.Serialize(cA_CostCenters.lstCVarA_CostCenters) , //4 
                    serialize.Serialize(VirtualStoreTrans.lstCVarvwSC_Transactions.DistinctBy(x=> x.ID)) //5 
                };



            }
            else if (int.Parse(pTransactionTypeID) == 90)
            {
                //----
                var TotalRows = 0;
                CvwSC_Stores cSC_Stores = new CvwSC_Stores();
                cSC_Stores.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1 order by Name "); //cPurchaseItem.lstCVarvwSC_PurchaseItem[0].Name
                //----
                CPR_Lines Lines = new CPR_Lines();
                Lines.GetList("where 1 = 1");
                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");

                CPR_Stages cPR_Stages = new CPR_Stages();
                cPR_Stages.GetList("where 1 = 1");

                return new Object[] {
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem), //0
                    serialize.Serialize(cSC_Stores.lstCVarvwSC_Stores) ,//1
                    serialize.Serialize(Units.lstCVarPackageTypes) ,//2
                    serialize.Serialize(Lines.lstCVarPR_Lines) , //3
                    serialize.Serialize(cPR_Stages.lstCVarPR_Stages) , //4
                };



            }
            if (int.Parse(pTransactionTypeID) == 100)
            {
                CSC_Stores cSC_Stores = new CSC_Stores();
                CPackageTypes Units = new CPackageTypes();
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                CI_ItemsGroups cI_ItemsGroups = new CI_ItemsGroups();

                    cSC_Stores.GetList("where 1 = 1");
                    cPurchaseItem.GetList("where 1 = 1 order by Name");
                    Units.GetList("where 1 = 1");
                    cA_CostCenters.GetList("where 1 = 1");
                    cI_ItemsGroups.GetList("where 1 = 1");


                return new Object[] {
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores),
                    serialize.Serialize(Units.lstCVarPackageTypes),
                    serialize.Serialize(cA_CostCenters.lstCVarA_CostCenters),
                     serialize.Serialize(cI_ItemsGroups.lstCVarI_ItemsGroups)
                };

            }
            else if (int.Parse(pTransactionTypeID) == 110)
            {

                CSC_Stores cSC_Stores = new CSC_Stores();
                cSC_Stores.GetList("where 1 = 1");

                CA_CostCenters cA_CostCenters = new CA_CostCenters();
                cA_CostCenters.GetList("where isnull(IsMain , 0 ) = 0");

                //---
                CPackageTypes Units = new CPackageTypes();
                Units.GetList("where 1 = 1");
                //----
                CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
                cPurchaseItem.GetList("where 1 = 1 order by Name");


                return new Object[] {
                    serialize.Serialize(cSC_Stores.lstCVarSC_Stores),
                    serialize.Serialize(cA_CostCenters.lstCVarA_CostCenters),
                    serialize.Serialize(Units.lstCVarPackageTypes),
                    serialize.Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem)


                };





            }

            else
            {
                //CA_Accounts objCA_Accounts = new CA_Accounts();
                //CA_CostCenters objCA_CostCenters = new CA_CostCenters();
                //CSC_Stores cSC_Stores = new CSC_Stores();
                //objCA_Accounts.GetList("Where 1 = 1");
                //objCA_CostCenters.GetList("Where 1 = 1");
                //cSC_Stores.GetList("where 1 = 1");
                return new Object[] { new JavaScriptSerializer().Serialize("")};
            }
        }
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey , string pTransactionTypeID)
        {
           // de;
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            //objCvwSC_Stores.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwSC_Stores.lstCVarSC_Stores.Count;
         //   "Where TransactionTypeID = 10 AND ( IsDeleted = 0 or IsDeleted IS NULL )"
            cSC_Transactions.GetListPaging(pPageSize, pPageNumber, ("where TransactionTypeID = " + pTransactionTypeID ) + "AND ( IsDeleted = 0 or IsDeleted IS NULL )", " Code desc ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(cSC_Transactions.lstCVarSC_Transactions), _RowCount };
        }

      //  GetInvoiceTaxesDiscout()
        [HttpGet, HttpPost]
        public object[] GetInvoiceTaxesDiscout(string pInvoiceID, string pInvoiceType /*   1 : [SL] , 2 : [PS]  */)
        {
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            if (int.Parse(pInvoiceType) == 1)
            {
                CvwSL_InvoiceDiscountTaxes cvwSL_InvoiceDiscountTaxes = new CvwSL_InvoiceDiscountTaxes();
                cvwSL_InvoiceDiscountTaxes.GetList(" where VALUE <> 0 and InvoiceID = " + pInvoiceID);

                var TaxesList = cvwSL_InvoiceDiscountTaxes.lstCVarvwSL_InvoiceDiscountTaxes.Where(x => x.IsTax == true).ToList();
                var Discount =  cvwSL_InvoiceDiscountTaxes.lstCVarvwSL_InvoiceDiscountTaxes.Where(x => x.IsTax == false).ToList();


                return new Object[] { serializer.Serialize(TaxesList) , serializer.Serialize(Discount) };

            }
            else
            {
                CvwPS_InvoiceDiscountTaxes cvwPS_InvoiceDiscountTaxes = new CvwPS_InvoiceDiscountTaxes();
                cvwPS_InvoiceDiscountTaxes.GetList("where InvoiceID = " + pInvoiceID);

                var TaxesList = cvwPS_InvoiceDiscountTaxes.lstCVarvwPS_InvoiceDiscountTaxes.Where(x => x.IsTax == true).ToList();
                var Discount = cvwPS_InvoiceDiscountTaxes.lstCVarvwPS_InvoiceDiscountTaxes.Where(x => x.IsTax == false).ToList();


                return new Object[] { serializer.Serialize(TaxesList), serializer.Serialize(Discount) };

            }

        }






        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwSC_Transactions cSC_Transactions = new CvwSC_Transactions();
            Int32 _RowCount = 0;
            cSC_Transactions.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cSC_Transactions.lstCVarvwSC_Transactions), _RowCount };
        }


          [HttpGet, HttpPost]
        public object[] LoadWithWhereClauseEGL(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            CvwSC_Transactions cSC_Transactions = new CvwSC_Transactions();
            Int32 _RowCount = 0;
            //--
  

            cSC_Transactions.GetListPagingEGL(pPageSize, pPageNumber, pWhereClause, " ID DESC ", out _RowCount);
            var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
            return new Object[] { serializer.Serialize(cSC_Transactions.lstCVarvwSC_Transactions), _RowCount };



     

        }

      


        [HttpGet, HttpPost]
        public Object[] LoadItems(string pWhereClause)
        {
            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            if (pWhereClause.Contains("10 = 10 AND \'**Load Items From PS_Inv**' = '**Load Items From PS_Inv**\'")) // ******(10 = 10 "GoodReceiptNotes")  fill the transaction from invoice**********
            {
                CvwPS_InvoicesDetails objPurchaseInvoiceItem = new CvwPS_InvoicesDetails();
                int TotalRows = 10000;
                objPurchaseInvoiceItem.GetListPaging(10000, 1, pWhereClause + " and D_ItemID is not null", " ID ", out TotalRows);


                return new Object[] { srialize.Serialize(objPurchaseInvoiceItem.lstCVarvwPS_InvoicesDetails) };
            }
            else if (pWhereClause.Contains("10 = 10 AND '**Load Items From Forw_Inv**' = '**Load Items From Forw_Inv**")) // ******(10 = 10 "GoodReceiptNotes")  fill the transaction from invoice**********
            {
                CvwSC_GetPurchaseInvoiceItems objGetPurchaseInvoiceItems = new CvwSC_GetPurchaseInvoiceItems();


                int TotalRows = 10000;
                objGetPurchaseInvoiceItems.GetListPaging(10000, 1, pWhereClause + " and IsNull( IsOpeningBalance , 0 ) = 0  and ItemID is not null", " ID ", out TotalRows);
                return new Object[] { srialize.Serialize(objGetPurchaseInvoiceItems.lstCVarvwSC_GetPurchaseInvoiceItems) };
            }

            else if (pWhereClause.Contains("30 = 30 AND '**Load Items From Opening Balance Flexi**' = '**Load Items From Opening Balance Flexi**")) // ******(30 = 30 "Opening Balance")  fill the transaction from Opening Balance Flexi**********
            {
                CvwSC_GetPurchaseInvoiceItems objGetPurchaseInvoiceItems = new CvwSC_GetPurchaseInvoiceItems();

                int TotalRows = 10000;
                objGetPurchaseInvoiceItems.GetListPaging(10000, 1, pWhereClause  + " and IsOpeningBalance = 1 and ItemID is not null", " ID ", out TotalRows);

                return new Object[] { srialize.Serialize(objGetPurchaseInvoiceItems.lstCVarvwSC_GetPurchaseInvoiceItems) };
                //CvwPS_InvoicesDetails objPurchaseInvoiceItem = new CvwPS_InvoicesDetails();
                //objPurchaseInvoiceItem.GetList(pWhereClause + " and D_ItemID is not null");
                //return new Object[] { new JavaScriptSerializer().Serialize(objPurchaseInvoiceItem.lstCVarvwPS_InvoicesDetails) };
            }
            else if (pWhereClause.Contains("60 = 60 AND '**Load Items From SupplyOrder**' = '**Load Items From SupplyOrder**")) // ****** (60 = 60 "Examination Order")  fill the transaction from Supply Order Details **********
            {

                CvwPS_SupplyOrdersHeaderDetails cvwPS_SupplyOrdersHeaderDetails = new CvwPS_SupplyOrdersHeaderDetails();
                int TotalRows = 10000;
                cvwPS_SupplyOrdersHeaderDetails.GetListPaging(10000, 1, pWhereClause + " and D_ItemID is not null", " ID ", out TotalRows);

                return new Object[] { srialize.Serialize(cvwPS_SupplyOrdersHeaderDetails.lstCVarvwPS_SupplyOrdersHeaderDetails) };

            }

            //else if (pWhereClause.Contains("10 = 10 AND \'**Load Items From ExminationOrders**\' = \'**Load Items From ExminationOrders\'**")) // ******(10 = 10 "GoodReceiptNotes")  fill the transaction from invoice**********
            //{
            //    CvwPS_InvoicesDetails objPurchaseInvoiceItem = new CvwPS_InvoicesDetails();
            //    objPurchaseInvoiceItem.GetList(pWhereClause + " and D_ItemID is not null");
            //    return new Object[] { new JavaScriptSerializer().Serialize(objPurchaseInvoiceItem.lstCVarvwPS_InvoicesDetails) };
            //}
            else if (pWhereClause.Contains("20 = 20 AND \'IsFlexi\'=\'IsFlexi\'"))  // ******(20 = 20 "GoodIssueVoucher")  fill the transaction from invoice**********
            {
                CvwSL_InvoicesDetails cSL_InvoicesDetails = new CvwSL_InvoicesDetails();

                int TotalRows = 10000;
                cSL_InvoicesDetails.GetListPaging(10000, 1, pWhereClause + "and D_ItemID is not null" , " ID ", out TotalRows);
                return new Object[] { srialize.Serialize(cSL_InvoicesDetails.lstCVarvwSL_InvoicesDetails) };

                //
            }
            else if (pWhereClause.Contains("20 = 20"))  // ******(20 = 20 "GoodIssueVoucher")  fill the transaction from invoice**********
            {
                CvwSL_InvoicesDetails cSL_InvoicesDetails = new CvwSL_InvoicesDetails();
                int TotalRows = 10000;
                cSL_InvoicesDetails.GetListPaging(10000, 1, pWhereClause + "and D_ItemID is not null", " ID ", out TotalRows);
                return new Object[] { srialize.Serialize(cSL_InvoicesDetails.lstCVarvwSL_InvoicesDetails) };

                //
            }
            else if (pWhereClause.Contains("where \'SlInvoices\' = \'SlInvoices\' and 40 = 40")) // ******(40 = 40 "ClientReturnsVoucher")  get sl invoices based on Client ID**********
            {
                CvwSL_Invoices cSL_Invoices = new CvwSL_Invoices();
                cSL_Invoices.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cSL_Invoices.lstCVarvwSL_Invoices) };
            }
            else if (pWhereClause.Contains("where \'PSInvoices\' = \'PSInvoices\' and 50 = 50")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {
                CPS_Invoices cPS_Invoices = new CPS_Invoices();
                cPS_Invoices.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cPS_Invoices.lstCVarPS_Invoices) };
            }
            else if(pWhereClause.Contains("where 40 = 40 AND (select sum( td.Qty *  td.QtyFactor )")) // ******(40 = 40 "ClientReturnsVoucher") fill the transaction from invoice**********
            {
                CvwSL_InvoicesDetails cSL_InvoicesDetails = new CvwSL_InvoicesDetails();


                int TotalRows = 10000;
                cSL_InvoicesDetails.GetListPaging(10000, 1, pWhereClause + "and D_ItemID is not null", " ID ", out TotalRows);

                return new Object[] { srialize.Serialize(cSL_InvoicesDetails.lstCVarvwSL_InvoicesDetails) };
            }
            else if (pWhereClause.Contains("50 = 50 AND (select sum( td.Qty *  td.QtyFactor )")) // ******(50 = 50 "SupplierReturnsVoucher") fill the transaction from invoice**********
            {
                CvwPS_InvoicesDetails cPS_InvoicesDetails = new CvwPS_InvoicesDetails();
                int TotalRows = 10000;
                cPS_InvoicesDetails.GetListPaging(10000, 1, pWhereClause + "and D_ItemID is not null", " ID ", out TotalRows);
                return new Object[] { srialize.Serialize(cPS_InvoicesDetails.lstCVarvwPS_InvoicesDetails) };
            }
            else if (pWhereClause.Contains("where \'OutgoingReport\' = \'OutgoingReport\' and 70 = 70")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {
                int TotalRows = 10000;
                CvwSC_TransactionsHeaderDetails cvwSC_TransactionsHeaderDetails  = new CvwSC_TransactionsHeaderDetails();
                cvwSC_TransactionsHeaderDetails.GetListPaging(10000 , 1 , pWhereClause , " PurchaseInvoiceDate ", out TotalRows);
                return new Object[] { srialize.Serialize(cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails) };
            }
            else if (pWhereClause.Contains("where \'FIFO\' = \'FIFO\'")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {

                CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
                cSC_TransactionsDetails.UpdateList(" IsDeleted=1 where TransactionID = " + pWhereClause.Split('|')[2].Trim() + "");




                int TotalRows = 10000;
                CvwSC_TransactionsHeaderDetails cvwSC_TransactionsHeaderDetails = new CvwSC_TransactionsHeaderDetails();
                cvwSC_TransactionsHeaderDetails.GetListPaging(10000, 1, pWhereClause.Split('|')[0], " ID ", out TotalRows);
                List<CVarvwSC_TransactionsHeaderDetails> FIFoDetails = new List<CVarvwSC_TransactionsHeaderDetails>();
                var MaxQty = decimal.Parse( pWhereClause.Split('|')[1].Trim());
                decimal RemainQty = 0;
                if (cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails.Count > 0)
                {
                    decimal Qty = 0;
                    if (cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails[0].RemainQty >= MaxQty)
                    {
                        cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails[0].RemainQty = MaxQty;

                        FIFoDetails.Add(cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails[0]);
                    }
                    else
                    {
                        for (int i = 0; i < cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails.Count; i++)
                        {

                            Qty = cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails[i].Fifo_Qty = cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails[i].RemainQty + Qty;

                           

                            if (Qty >= MaxQty)
                            {
                                cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails[i].RemainQty = RemainQty;
                                break;
                            }
                            else
                            {
                                RemainQty = MaxQty - Qty;
                            }


                        }
                        FIFoDetails = cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails.TakeUntil(x => x.RemainQty == RemainQty).ToList();
                    }
                }


                CSC_TransactionsDetails cSC_TransactionsDetails1 = new CSC_TransactionsDetails();
                cSC_TransactionsDetails1.UpdateList(" IsDeleted=0 where TransactionID = " + pWhereClause.Split('|')[2].Trim() + "");

                return new Object[] { srialize.Serialize(FIFoDetails) };
            }
            else if (pWhereClause.Contains("where \'Details\' = \'Details\'")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {
                int TotalRows = 10000;
                CvwSC_TransactionsHeaderDetails cvwSC_TransactionsHeaderDetails = new CvwSC_TransactionsHeaderDetails();
                cvwSC_TransactionsHeaderDetails.GetListPaging(10000, 1, pWhereClause, " ID ", out TotalRows);
                return new Object[] { srialize.Serialize(cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails) };
            }
            
            else if (pWhereClause.Contains("where 130 = 130")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {
                int TotalRows = 10000;
                CvwSC_TransactionsHeaderDetails cvwSC_TransactionsHeaderDetails = new CvwSC_TransactionsHeaderDetails();
                cvwSC_TransactionsHeaderDetails.GetListPaging(10000, 1, pWhereClause, " ID ", out TotalRows);
                return new Object[] { srialize.Serialize(cvwSC_TransactionsHeaderDetails.lstCVarvwSC_TransactionsHeaderDetails) };
            }
            else if (pWhereClause.Contains("where \'Expenses\' = \'Expenses\'")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {
                int TotalRows = 10000;
                CvwSC_TransactionsExpenses cvwSC_TransactionsExpenses = new CvwSC_TransactionsExpenses();
                cvwSC_TransactionsExpenses.GetListPaging(10000, 1, pWhereClause, " ID ", out TotalRows);

                CSC_TransactionsExpensesTaxes cSC_TransactionsExpensesTaxes = new CSC_TransactionsExpensesTaxes();
                cSC_TransactionsExpensesTaxes.GetListPaging(10000, 1, pWhereClause, " ID ", out TotalRows);

                return new Object[] {
                    srialize.Serialize(cvwSC_TransactionsExpenses.lstCVarvwSC_TransactionsExpenses),
                    srialize.Serialize(cSC_TransactionsExpensesTaxes.lstCVarSC_TransactionsExpensesTaxes),
                };
            }
            else if (pWhereClause.Contains("where \'Details_Expenses\' = \'Details_Expenses\'")) // ******(50 = 50 "SupplierReturnsVoucher")  get ps invoices based on Supplier ID**********
            {


                var pTransactionID = pWhereClause.Split('|')[1];
                pWhereClause = " Where TransactionID = " + pTransactionID + " ";
                int TotalRows = 10000;
                CvwMaterialIssueVoucherFollowUp materialIssueVoucherFollowUp = new CvwMaterialIssueVoucherFollowUp();
                materialIssueVoucherFollowUp.GetListPaging(10000, 1, pWhereClause, " ID ", out TotalRows);


                return new Object[] { srialize.Serialize(materialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp.Where(x=> x._Type == "Items").ToList())

                    , srialize.Serialize(materialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp.Where(x=> x._Type == "Expenses").ToList())

                    ,srialize.Serialize( materialIssueVoucherFollowUp.lstCVarvwMaterialIssueVoucherFollowUp)
                };
            }
            else if (pWhereClause.Contains("where \'SC_MaterialIssueVoucher\' = \'SC_MaterialIssueVoucher\' and 120 = 120")) // ******(120 = 120 "DepartmentReturnsVoucher")  get approved material issue voucher based on department ID**********
            {
                int TotalRows = 10000;
                CvwSC_Transactions cvwSC_Transactions = new CvwSC_Transactions();
                cvwSC_Transactions.GetListPaging(10000, 1, pWhereClause, " Code ", out TotalRows);
                return new Object[] { srialize.Serialize(cvwSC_Transactions.lstCVarvwSC_Transactions) };
            }
            else if (pWhereClause.Split(',').Count() > 1 && pWhereClause.Split(',')[4].Contains("90=90 LoadFinalProductDetails")) // ******(50 = 50 "SupplierReturnsVoucher") fill the transaction from invoice**********
            {
                //-----
                var con = pWhereClause.Split(',');
                CPR_GetBatchesDetails cPR_GetBatchesDetails = new CPR_GetBatchesDetails();
                cPR_GetBatchesDetails.GetList(long.Parse(con[0]), int.Parse(con[1]), DateTime.ParseExact(con[2] + " 00:00:00.000", "MM/dd/yyyy HH:mm:ss.fff", CultureInfo.InvariantCulture) , int.Parse(con[3]));
                return new Object[] { srialize.Serialize(cPR_GetBatchesDetails.lstCVarPR_GetBatchesDetails) };
            }
           
            else // **********it used to fill transaction (when update) *******************
            {
                CSC_TransactionsDetails objSC_TransactionsDetails = new CSC_TransactionsDetails();
                objSC_TransactionsDetails.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(objSC_TransactionsDetails.lstCVarSC_TransactionsDetails) };
            }

        }




        [HttpGet, HttpPost]
        public Object[] LoadPartners(int? PartnerTypeID)
        {

            var srialize = new JavaScriptSerializer();
            srialize.MaxJsonLength = int.MaxValue;
            var pWhereClause = " where 1 = 1 ";
            if (PartnerTypeID == 1)
            {
                CCustomers cCustomers = new CCustomers();
                cCustomers.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cCustomers.lstCVarCustomers) };
            }
            else if (PartnerTypeID == 2)
            {
                CAgents cAgents = new CAgents();
                cAgents.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cAgents.lstCVarAgents) };
            }
            else if (PartnerTypeID == 3)
            {
                CShippingAgents cShippingAgents = new CShippingAgents();
                cShippingAgents.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cShippingAgents.lstCVarShippingAgents) };
            }
            else if (PartnerTypeID == 4)
            {
                CCustomsClearanceAgents cCustomsClearanceAgents = new CCustomsClearanceAgents();
                cCustomsClearanceAgents.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cCustomsClearanceAgents.lstCVarCustomsClearanceAgents) };
            }
            else if (PartnerTypeID == 5)
            {
                CShippingLines cCShippingLines = new CShippingLines();
                cCShippingLines.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cCShippingLines.lstCVarShippingLines) };
            }
            else if (PartnerTypeID == 6)
            {
                CAirlines cAirlines = new CAirlines();
                cAirlines.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cAirlines.lstCVarAirlines) };
            }
            else if (PartnerTypeID == 7)
            {
                CTruckers cTruckers = new CTruckers();
                cTruckers.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cTruckers.lstCVarTruckers) };
            }
            else if (PartnerTypeID == 8)
            {
                CSuppliers cSuppliers = new CSuppliers();
                cSuppliers.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cSuppliers.lstCVarSuppliers) };
            }
            else  
            {
                CCustody cCustody = new CCustody();
                cCustody.GetList(pWhereClause);
                return new Object[] { srialize.Serialize(cCustody.lstCVarCustody) };
            }

        }
        
        [HttpGet, HttpPost]
        public Object[] CalculateItemQuantityInStore(string pItemID , string pStoreID , DateTime pDate , string pTransactionID)
        {
            decimal result = 0;
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0); // new TimeSpan(19, 0, 0);

            pDate = pDate.Date + LastDayTime;
            CSC_ItemQuantityInStore cSC_ItemQuantityInStore = new CSC_ItemQuantityInStore();
          
                cSC_ItemQuantityInStore.GetList(long.Parse(pItemID) , int.Parse(pStoreID) , pDate , int.Parse(pTransactionID));
            if (cSC_ItemQuantityInStore.lstCVarSC_ItemQuantityInStore.Count > 0)
            {

                result = cSC_ItemQuantityInStore.lstCVarSC_ItemQuantityInStore[0].ItemQuantityInStore;
            }
            

            
                return new Object[] { new JavaScriptSerializer().Serialize(result) };
           

        }


        [HttpGet, HttpPost]
        public Object[] CalcItemQtyAndAveragePrice(string pItemID, string pStoreID, DateTime pDate, string pTransactionID , bool IsSpecialStore)
        {
            decimal result = 0;
            decimal result1 = 1;
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(23, 0, 0); // new TimeSpan(19, 0, 0);

            pDate = pDate.Date + LastDayTime;
            CSC_ItemQuantityInStore cSC_ItemQuantityInStore = new CSC_ItemQuantityInStore();

            cSC_ItemQuantityInStore.GetList(long.Parse(pItemID), int.Parse(pStoreID), pDate, int.Parse(pTransactionID));
            if (cSC_ItemQuantityInStore.lstCVarSC_ItemQuantityInStore.Count > 0)
            {

                result = cSC_ItemQuantityInStore.lstCVarSC_ItemQuantityInStore[0].ItemQuantityInStore;
            }

            CSC_GetAveragePrice cSC_ItemAveragePrice = new CSC_GetAveragePrice();

            cSC_ItemAveragePrice.GetList(long.Parse(pItemID), int.Parse(pStoreID), pDate, int.Parse(pTransactionID));
            if (cSC_ItemAveragePrice.lstCVarSC_GetAveragePrice.Count > 0)
            {

                result1 = cSC_ItemAveragePrice.lstCVarSC_GetAveragePrice[0].AveragePrice;
            }

            return new Object[] { new JavaScriptSerializer().Serialize(result) , new JavaScriptSerializer().Serialize(result1) };


        }



        //[HttpGet, HttpPost]
        //public Object[] CalculateItemQuantityInStore(string pItemID, string pStoreID, DateTime pDate, string pTransactionID , string pInvoiceID , string pInvoiceType)
        //{
        //    decimal result = 0;
        //    TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
        //    TimeSpan LastDayTime = new TimeSpan(19, 0, 0); // new TimeSpan(19, 0, 0);

        //    pDate = pDate.Date + LastDayTime;
        //    CSC_ItemQuantityInStore cSC_ItemQuantityInStore = new CSC_ItemQuantityInStore();
        //    cSC_ItemQuantityInStore.GetList(long.Parse(pItemID), int.Parse(pStoreID), pDate, int.Parse(pTransactionID));
        //    if (cSC_ItemQuantityInStore.lstCVarSC_ItemQuantityInStore.Count > 0)
        //    {

        //        result = cSC_ItemQuantityInStore.lstCVarSC_ItemQuantityInStore[0].ItemQuantityInStore;
        //    }


        //    return new Object[] { new JavaScriptSerializer().Serialize(result) };


        //}











        [HttpGet, HttpPost]
        public int Insert(
            string pCode,
            string pCodeManual,
            DateTime pTransactionDate,
            string pPurchaseInvoiceID,
             string pPurchaseOrderID,
            string pExaminationID,
            string pIsApproved,
            string pNotes,
            string pSLInvoiceID,
            string pDepartmentID,
            string pClientID,
            string pCostCenterID,
            string pIsSpareParts,
           string pFiscalYearID,
           string pSupplierID,
           string pParentID,
           string pTransactionTypeID,
           string pJV_ID , string pIsOutOfStore
            , string pMaterialIssueRequesitionsID
            , string pToStoreID
            , string pP_ProductionRequestID
            , string pP_UnitID
            , string pP_ItemID
            , string pP_LineID
            , string pP_Qty
            , DateTime pP_FinishedDate
            , DateTime pP_StartDate
            , string pEntitlementDays
            , string pIsClosed
            , string pFromStore

                  , string pJV_ID2
      , string pTransferParentID
      , string pForwardingPSInvoiceID
      , string pOperationID
      , string pBranchID
      , string pIsFromFlexi
      , string pTrailerID
      , string pEquipmentID
      
            , Int32 pTruckerID=0
          , string pAmount= "0"
            , string pTotalQty = "0"
            , string pCardNo = "0"
            , Int32 pAccountID = 0
            , Int32 pSubAccountID = 0


          )
        {
            int _result =0;
            CVarSC_Transactions cVarSC_Transactions = new CVarSC_Transactions();
            var objlastcode = new CSC_Transactions();
            objlastcode.GetList("WHERE ID = (select max(ID) from SC_Transactions where isnull(IsDeleted , 0 ) = 0 and TransactionTypeID = " + pTransactionTypeID + " and  DATEPART(year, SC_Transactions.TransactionDate) = '" + pTransactionDate.Year+"')");
            var lastcode = objlastcode.lstCVarSC_Transactions.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarSC_Transactions[0].Code);
            cVarSC_Transactions.Code = (lastcode + 1).ToString();
            cVarSC_Transactions.CodeManual = (pCodeManual == null || pCodeManual == "" || pCodeManual == "undefined" ? "0" : pCodeManual);
            cVarSC_Transactions.PurchaseInvoiceID = long.Parse(pPurchaseInvoiceID);
            cVarSC_Transactions.PurchaseOrderID = (int.Parse(pTransactionTypeID) == 60 ? 0 : int.Parse(pPurchaseOrderID));
            cVarSC_Transactions.SupplyOrderID = (int.Parse(pTransactionTypeID) == 60 ? long.Parse(pPurchaseOrderID) : 0);
            cVarSC_Transactions.ExaminationID = int.Parse(pExaminationID);
            cVarSC_Transactions.IsApproved = bool.Parse(pIsApproved);
            cVarSC_Transactions.Notes =( pNotes == null ? "0" : pNotes);
            cVarSC_Transactions.SLInvoiceID = int.Parse(pSLInvoiceID);
            cVarSC_Transactions.DepartmentID = int.Parse(pDepartmentID);
            cVarSC_Transactions.ClientID = int.Parse(pClientID);
            cVarSC_Transactions.IsOutOfStore = bool.Parse(pIsOutOfStore);
            cVarSC_Transactions.CostCenterID = int.Parse(pCostCenterID);
            cVarSC_Transactions.IsSpareParts = bool.Parse(pIsSpareParts);
            cVarSC_Transactions.FiscalYearID = int.Parse(pFiscalYearID);
            cVarSC_Transactions.SupplierID = int.Parse(pSupplierID);
            cVarSC_Transactions.ParentID = int.Parse(pParentID);
            cVarSC_Transactions.TransactionTypeID = int.Parse(pTransactionTypeID);
            cVarSC_Transactions.JV_ID = int.Parse(pJV_ID);
            cVarSC_Transactions.IsDeleted = false;
            cVarSC_Transactions.CreatorUserID = WebSecurity.CurrentUserId; 
            cVarSC_Transactions.ModificatorUserID = WebSecurity.CurrentUserId;
            cVarSC_Transactions.ModificationDate = DateTime.Now;
            cVarSC_Transactions.CreationDate = DateTime.Now;
            cVarSC_Transactions.DivisionID = 0;
            cVarSC_Transactions.IsConfirm = true;


            //---------------------------------------------------------------------------------------
            cVarSC_Transactions.MaterialIssueRequesitionsID = int.Parse(pMaterialIssueRequesitionsID);
            cVarSC_Transactions.ToStoreID = int.Parse(pToStoreID);
            cVarSC_Transactions.P_ProductionRequestID = int.Parse(pP_ProductionRequestID);
            cVarSC_Transactions.P_UnitID = int.Parse(pP_UnitID);
            cVarSC_Transactions.P_ItemID = int.Parse(pP_ItemID);
            cVarSC_Transactions.P_LineID = int.Parse(pP_LineID);
            cVarSC_Transactions.P_Qty = int.Parse(pP_Qty);
            cVarSC_Transactions.P_FinishedDate = pP_FinishedDate;
            cVarSC_Transactions.P_StartDate = pP_StartDate;
            cVarSC_Transactions.IsClosed = bool.Parse(pIsClosed);
            cVarSC_Transactions.FromStore = int.Parse(pFromStore);
            cVarSC_Transactions.EntitlementDays = int.Parse(pEntitlementDays);
            cVarSC_Transactions.JV_ID2 = int.Parse(pJV_ID2);
            cVarSC_Transactions.TransferParentID = int.Parse(pTransferParentID);
            cVarSC_Transactions.ForwardingPSInvoiceID = (int.Parse(pTransactionTypeID) == 30 ? 0 : int.Parse(pForwardingPSInvoiceID));
            cVarSC_Transactions.PurchaseInvoiceOpeningBalanceID = (int.Parse(pTransactionTypeID) == 30 ? int.Parse(pForwardingPSInvoiceID) : 0);

            cVarSC_Transactions.OperationID = int.Parse(pOperationID);
            cVarSC_Transactions.BranchID = int.Parse(pBranchID);
            cVarSC_Transactions.IsFromFlexi = bool.Parse(pIsFromFlexi);
            cVarSC_Transactions.TrailerID = int.Parse(pTrailerID);
            cVarSC_Transactions.EquipmentID = int.Parse(pEquipmentID);
            cVarSC_Transactions.TruckerID = pTruckerID;
            cVarSC_Transactions.TotalQty = pTotalQty;
            cVarSC_Transactions.Amount = pAmount;
            cVarSC_Transactions.CardNo = pCardNo;
            cVarSC_Transactions.AccountID = pAccountID;
            cVarSC_Transactions.SubAccountID = pSubAccountID;




            //----------------------------------------------------------------------------------------
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0); // new TimeSpan(19, 0, 0);


            TimeSpan InventoryTime = new TimeSpan(23, 0, 0); // new TimeSpan(19, 0, 0);
            TimeSpan SettlementTime = new TimeSpan(20, 0, 0); // new TimeSpan(19, 0, 0);
            if (int.Parse(pTransactionTypeID) == 10 || int.Parse(pTransactionTypeID) == 30 || int.Parse(pTransactionTypeID) == 40 || int.Parse(pTransactionTypeID) == 60 || int.Parse(pTransactionTypeID) == 70 || int.Parse(pTransactionTypeID) == 80 || int.Parse(pTransactionTypeID) == 90)
            {

                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + FirsrDayTime;
            }
            else if (int.Parse(pTransactionTypeID) == 20 || int.Parse(pTransactionTypeID) == 50 || int.Parse(pTransactionTypeID) == 120 || int.Parse(pTransactionTypeID) == 130)
            {
                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + LastDayTime;

            }
            else if (int.Parse(pTransactionTypeID) == 100)
            {
                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + InventoryTime;
            }
            else if (int.Parse(pTransactionTypeID) == 110)
            {
                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + SettlementTime;
            }

            else
            {

            }
            //------------------------------------------------------------------------------------
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            cSC_Transactions.lstCVarSC_Transactions.Add(cVarSC_Transactions);
            Exception checkException = cSC_Transactions.SaveMethod(cSC_Transactions.lstCVarSC_Transactions);

            #region Tax
            CvwDefaults objCDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            CTaxLink objCTaxLinkHeader = new CTaxLink();
            objCTaxLinkHeader.GetList("WHERE Notes='PurchaseInvoice' and OriginID=" + pForwardingPSInvoiceID);

            CTaxLink objCTaxLinkHeaderps = new CTaxLink();
            objCTaxLinkHeaderps.GetList("WHERE Notes='PS_Invoices' and OriginID=" + pPurchaseInvoiceID);

            CCustomersTAX objCCustomersTAX = new CCustomersTAX();
            objCCustomersTAX.GetList("WHERE id=" + pClientID);
            CSuppliersTax objCCSuppliersTax = new CSuppliersTax();
            objCCSuppliersTax.GetList("WHERE id=" + pSupplierID);
            if (CompanyName == "CHM" && checkException == null && int.Parse(pTransactionTypeID) == 10)
            {
                CVarSC_TransactionsTAX cVarSC_TransactionsTax = new CVarSC_TransactionsTAX();

                cVarSC_TransactionsTax.Code = (lastcode + 1).ToString();
                cVarSC_TransactionsTax.CodeManual = (pCodeManual == null || pCodeManual == "" || pCodeManual == "undefined" ? "0" : pCodeManual);
                cVarSC_TransactionsTax.PurchaseInvoiceID = objCTaxLinkHeaderps.lstCVarTaxLink.Count > 0 ? objCTaxLinkHeaderps.lstCVarTaxLink[0].TaxID : 0;
                cVarSC_TransactionsTax.PurchaseOrderID = 0;
                cVarSC_TransactionsTax.SupplyOrderID = 0;
                cVarSC_TransactionsTax.ExaminationID = 0;
                cVarSC_TransactionsTax.IsApproved = bool.Parse(pIsApproved);
                cVarSC_TransactionsTax.Notes = (pNotes == null ? "0" : pNotes);
                cVarSC_TransactionsTax.SLInvoiceID = 0;
                cVarSC_TransactionsTax.DepartmentID = 0;
                cVarSC_TransactionsTax.ClientID = objCCustomersTAX.lstCVarCustomersTAX.Count > 0 ? objCCustomersTAX.lstCVarCustomersTAX[0].ID : 0;
                cVarSC_TransactionsTax.IsOutOfStore = bool.Parse(pIsOutOfStore);
                cVarSC_TransactionsTax.CostCenterID = 0;
                cVarSC_TransactionsTax.IsSpareParts = bool.Parse(pIsSpareParts);
                cVarSC_TransactionsTax.FiscalYearID = int.Parse(pFiscalYearID);
                cVarSC_TransactionsTax.SupplierID = objCCSuppliersTax.lstCVarSuppliersTax.Count > 0 ? objCCSuppliersTax.lstCVarSuppliersTax[0].ID : 0;
                cVarSC_TransactionsTax.ParentID = int.Parse(pParentID);
                cVarSC_TransactionsTax.TransactionTypeID = int.Parse(pTransactionTypeID);
                cVarSC_TransactionsTax.JV_ID = int.Parse(pJV_ID);
                cVarSC_TransactionsTax.IsDeleted = false;
                cVarSC_TransactionsTax.CreatorUserID = WebSecurity.CurrentUserId;
                cVarSC_TransactionsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                cVarSC_TransactionsTax.ModificationDate = DateTime.Now;
                cVarSC_TransactionsTax.CreationDate = DateTime.Now;
                //---------------------------------------------------------------------------------------
                cVarSC_TransactionsTax.MaterialIssueRequesitionsID = int.Parse(pMaterialIssueRequesitionsID);
                cVarSC_TransactionsTax.ToStoreID = int.Parse(pToStoreID);
                cVarSC_TransactionsTax.P_ProductionRequestID = int.Parse(pP_ProductionRequestID);
                cVarSC_TransactionsTax.P_UnitID = int.Parse(pP_UnitID);
                cVarSC_TransactionsTax.P_ItemID = int.Parse(pP_ItemID);
                cVarSC_TransactionsTax.P_LineID = int.Parse(pP_LineID);
                cVarSC_TransactionsTax.P_Qty = int.Parse(pP_Qty);
                cVarSC_TransactionsTax.P_FinishedDate = pP_FinishedDate;
                cVarSC_TransactionsTax.P_StartDate = pP_StartDate;
                cVarSC_TransactionsTax.IsClosed = bool.Parse(pIsClosed);
                cVarSC_TransactionsTax.FromStore = int.Parse(pFromStore);
                cVarSC_TransactionsTax.EntitlementDays = int.Parse(pEntitlementDays);
                cVarSC_TransactionsTax.JV_ID2 = int.Parse(pJV_ID2);
                cVarSC_TransactionsTax.TransferParentID = int.Parse(pTransferParentID);
                cVarSC_TransactionsTax.ForwardingPSInvoiceID = objCTaxLinkHeader.lstCVarTaxLink.Count > 0 ? objCTaxLinkHeader.lstCVarTaxLink[0].TaxID : 0;
                cVarSC_TransactionsTax.PurchaseInvoiceOpeningBalanceID = 0;


                cVarSC_TransactionsTax.OperationID = int.Parse(pOperationID);
                cVarSC_TransactionsTax.BranchID = int.Parse(pBranchID);
                cVarSC_TransactionsTax.IsFromFlexi = bool.Parse(pIsFromFlexi);
                cVarSC_TransactionsTax.TrailerID = int.Parse(pTrailerID);
                cVarSC_TransactionsTax.EquipmentID = int.Parse(pEquipmentID);
                //----------------------------------------------------------------------------------------

                if (int.Parse(pTransactionTypeID) == 10 || int.Parse(pTransactionTypeID) == 30 || int.Parse(pTransactionTypeID) == 40 || int.Parse(pTransactionTypeID) == 60 || int.Parse(pTransactionTypeID) == 70 || int.Parse(pTransactionTypeID) == 80 || int.Parse(pTransactionTypeID) == 90)
                {

                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + FirsrDayTime;
                }
                else if (int.Parse(pTransactionTypeID) == 20 || int.Parse(pTransactionTypeID) == 50 || int.Parse(pTransactionTypeID) == 120)
                {
                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + LastDayTime;

                }
                else if (int.Parse(pTransactionTypeID) == 100)
                {
                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + InventoryTime;
                }
                else if (int.Parse(pTransactionTypeID) == 110)
                {
                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + SettlementTime;
                }
                else
                {

                }
                //------------------------------------------------------------------------------------
                CSC_TransactionsTax cSC_TransactionsTax = new CSC_TransactionsTax();
                cSC_TransactionsTax.lstCVarSC_TransactionsTAX.Add(cVarSC_TransactionsTax);
                checkException = cSC_TransactionsTax.SaveMethod(cSC_TransactionsTax.lstCVarSC_TransactionsTAX);
                if (checkException == null)
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall(); // i // u // D //
                                                                                      //link
                    if (int.Parse(pTransactionTypeID) == 10)
                    {
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + cVarSC_Transactions.ID + "," + cVarSC_TransactionsTax.ID + "," + "GoodsReceiptNotes");
                    }

                }
            }
        
            #endregion

            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarSC_Transactions.ID;
            return _result;
        }




        [HttpGet, HttpPost]
        public int Update( string pID ,
        string pCode,
        string pCodeManual,
        DateTime pTransactionDate,
        string pPurchaseInvoiceID,
        string pPurchaseOrderID,
        string pExaminationID,
        string pIsApproved,
        string pNotes,
        string pSLInvoiceID,
        string pDepartmentID,
        string pClientID,
        string pCostCenterID,
        string pIsSpareParts,
        string pFiscalYearID,
        string pSupplierID,
        string pParentID,
        string pTransactionTypeID,
        string pJV_ID, string pIsOutOfStore
      , string pMaterialIssueRequesitionsID
      , string pToStoreID
      , string pP_ProductionRequestID
      , string pP_UnitID
      , string pP_ItemID
      , string pP_LineID
      , string pP_Qty
      , DateTime pP_FinishedDate
      , DateTime pP_StartDate
      , string pEntitlementDays
      , string pIsClosed
      , string pFromStore
      , string pJV_ID2
      , string pTransferParentID
      , string pForwardingPSInvoiceID
      , string pOperationID
      , string pBranchID
      , string pIsFromFlexi
      , string pTrailerID
      , string pEquipmentID
      , Int32 pTruckerID=0
      , string pAmount = "0"
      , string pTotalQty = "0"
      , string pCardNo = "0"
            , Int32 pAccountID = 0
            , Int32 pSubAccountID = 0
  )
        {
            int _result = 0;

            CVarSC_Transactions cVarSC_Transactions = new CVarSC_Transactions();
            var objlastcode = new CSC_Transactions();
            objlastcode.GetList("WHERE ID = (select max(ID) from SC_Transactions where TransactionTypeID = " + pTransactionTypeID + " and  DATEPART(year, SC_Transactions.TransactionDate) = '" + pTransactionDate.Year + "')");
            //var lastcode = objlastcode.lstCVarSC_Transactions.Count == 0 ? 0 : int.Parse(objlastcode.lstCVarSC_Transactions[0].Code);
            cVarSC_Transactions.Code = pCode;
            cVarSC_Transactions.CodeManual = (pCodeManual == null || pCodeManual == "" || pCodeManual == "undefined" ? "0" : pCodeManual);
            cVarSC_Transactions.ID = int.Parse(pID);
            cVarSC_Transactions.PurchaseInvoiceID = long.Parse(pPurchaseInvoiceID);
            cVarSC_Transactions.PurchaseOrderID = int.Parse(pPurchaseOrderID);
            cVarSC_Transactions.ExaminationID = int.Parse(pExaminationID);
            cVarSC_Transactions.IsApproved = bool.Parse(pIsApproved);
            cVarSC_Transactions.Notes = (pNotes == null ? "0" : pNotes);
            cVarSC_Transactions.SLInvoiceID = int.Parse(pSLInvoiceID);
            cVarSC_Transactions.DepartmentID = int.Parse(pDepartmentID);
            cVarSC_Transactions.ClientID = int.Parse(pClientID);
            cVarSC_Transactions.CostCenterID = int.Parse(pCostCenterID);
            cVarSC_Transactions.IsSpareParts = bool.Parse(pIsSpareParts);
            cVarSC_Transactions.FiscalYearID = int.Parse(pFiscalYearID);
            cVarSC_Transactions.SupplierID = int.Parse(pSupplierID);
            cVarSC_Transactions.ParentID = int.Parse(pParentID);
            cVarSC_Transactions.TransactionTypeID = int.Parse(pTransactionTypeID);
            cVarSC_Transactions.JV_ID = int.Parse(pJV_ID);
            cVarSC_Transactions.IsOutOfStore = bool.Parse(pIsOutOfStore);
            cVarSC_Transactions.IsConfirm = true;

            cVarSC_Transactions.IsDeleted = false;
            cVarSC_Transactions.CreatorUserID = WebSecurity.CurrentUserId;
            cVarSC_Transactions.ModificatorUserID = WebSecurity.CurrentUserId;
            cVarSC_Transactions.ModificationDate = DateTime.Now;
            cVarSC_Transactions.CreationDate = DateTime.Now;
            //---------------------------------------------------------------------------------------
            //---------------------------------------------------------------------------------------
            cVarSC_Transactions.MaterialIssueRequesitionsID = int.Parse(pMaterialIssueRequesitionsID);
            cVarSC_Transactions.ToStoreID = int.Parse(pToStoreID);
            cVarSC_Transactions.P_ProductionRequestID = int.Parse(pP_ProductionRequestID);
            cVarSC_Transactions.P_UnitID = int.Parse(pP_UnitID);
            cVarSC_Transactions.P_ItemID = long.Parse(pP_ItemID);
            cVarSC_Transactions.P_LineID = int.Parse(pP_LineID);
            cVarSC_Transactions.P_Qty = decimal.Parse(pP_Qty);
            cVarSC_Transactions.P_FinishedDate = pP_FinishedDate;
            cVarSC_Transactions.P_StartDate = pP_StartDate;
            cVarSC_Transactions.IsClosed = bool.Parse(pIsClosed);
            cVarSC_Transactions.FromStore = int.Parse(pFromStore);

            cVarSC_Transactions.EntitlementDays = int.Parse(pEntitlementDays);
            cVarSC_Transactions.JV_ID2 = int.Parse(pJV_ID2);
            cVarSC_Transactions.TransferParentID = int.Parse(pTransferParentID);
            cVarSC_Transactions.ForwardingPSInvoiceID = (int.Parse(pTransactionTypeID) == 30 ? 0 : int.Parse(pForwardingPSInvoiceID));
            cVarSC_Transactions.PurchaseInvoiceOpeningBalanceID = (int.Parse(pTransactionTypeID) == 30 ? int.Parse(pForwardingPSInvoiceID) : 0);
            cVarSC_Transactions.OperationID = int.Parse(pOperationID);
            cVarSC_Transactions.BranchID = int.Parse(pBranchID);
            cVarSC_Transactions.IsFromFlexi = bool.Parse(pIsFromFlexi);
            cVarSC_Transactions.TrailerID = int.Parse(pTrailerID);
            cVarSC_Transactions.EquipmentID = int.Parse(pEquipmentID);

            cVarSC_Transactions.TruckerID = pTruckerID;
            cVarSC_Transactions.TotalQty = pTotalQty;
            cVarSC_Transactions.Amount = pAmount;
            cVarSC_Transactions.CardNo = pCardNo;
            cVarSC_Transactions.AccountID = pAccountID;
            cVarSC_Transactions.SubAccountID = pSubAccountID;
            //----------------------------------------------------------------------------------------
            //----------------------------------------------------------------------------------------
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0); // new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0); // new TimeSpan(19, 0, 0);

            TimeSpan InventoryTime = new TimeSpan(23, 0, 0); // new TimeSpan(19, 0, 0);
            TimeSpan SettlementTime = new TimeSpan(20, 0, 0); // new TimeSpan(19, 0, 0);
            if (int.Parse(pTransactionTypeID) == 10 || int.Parse(pTransactionTypeID) == 30 || int.Parse(pTransactionTypeID) == 40 || int.Parse(pTransactionTypeID) == 60 || int.Parse(pTransactionTypeID) == 70 || int.Parse(pTransactionTypeID) == 80 || int.Parse(pTransactionTypeID) == 90)
            {

                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + FirsrDayTime;
            }
            else if (int.Parse(pTransactionTypeID) == 20 || int.Parse(pTransactionTypeID) == 50 || int.Parse(pTransactionTypeID) == 120)
            {
                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + LastDayTime;

            }
            else if (int.Parse(pTransactionTypeID) == 100)
            {
                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + InventoryTime;
            }
            else if (int.Parse(pTransactionTypeID) == 110)
            {
                cVarSC_Transactions.TransactionDate = pTransactionDate.Date + SettlementTime;
            }
            else
            {

            }
            //------------------------------------------------------------------------------------
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            cSC_Transactions.lstCVarSC_Transactions.Add(cVarSC_Transactions);
            Exception checkException = cSC_Transactions.SaveMethod(cSC_Transactions.lstCVarSC_Transactions);

            #region Tax
            CvwDefaults objCDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            CTaxLink objCTaxLink = new CTaxLink();
            objCTaxLink.GetList("WHERE Notes='PurchaseInvoice' and OriginID=" + pPurchaseInvoiceID);

            CTaxLink objCTaxLinkHeader = new CTaxLink();
            objCTaxLinkHeader.GetList("WHERE Notes='GoodsReceiptNotes' and OriginID=" + pID);

            if (CompanyName == "ERP" && checkException == null && (int.Parse(pTransactionTypeID) == 70 || int.Parse(pTransactionTypeID) == 20) && (objCTaxLinkHeader.lstCVarTaxLink.Count > 0))
            {

                CVarSC_TransactionsTAX cVarSC_TransactionsTax = new CVarSC_TransactionsTAX();
                cVarSC_TransactionsTax.Code = pCode;
                cVarSC_TransactionsTax.CodeManual = (pCodeManual == null || pCodeManual == "" || pCodeManual == "undefined" ? "0" : pCodeManual);
                // cVarSC_Transactions.TransactionDate = pTransactionDate;
                cVarSC_TransactionsTax.ID = objCTaxLinkHeader.lstCVarTaxLink[0].TaxID;
                cVarSC_TransactionsTax.PurchaseInvoiceID = objCTaxLink.lstCVarTaxLink.Count > 0 ? objCTaxLink.lstCVarTaxLink[0].TaxID : 0;
                cVarSC_TransactionsTax.PurchaseOrderID = 0;
                cVarSC_TransactionsTax.ExaminationID = 0;
                cVarSC_TransactionsTax.IsApproved = bool.Parse(pIsApproved);
                cVarSC_TransactionsTax.Notes = (pNotes == null ? "0" : pNotes);
                cVarSC_TransactionsTax.SLInvoiceID = 0;
                cVarSC_TransactionsTax.DepartmentID = int.Parse(pDepartmentID);
                cVarSC_TransactionsTax.ClientID = int.Parse(pClientID);
                cVarSC_TransactionsTax.IsOutOfStore = bool.Parse(pIsOutOfStore);
                cVarSC_TransactionsTax.CostCenterID = int.Parse(pCostCenterID);
                cVarSC_TransactionsTax.IsSpareParts = bool.Parse(pIsSpareParts);
                cVarSC_TransactionsTax.FiscalYearID = int.Parse(pFiscalYearID);
                cVarSC_TransactionsTax.SupplierID = int.Parse(pSupplierID);
                cVarSC_TransactionsTax.ParentID = int.Parse(pParentID);
                cVarSC_TransactionsTax.TransactionTypeID = int.Parse(pTransactionTypeID);
                cVarSC_TransactionsTax.JV_ID = int.Parse(pJV_ID);
                cVarSC_TransactionsTax.IsDeleted = false;
                cVarSC_TransactionsTax.CreatorUserID = WebSecurity.CurrentUserId;
                cVarSC_TransactionsTax.ModificatorUserID = WebSecurity.CurrentUserId;
                cVarSC_TransactionsTax.ModificationDate = DateTime.Now;
                cVarSC_TransactionsTax.CreationDate = DateTime.Now;
                //---------------------------------------------------------------------------------------
                cVarSC_TransactionsTax.MaterialIssueRequesitionsID = objCTaxLinkHeader.lstCVarTaxLink.Count > 0 ? objCTaxLinkHeader.lstCVarTaxLink[0].TaxID : 0;
                cVarSC_TransactionsTax.ToStoreID = int.Parse(pToStoreID);
                cVarSC_TransactionsTax.P_ProductionRequestID = int.Parse(pP_ProductionRequestID);
                cVarSC_TransactionsTax.P_UnitID = int.Parse(pP_UnitID);
                cVarSC_TransactionsTax.P_ItemID = int.Parse(pP_ItemID);
                cVarSC_TransactionsTax.P_LineID = int.Parse(pP_LineID);
                cVarSC_TransactionsTax.P_Qty = int.Parse(pP_Qty);
                cVarSC_TransactionsTax.P_FinishedDate = pP_FinishedDate;
                cVarSC_TransactionsTax.P_StartDate = pP_StartDate;
                cVarSC_TransactionsTax.IsClosed = bool.Parse(pIsClosed);
                cVarSC_TransactionsTax.FromStore = int.Parse(pFromStore);
                cVarSC_TransactionsTax.EntitlementDays = int.Parse(pEntitlementDays);
                cVarSC_TransactionsTax.JV_ID2 = int.Parse(pJV_ID2);
                cVarSC_TransactionsTax.TransferParentID = int.Parse(pTransferParentID);
                cVarSC_TransactionsTax.ForwardingPSInvoiceID = int.Parse(pForwardingPSInvoiceID);


                cVarSC_TransactionsTax.OperationID = int.Parse(pOperationID);
                cVarSC_TransactionsTax.BranchID = int.Parse(pBranchID);
                cVarSC_TransactionsTax.IsFromFlexi = bool.Parse(pIsFromFlexi);
                //----------------------------------------------------------------------------------------
                if (int.Parse(pTransactionTypeID) == 10 || int.Parse(pTransactionTypeID) == 30 || int.Parse(pTransactionTypeID) == 40 || int.Parse(pTransactionTypeID) == 60 || int.Parse(pTransactionTypeID) == 70 || int.Parse(pTransactionTypeID) == 80 || int.Parse(pTransactionTypeID) == 90)
                {

                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + FirsrDayTime;
                }
                else if (int.Parse(pTransactionTypeID) == 20 || int.Parse(pTransactionTypeID) == 50)
                {
                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + LastDayTime;

                }
                else if (int.Parse(pTransactionTypeID) == 100)
                {
                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + InventoryTime;
                }
                else if (int.Parse(pTransactionTypeID) == 110)
                {
                    cVarSC_TransactionsTax.TransactionDate = pTransactionDate.Date + SettlementTime;
                }
                else
                {

                }
                //------------------------------------------------------------------------------------
                CSC_TransactionsTax cSC_TransactionsTax = new CSC_TransactionsTax();
                cSC_TransactionsTax.lstCVarSC_TransactionsTAX.Add(cVarSC_TransactionsTax);
                checkException = cSC_TransactionsTax.SaveMethod(cSC_TransactionsTax.lstCVarSC_TransactionsTAX);

            }
            #endregion


            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = cVarSC_Transactions.ID;
            return _result;
        }


        [HttpGet, HttpPost]
        [AllowAnonymous] // (This Action Used to Insert Transaction Details)  [OR] (Update Transaction Details and Transaction Header)
        public object[] InsertItems([FromBody] String pItems)
        {
            // Insert List Of Details
            string _result = "0";
            var istrue = false;
            var OldTD_count = 0; // for old Transaction Details
            var isrestore = false;
            string OldTD_IDs = "0"; // for old Transaction Details
            DateTime StartDate = new DateTime();

            // set Time ----------------------------------------------------------------------------------------
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0);
            TimeSpan InventoryTime = new TimeSpan(23, 0, 0); // new TimeSpan(19, 0, 0);
            TimeSpan SettlementTime = new TimeSpan(20, 0, 0); // new TimeSpan(19, 0, 0);
            CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
            CSC_Transactions cSC_Transactions = new CSC_Transactions();
            CSC_TransactionsDetailsTax cSC_TransactionsDetailsTax = new CSC_TransactionsDetailsTax();
            CSC_TransactionsTax cSC_TransactionsTax = new CSC_TransactionsTax();

            // Deserialize List -------------------------------------------------------------------------------
            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            var Listobj2 = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetailsTAX>>(pItems);

            // var TransNotes = Listobj[0].Notes; // used to update Transaction header
            // Listobj[0].Notes = "-";



            // Get Transaction Type ----------------------------------------------------------------------------
            cSC_Transactions.GetList("where ID = " + Listobj[0].TransactionID);
            var TransactionType = cSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID;



            // Get Old Transaction Details -------------------------------------------------------------------------------------
            CSC_TransactionsDetails oldCSC_TransactionsDetails = new CSC_TransactionsDetails();
            oldCSC_TransactionsDetails.GetList("where TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");


            // [Delete = 1] for  Old Transaction Details ---------------------------------------------------------------------------------
            var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

            if (OldListobj.Count > 0)
            {
                OldTD_IDs = "";
                foreach (var item in OldListobj)
                {
                    OldTD_IDs += "," + item.ID;

                }
                OldTD_IDs = OldTD_IDs.Substring(1);

                var checkException1 = cSC_TransactionsDetails.UpdateList("IsDeleted = 1  where  ID  IN(" + OldTD_IDs + ")");

                OldTD_count = OldListobj.Count;
                isrestore = false;

            }


            // Set Transaction Details Time ---------------------------------------------------------------------
            if (TransactionType == 10 || TransactionType == 30 || TransactionType == 40 || TransactionType == 60 || TransactionType == 50 || TransactionType == 70 || TransactionType == 80 || TransactionType == 90)
            {
                foreach (var item in Listobj)
                {
                    if(item.QtyFactor != -1  )
                    {
                        item.TransactionDate = item.TransactionDate.Date + FirsrDayTime;
                        StartDate = item.TransactionDate.Date + FirsrDayTime;
                    }
                    else
                    {
                        item.TransactionDate = item.TransactionDate.Date + LastDayTime;
                        StartDate = item.TransactionDate.Date + LastDayTime;
                    }
                   
                }
            }
            else if (TransactionType == 20 || TransactionType == 80 || TransactionType == 90 || TransactionType == 120 || TransactionType == 130)
            {
                foreach (var item in Listobj)
                {
                    if (item.QtyFactor != 1)
                    {
                        item.TransactionDate = item.TransactionDate.Date + LastDayTime;
                        StartDate = item.TransactionDate.Date + LastDayTime;
                    }
                    else
                    {
                        item.TransactionDate = item.TransactionDate.Date + FirsrDayTime;
                        StartDate = item.TransactionDate.Date + FirsrDayTime;
                    }
                }
            }
            else if (TransactionType == 100)
            {
                foreach (var item in Listobj)
                {
                    item.TransactionDate = item.TransactionDate.Date + InventoryTime;
                    StartDate = item.TransactionDate.Date + InventoryTime;
                }


            }
            else if (TransactionType == 110)
            {
                foreach (var item in Listobj)
                {
                    item.TransactionDate = item.TransactionDate.Date + SettlementTime;
                    StartDate = item.TransactionDate.Date + SettlementTime;
                }
            }
            else
            {

            }




            // Insert NEW List --------------------------------------------------------------------------------------------------
            Exception checkException = cSC_TransactionsDetails.SaveMethod(Listobj);

            CvwDefaults objCDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (checkException == null && CompanyName == "CHM" && cSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID == 10)
            {
                if (checkException == null && cSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID == 10)
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall(); // i // u // D //

                    CTaxLink objCTaxLink = new CTaxLink();
                    if (cSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID == 10)
                    {
                        objCTaxLink.GetList("WHERE Notes='GoodsReceiptNotes' and OriginID=" + cSC_Transactions.lstCVarSC_Transactions[0].ID);

                        objCCustomizedDBCall.ExecuteQuery_DataTable("delete ForwardingTransChemTax.dbo.SC_TransactionsDetails where transactionid=" + objCTaxLink.lstCVarTaxLink[0].TaxID);                                                            //link
                        if (objCTaxLink.lstCVarTaxLink.Count > 0)
                        {
                            foreach (var item in Listobj2)
                            {
                                item.TransactionID = objCTaxLink.lstCVarTaxLink[0].TaxID;
                            }
                        }
                       
                        checkException = cSC_TransactionsDetailsTax.SaveMethod(Listobj2);

                        objCTaxLink.GetList("WHERE Notes='GoodsReceiptNotes' and OriginID=" + cSC_Transactions.lstCVarSC_Transactions[0].ID);

                    }

                    if (objCTaxLink.lstCVarTaxLink.Count == 0)
                    {
                        checkException = cSC_TransactionsDetailsTax.UpdateList("TransactionID =" + objCTaxLink.lstCVarTaxLink[0].TaxID + " where  TransactionID  IN(" + cSC_Transactions.lstCVarSC_Transactions[0].ID + ")");

                    }
                }
            }

            //if (TransactionType != 30 )
            //{
            // Validation -----------------------------------------------------------------------------------------------
            if (checkException == null)
                {

                    var ListLength = Listobj.Count;
                    var List_StoresItem = new List<string>(ListLength);



                for(int i = 0; i< OldListobj.Count; i++)
                {
                    List_StoresItem.Add(OldListobj[i].StoreID + "-" + OldListobj[i].ItemID);
                }
                for (int i = 0; i < ListLength; i++)
                {
                            List_StoresItem.Add(Listobj[i].StoreID + "-" + Listobj[i].ItemID);
                }

                    //--------------- List Of Distinct [{Stores}-{Items}]-------------------------------
                    var NewList_Stores_Items = List_StoresItem.DistinctBy(x => x).ToList();
                    var NewListLength = NewList_Stores_Items.Count;
                    //-----------------------------------------------------------------------------------

                    var str_Items = new List<string>(NewListLength);
                    var str_Stores = new List<string>(NewListLength);
                    for (int i = 0; i < NewList_Stores_Items.Count; i++)
                    {

                        str_Stores.Add(NewList_Stores_Items[i].Split('-')[0]);
                        str_Items.Add(NewList_Stores_Items[i].Split('-')[1]);

                    }

                    //----------------------------------------------------------------------------------
                    CSC_ValidateTransaction_AND_UpdateHeader cSC_ValidateTransaction = new CSC_ValidateTransaction_AND_UpdateHeader();
                    checkException = cSC_ValidateTransaction.GetList(string.Join("-", str_Items), string.Join("-", str_Stores), StartDate, cSC_Transactions.lstCVarSC_Transactions[0].ID, "");
                }
           // }
            //---------------
            // If faild ------------------------
            if (checkException != null)
            {
                if (OldTD_IDs == "")
                    OldTD_IDs = "0";
                // delete any NEW Transaction Details ----------------------------------------------------------------------------
                // var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;
                var checkException1 = cSC_TransactionsDetails.DeleteList("where ID NOT IN(" + OldTD_IDs + ") AND  TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");
                var Message = checkException.Message;

                if(Message.Contains("Divide by zero"))
                {
                    Message = "One of Stores has zero from required item ..";

                }
                if (OldTD_count > 0)
                {
                    //foreach (var item in OldListobj)
                    //{
                    //    IDs += "," + item.ID;
                    //}
                    //IDs = IDs.Substring(1);
                    checkException = cSC_TransactionsDetails.UpdateList("IsDeleted = 0  where  ID  IN(" + OldTD_IDs + ")");
                }
                else
                {
                    checkException = cSC_Transactions.UpdateList("IsDeleted = 1  where  ID  IN(" + cSC_Transactions.lstCVarSC_Transactions[0].ID + ")");

                }
                istrue = false;
                return new object[] { istrue, Message, cSC_Transactions.lstCVarSC_Transactions[0].ID };
            }
            // if Sucessed -----------------------------------------------------------------------------------------------------------
            else
            {

                if (OldTD_IDs == "")
                    OldTD_IDs = "0";
                //----------------- Update New List (is deleted = 0) for refresh remained quantity -------------------------------------
                checkException = cSC_TransactionsDetails.UpdateList(" IsDeleted = 0  where  ID NOT IN(" + OldTD_IDs + ") AND  TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");
                //----------------- Delete Old List ----------------------------------------------------------------
                checkException = cSC_TransactionsDetails.DeleteList("where  ID  IN(" + OldTD_IDs + ")");





                _result = cSC_Transactions.lstCVarSC_Transactions[0].Code;

                //  var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

                //if (OldListobj.Count > 0)
                //{
                //    foreach (var item in OldListobj)
                //    {
                //        IDs += "," + item.ID;

                //    }
                //    IDs = IDs.Substring(1);
                //    checkException = cSC_TransactionsDetails.DeleteList("where  ID  IN(" + IDs + ")");
                //}
                
                istrue = true;
                return new object[] { istrue, _result, cSC_Transactions.lstCVarSC_Transactions[0].ID  };
            }



        }


        [HttpGet, HttpPost]
        public object[] Delete(String pTransactionsID , DateTime pTransactionDate)
        {
            bool _result = false;



            // Get Old Transaction Details -------------------------------------------------------------------------------------
            CSC_TransactionsDetails oldCSC_TransactionsDetails = new CSC_TransactionsDetails();
            CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
            CSC_TransactionsDetailsTax cSC_TransactionsDetailsTax = new CSC_TransactionsDetailsTax();
            CSC_TransactionsTax cSC_TransactionsTax = new CSC_TransactionsTax();


            var IDs = "0";
            var count = 0;
            var isrestore = false;
            oldCSC_TransactionsDetails.GetList("where TransactionID = " + pTransactionsID + "");


            // Delete Old Transaction Details ---------------------------------------------------------------------------------
            var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

            if (OldListobj.Count > 0)
            {
                IDs = "";
                foreach (var item in OldListobj)
                {
                    IDs += "," + item.ID;

                }
                IDs = IDs.Substring(1);

                var checkException1 = cSC_TransactionsDetails.UpdateList("IsDeleted = 1  where  ID  IN(" + IDs + ")");

                count = OldListobj.Count;
                isrestore = false;

            }

            CvwDefaults objCDefaults = new CvwDefaults();
            int _RowCount2 = 0;
            objCDefaults.GetListPaging(999999, 1, "WHERE 1=1", "ID", out _RowCount2);
            string CompanyName = objCDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;
            if (CompanyName == "CHM" )
            {
                foreach (var currentID in pTransactionsID.Split(','))
                {
                    CTaxLink cCTaxLink = new CTaxLink();
                    cCTaxLink.GetList("where notes='GoodsReceiptNotes' and originid=" + currentID +"order by id desc");
                    if (cCTaxLink.lstCVarTaxLink.Count > 0)
                    {
                        var checkException1 = cSC_TransactionsDetailsTax.UpdateList("IsDeleted = 1  where  TransactionID  IN(" + cCTaxLink.lstCVarTaxLink[0].TaxID + ")");
                        checkException1 = cSC_TransactionsTax.UpdateList("IsDeleted = 1  where  id  IN(" + cCTaxLink.lstCVarTaxLink[0].TaxID + ")");

                        cCTaxLink.DeleteList("where notes='GoodsReceiptNotes' and taxid=" + cCTaxLink.lstCVarTaxLink[0].TaxID);

                    }



                }
            }


            // Validation -----------------------------------------------------------------------------------------------


            var ListLength = OldListobj.Count;
            var List_StoresItem = new List<string>(ListLength);

            for (int i = 0; i < ListLength; i++)
            {
                    List_StoresItem.Add(OldListobj[i].StoreID + "-" + OldListobj[i].ItemID);
            }

            var NewList_Stores = List_StoresItem.DistinctBy(x => x).ToList();
            var NewListLength = NewList_Stores.Count;
            var str_Items = new List<string>(NewListLength);
            var str_Stores = new List<string>(NewListLength);
            for (int i = 0; i < NewList_Stores.Count; i++)
            {

                str_Stores.Add(NewList_Stores[i].Split('-')[0]);
                str_Items.Add(NewList_Stores[i].Split('-')[1]);

            }
            CSC_ValidateTransaction_AND_UpdateHeader cSC_ValidateTransaction = new CSC_ValidateTransaction_AND_UpdateHeader();
            var exception = cSC_ValidateTransaction.GetList(string.Join("-", str_Items), string.Join("-", str_Stores), pTransactionDate, int.Parse( pTransactionsID ), "0");






           // CSC_ValidateDeleteTransaction cSC_ValidateDeleteTransaction = new CSC_ValidateDeleteTransaction();
           // var exception = cSC_ValidateDeleteTransaction.GetList(int.Parse(pTransactionsID) , pTransactionDate);
            //var Message = cSC_ValidateDeleteTransaction.lstCVarSC_ValidateDeleteTransaction[0].ErrMessage;
            var Message = "";
            //------------------------------- -----------------------------------------------
            if (exception == null)
            {
            
                //-------------------------------------------------------------------------------
                _result = true;
                CSC_Transactions objCSC_Transactions = new CSC_Transactions();
                string pUpdateClause = "";
                pUpdateClause = " IsDeleted = 1 "
                 + " , ModificatorUserID = " + WebSecurity.CurrentUserId.ToString()
                 + " , ModificationDate = GETDATE() "
                 + " WHERE ID =" + pTransactionsID + "";
                var checkException = objCSC_Transactions.UpdateList(pUpdateClause);
                //-------------------------------------------------------------------------------
                CFlexiSerial cFlexiSerial = new CFlexiSerial();
                string pUpdateClause2 = "";
                pUpdateClause2 = " ExportPurchaseInvoiceItemID = null "
                + " WHERE ExportPurchaseInvoiceItemID =" + pTransactionsID + "";
                checkException = cFlexiSerial.UpdateList(pUpdateClause2);
                //---------------------------------------------------------------------------------

            }
            else
            {
                _result = false;
                CSC_TransactionsDetails objCSC_TransactionsDetails = new CSC_TransactionsDetails();
                string pUpdateClause2 = "";
                pUpdateClause2 = " IsDeleted = 0 "
                 + " WHERE TransactionID =" + pTransactionsID + "";
                var checkException = objCSC_TransactionsDetails.UpdateList(pUpdateClause2);
                Message = exception.Message;

            }

            return new object[] { _result, Message };
        }

        [HttpGet, HttpPost]
        [AllowAnonymous] // (This Action Used to Insert Transaction Details)  [OR] (Update Transaction Details and Transaction Header)
        public object[] InsertPayablesItems([FromBody] String pItems)
        {
            // Insert List Of Details
            string _result = "0";
            var istrue = false;
            var OldTD_count = 0; // for old Transaction Details
            var isrestore = false;
            string OldTD_IDs = "0"; // for old Transaction Details
            DateTime StartDate = new DateTime();

            // set Time ----------------------------------------------------------------------------------------
            TimeSpan FirsrDayTime = new TimeSpan(7, 0, 0);
            TimeSpan LastDayTime = new TimeSpan(19, 0, 0);
            CSC_TransactionsDetails cSC_TransactionsDetails = new CSC_TransactionsDetails();
            CPayables cPayables = new CPayables();
            CSC_Transactions cSC_Transactions = new CSC_Transactions();


            // Deserialize List -------------------------------------------------------------------------------
            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsDetails>>(pItems);
            // var TransNotes = Listobj[0].Notes; // used to update Transaction header
            // Listobj[0].Notes = "-";



            // Get Transaction Type ----------------------------------------------------------------------------
            cSC_Transactions.GetList("where ID = " + Listobj[0].TransactionID);
            var TransactionType = cSC_Transactions.lstCVarSC_Transactions[0].TransactionTypeID;



            // Get Old Transaction Details -------------------------------------------------------------------------------------
            CSC_TransactionsDetails oldCSC_TransactionsDetails = new CSC_TransactionsDetails();
            oldCSC_TransactionsDetails.GetList("where TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");


            // [Delete = 1] for  Old Transaction Details ---------------------------------------------------------------------------------
            var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

            if (OldListobj.Count > 0)
            {
                OldTD_IDs = "";
                foreach (var item in OldListobj)
                {
                    OldTD_IDs += "," + item.ID;

                }
                OldTD_IDs = OldTD_IDs.Substring(1);

                var checkException1 = cSC_TransactionsDetails.UpdateList("IsDeleted = 1  where  ID  IN(" + OldTD_IDs + ")");

                OldTD_count = OldListobj.Count;
                isrestore = false;

            }


            // Set Transaction Details Time ---------------------------------------------------------------------
            if (TransactionType == 10 || TransactionType == 30 || TransactionType == 40 || TransactionType == 60 || TransactionType == 50 || TransactionType == 70 || TransactionType == 80)
            {
                foreach (var item in Listobj)
                {
                    if (item.QtyFactor != -1)
                    {
                        item.TransactionDate = item.TransactionDate.Date + FirsrDayTime;
                        StartDate = item.TransactionDate.Date + FirsrDayTime;
                    }
                    else
                    {
                        item.TransactionDate = item.TransactionDate.Date + LastDayTime;
                        StartDate = item.TransactionDate.Date + LastDayTime;
                    }

                }
            }
            else if (TransactionType == 20 || TransactionType == 80 || TransactionType == 120)
            {
                foreach (var item in Listobj)
                {
                    if (item.QtyFactor != 1)
                    {
                        item.TransactionDate = item.TransactionDate.Date + LastDayTime;
                        StartDate = item.TransactionDate.Date + LastDayTime;
                    }
                    else
                    {
                        item.TransactionDate = item.TransactionDate.Date + FirsrDayTime;
                        StartDate = item.TransactionDate.Date + FirsrDayTime;
                    }
                }
            }
            else
            {

            }




            // Insert NEW List --------------------------------------------------------------------------------------------------
            Exception checkException = cSC_TransactionsDetails.SavePayablesMethod(Listobj);



            //if (TransactionType != 30 )
            //{
            // Validation -----------------------------------------------------------------------------------------------
            if (checkException == null)
            {

                var ListLength = Listobj.Count;
                var List_StoresItem = new List<string>(ListLength);



                for (int i = 0; i < OldListobj.Count; i++)
                {
                    List_StoresItem.Add(OldListobj[i].StoreID + "-" + OldListobj[i].ItemID);
                }
                for (int i = 0; i < ListLength; i++)
                {
                    List_StoresItem.Add(Listobj[i].StoreID + "-" + Listobj[i].ItemID);
                }

                var NewList_Stores = List_StoresItem.DistinctBy(x => x).ToList();
                var NewListLength = NewList_Stores.Count;
                var str_Items = new List<string>(NewListLength);
                var str_Stores = new List<string>(NewListLength);
                for (int i = 0; i < NewList_Stores.Count; i++)
                {

                    str_Stores.Add(NewList_Stores[i].Split('-')[0]);
                    str_Items.Add(NewList_Stores[i].Split('-')[1]);

                }
                CSC_ValidateTransaction_AND_UpdateHeader cSC_ValidateTransaction = new CSC_ValidateTransaction_AND_UpdateHeader();
                checkException = cSC_ValidateTransaction.GetList(string.Join("-", str_Items), string.Join("-", str_Stores), StartDate, cSC_Transactions.lstCVarSC_Transactions[0].ID, "");
            }
            // }
            //---------------
            // If faild ------------------------
            if (checkException != null)
            {
                if (OldTD_IDs == "")
                    OldTD_IDs = "0";
                // delete any NEW Transaction Details ----------------------------------------------------------------------------
                // var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;
                var checkException1 = cSC_TransactionsDetails.DeleteList("where ID NOT IN(" + OldTD_IDs + ") AND  TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");
                var checkException2 = cPayables.DeleteList("where TransactionID =  " + cSC_Transactions.lstCVarSC_Transactions[0].ID);
                var Message = checkException.Message;

                if (Message.Contains("Divide by zero"))
                {
                    Message = "One of Stores has zero from required item ..";

                }
                if (OldTD_count > 0)
                {
                    //foreach (var item in OldListobj)
                    //{
                    //    IDs += "," + item.ID;
                    //}
                    //IDs = IDs.Substring(1);
                    checkException = cSC_TransactionsDetails.UpdateList("IsDeleted = 0  where  ID  IN(" + OldTD_IDs + ")");
                }
                else
                {
                    checkException = cSC_Transactions.UpdateList("IsDeleted = 1  where  ID  IN(" + cSC_Transactions.lstCVarSC_Transactions[0].ID + ")");

                }
                istrue = false;
                return new object[] { istrue, Message, cSC_Transactions.lstCVarSC_Transactions[0].ID };
            }
            // if Sucessed -----------------------------------------------------------------------------------------------------------
            else
            {

                if (OldTD_IDs == "")
                    OldTD_IDs = "0";
                //----------------- Update New List (is deleted = 0) for refresh remained quantity -------------------------------------
                checkException = cSC_TransactionsDetails.UpdateList(" IsDeleted = 0  where  ID NOT IN(" + OldTD_IDs + ") AND  TransactionID = " + cSC_Transactions.lstCVarSC_Transactions[0].ID + "");
                //----------------- Delete Old List ----------------------------------------------------------------
                checkException = cSC_TransactionsDetails.DeleteList("where  ID  IN(" + OldTD_IDs + ")");





                _result = cSC_Transactions.lstCVarSC_Transactions[0].Code;

                //  var OldListobj = oldCSC_TransactionsDetails.lstCVarSC_TransactionsDetails;

                //if (OldListobj.Count > 0)
                //{
                //    foreach (var item in OldListobj)
                //    {
                //        IDs += "," + item.ID;

                //    }
                //    IDs = IDs.Substring(1);
                //    checkException = cSC_TransactionsDetails.DeleteList("where  ID  IN(" + IDs + ")");
                //}
                istrue = true;
                return new object[] { istrue, _result, cSC_Transactions.lstCVarSC_Transactions[0].ID };
            }



        }

        [HttpGet, HttpPost]
        public object[] OpenClose(string pSelectedIDs, bool pIsClosed)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
          
                CSC_Transactions cSC_Transactions = new CSC_Transactions();
                if (pIsClosed)
                {
                    var Exception = cSC_Transactions.UpdateList(" IsClosed = 1 where ID In(" + pSelectedIDs + ")");
                    if (Exception != null)
                        ErrorMessage = Exception.Message;
                }
                else
                {
                    var Exception = cSC_Transactions.UpdateList(" IsClosed = 0 where ID In(" + pSelectedIDs + ")");
                    if (Exception != null)
                        ErrorMessage = Exception.Message;
                }
                

            if (ErrorMessage.Trim() == "")
            {
                _Result = true;

            }



            return new Object[] { _Result, ErrorMessage };
        }



        [HttpGet, HttpPost]
        public object[] IsConfirm(string pSelectedIDs, bool pApproved)
        {
            //---------------------------------------------------------------------------------------------------
            var _Result = false;
            var ErrorMessage = "";
            CSC_Transactions cSC_Transactions = new CSC_Transactions();

            var Exception = cSC_Transactions.UpdateList(" IsConfirm = 1 where ID In(" + pSelectedIDs + ")");
            if (pApproved == true)
            {
                Exception = cSC_Transactions.UpdateList(" IsConfirm = 1 where ID In(" + pSelectedIDs + ")");
            }
            if (pApproved == false)
            {
                Exception = cSC_Transactions.UpdateList(" IsConfirm = 0 where ID In(" + pSelectedIDs + ")");
            }

            if (Exception != null)
                ErrorMessage = Exception.Message;

            if (ErrorMessage.Trim() == "")
            {
                _Result = true;

            }

            return new Object[] { _Result, ErrorMessage };
        }

        [HttpGet, HttpPost]
        public Object[] CheckBalanceByAbdoo(string pID)
        {
            bool _result = false;
            CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
            System.Data.DataTable dt = objCCustomizedDBCall.ExecuteQuery_DataTable("CheckBalanceByAbdoo " + pID);

            if (dt.Rows.Count > 0)
            {
                _result = false;
            }
            else
            {
                _result = true;
            }
            return new Object[] { _result };

        }




        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertExpenses(string pExpenses , string pExpensesTaxes)
        {

                var ErrorMessage = "";
                var _result = false;
                var serialize = new JavaScriptSerializer();
                Exception checkException = new Exception();
                int _resultID = 0;

            #region Expenses
            var Expenses = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsExpenses>>(pExpenses);

               CSC_TransactionsExpenses sC_TransactionsExpenses = new CSC_TransactionsExpenses();

                if (Expenses != null && Expenses.Count > 0)
                {
                    checkException = sC_TransactionsExpenses.SaveMethod(Expenses);
                    var sC_TransactionsExpensesIDs = String.Join(",", Expenses.Select(x => x.ID).ToList());
                   sC_TransactionsExpenses.DeleteList("where TransactionID = " + Expenses[0].TransactionID + " and ID Not IN(" + sC_TransactionsExpensesIDs + ")");
                }
                else
                {
                sC_TransactionsExpenses.DeleteList("where TransactionID = " + Expenses[0].TransactionID);
                }
            #endregion Expenses

            #region ExpensesTaxes
            var ExpensesTaxes = new JavaScriptSerializer().Deserialize<List<CVarSC_TransactionsExpensesTaxes>>(pExpensesTaxes);

            CSC_TransactionsExpensesTaxes sC_TransactionsExpensesTaxes = new CSC_TransactionsExpensesTaxes();

            if (ExpensesTaxes != null && ExpensesTaxes.Count > 0)
            {
                checkException = sC_TransactionsExpensesTaxes.SaveMethod(ExpensesTaxes);
                var sC_TransactionsExpensesTaxesIDs = String.Join(",", ExpensesTaxes.Select(x => x.ID).ToList());
                sC_TransactionsExpensesTaxes.DeleteList("where TransactionID = " + ExpensesTaxes[0].TransactionID + " and ID Not IN(" + sC_TransactionsExpensesTaxesIDs + ")");
            }
            else
            {
                sC_TransactionsExpensesTaxes.DeleteList("where TransactionID = " + Expenses[0].TransactionID);
            }

            #endregion ExpensesTaxes
            if (!(checkException == null))
            {
                _resultID = 0;
                ErrorMessage = checkException.Message;
            }



            return new object[]
            {
              ErrorMessage ,  Expenses[0].TransactionID
            };








            //var message = "";

            //    if (checkException != null)
            //    {
            //        message = "Please Insert Correct Data";
            //    }
            //    else
            //    {
            //        _result = true;
            //        message = "Done";

            //    }
            //    return new object[] {
            //    _result , message
            //};

        }


    }






}


