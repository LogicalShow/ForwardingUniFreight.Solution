using Forwarding.MvcApp.Models.Accounting.MasterData.Customized;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.MasterData.BanksAccountsAndTreasuries.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
using Forwarding.MvcApp.Models.NoAccess.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using System;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Operations.API_Operations
{
    public class OperationPartnersController : ApiController
    {
        [HttpGet, HttpPost]
        public Object[] LoadAll(string pWhereClause)
        {
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            objCvwOperationPartners.GetList(pWhereClause);
            return new Object[] { new JavaScriptSerializer().Serialize(objCvwOperationPartners.lstCVarvwOperationPartners) };
        }
        
        [HttpGet, HttpPost]
        public object[] LoadWithWhereClause(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)
        {
            Int32 _RowCount = 0;
            CNoAccessOperationPartnerTypes objCNoAccessOperationPartnerTypes = new CNoAccessOperationPartnerTypes();
            objCNoAccessOperationPartnerTypes.GetList("ORDER BY Name");
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            objCvwOperationPartners.GetListPaging(pPageSize, pPageNumber, pWhereClause, " ViewOrder, ID ", out _RowCount);
            return new Object[] {
                new JavaScriptSerializer().Serialize(objCvwOperationPartners.lstCVarvwOperationPartners)
                , _RowCount
                , new JavaScriptSerializer().Serialize(objCNoAccessOperationPartnerTypes.lstCVarNoAccessOperationPartnerTypes) //pData[2]
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(Int64 pOperationID, int pBLType, int pOperationPartnerTypeID, int pCustomerID, int pAgentID, int pShippingAgentID, int pCustomsClearanceAgentID, int pShippingLineID, int pAirlineID, int pTruckerID, int pSupplierID, int pCustodyID, Int64 pContactID, int pDirectionType
            , bool pIsOperationClient) // pDirectionType: to decide wether to set shipper or consignee in Operations
        //public bool Insert(String pCode, String pName)
        {
            bool _result = false;
            CNetwork objCNetwork = new CNetwork();
            CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
            int _RowCount2 = 0;
            CvwDefaults objCvwDefaults = new CvwDefaults();
            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount2); //i am sure i ve just one row isa
            string CompanyName = objCvwDefaults.lstCVarvwDefaults[0].UnEditableCompanyName;

            if (CompanyName == "AKS" && pCustomerID > 0)
            {
                var cust = new CCustomers();
                Exception ee = cust.GetItem(pCustomerID);
                if (ee == null && cust.lstCVarCustomers.Count == 1 && cust.lstCVarCustomers[0].IsMustPay) // Means Customer is blacklisted
                {
                    return _result;
                }
            }

            objCVarOperationPartners.OperationID = pOperationID;
            objCVarOperationPartners.OperationPartnerTypeID = pOperationPartnerTypeID;
            objCVarOperationPartners.CustomerID = pCustomerID;
            objCVarOperationPartners.AgentID = pAgentID;
            objCVarOperationPartners.ShippingAgentID = pShippingAgentID;
            objCVarOperationPartners.CustomsClearanceAgentID = pCustomsClearanceAgentID;
            objCVarOperationPartners.ShippingLineID = pShippingLineID;
            objCVarOperationPartners.AirlineID = pAirlineID;
            objCVarOperationPartners.TruckerID = pTruckerID;
            objCVarOperationPartners.SupplierID = pSupplierID;
            objCVarOperationPartners.CustodyID = pCustodyID;
            objCVarOperationPartners.ContactID = pContactID;
            objCVarOperationPartners.IsOperationClient = pIsOperationClient;

            objCVarOperationPartners.CreatorUserID = objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
            objCVarOperationPartners.CreationDate = objCVarOperationPartners.ModificationDate = DateTime.Now;

            COperationPartners objCOperationPartners = new COperationPartners();
            objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
            Exception checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            {
                _result = true;
                string updateClause = "";
                if (pIsOperationClient)//not unique
                {
                    #region Update Client Or Agent
                    //// Decide wether to update shipper or consignee in Operations
                    //// pOperationPartnerTypeID: 1=Shipper, 2=consignee, .....
                    ////if (pDirectionType == 1 && pOperationPartnerTypeID == 2) //import operation, so the Client is the consignee so update it
                    //if (pOperationPartnerTypeID == 2) //I updated the previous condition to update partner in operations wether consignee, shipper or agent to handle the case of changing the operation type so i find the client
                    //{
                    //    updateClause = " ConsigneeID = " + (pCustomerID == 0 ? "NULL" : pCustomerID.ToString());
                    //    updateClause += " , ConsigneeContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                    //    updateClause += " WHERE ID = " + pOperationID.ToString();
                    //    //updateClause += " WHERE ID = " + pOperationID.ToString() + " AND ConsigneeID IS NULL";
                    //    COperations objCOperations = new COperations();
                    //    objCOperations.UpdateList(updateClause);
                    //}
                    ////if ((pDirectionType == 2 || pDirectionType == 3) && pOperationPartnerTypeID == 1)//import operation, so the Client is the consignee so update it
                    //if (pOperationPartnerTypeID == 1)//I updated the previous condition to update partner in operations wether consignee, shipper or agent to handle the case of changing the operation type so i find the client
                    //{
                    //    updateClause = " ShipperID = " + (pCustomerID == 0 ? "NULL" : pCustomerID.ToString());
                    //    updateClause += " , ShipperContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                    //    updateClause += " WHERE ID = " + pOperationID.ToString();
                    //    //updateClause += " WHERE ID = " + pOperationID.ToString() + " AND ShipperID IS NULL";
                    //    COperations objCOperations = new COperations();
                    //    objCOperations.UpdateList(updateClause);
                    //}
                    ////if (pBLType == 3 && pOperationPartnerTypeID == 6) //Master operation, so update Agent in the Operation
                    //if (pOperationPartnerTypeID == 6) //I updated the previous condition to update partner in operations wether consignee, shipper or agent to handle the case of changing the operation type so i find the client
                    //{
                    //    updateClause = " AgentID = " + (pAgentID == 0 ? "NULL" : pAgentID.ToString());
                    //    updateClause += " , NetworkID = null ";
                    //    updateClause += " , AgentContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                    //    updateClause += " WHERE ID = " + pOperationID.ToString();
                    //    //updateClause += " WHERE ID = " + pOperationID.ToString() + " AND AgentID IS NULL";
                    //    COperations objCOperations = new COperations();
                    //    objCOperations.UpdateList(updateClause);
                    //}
                    #endregion
                    #region Update IsOperationClient to false for all other partners on the operation
                    updateClause = " IsOperationClient = 0 ";
                    updateClause += " WHERE OperationID=" + pOperationID.ToString() + " AND ID<>" + objCVarOperationPartners.ID.ToString();
                    objCOperationPartners.UpdateList(updateClause);
                    #endregion Update IsOperationClient to false for all other partners on the operation

                    
                }//if (pIsOperationClient)//not unique

                if (objCVarOperationPartners.OperationPartnerTypeID == 11 && objCVarOperationPartners.TruckerID > 0)
                {
                    COperations objCOperations = new COperations();
                    objCOperations.UpdateList($" TruckerID = {objCVarOperationPartners.TruckerID} where ID = {objCVarOperationPartners.OperationID}");
                }
                else if (objCVarOperationPartners.OperationPartnerTypeID == 1 && objCVarOperationPartners.CustomerID > 0)
                { // Shipper
                    COperations objCOperations = new COperations();
                    checkException = objCOperations.UpdateList($" ShipperID = {objCVarOperationPartners.CustomerID} where ID = {objCVarOperationPartners.OperationID}");
                }
                else if (objCVarOperationPartners.OperationPartnerTypeID == 2 && objCVarOperationPartners.CustomerID > 0)
                {//Consignee
                    COperations objCOperations = new COperations();
                    checkException = objCOperations.UpdateList($" ConsigneeID = {objCVarOperationPartners.CustomerID} where ID = {objCVarOperationPartners.OperationID}");
                }
            }

            #region Tax
            
            Int32 SubAccountID_Return = 0;
            Int32 SubAccountID_Revenue = 0;
            Int32 SubAccountID_Expense = 0;

            Int32 supGroupID = 0;
            Int32 AccountID_Return = 0;
            Int32 AccountID_Revenue = 0;
            Int32 AccountID_Expense = 0;


            

            if ((CompanyName == "CHM" || CompanyName == "OCE" || CompanyName == "TRM") && checkException == null )
            {
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                //customer
                CCustomers objCCCustomers = new CCustomers();
                objCCCustomers.GetList("where ID = " + pCustomerID);

                CCustomersTAX objCCCustomersTax = new CCustomersTAX();
                if (objCCCustomers.lstCVarCustomers.Count > 0)
                {
                    objCCCustomersTax.GetList("where Name = N'" + objCCCustomers.lstCVarCustomers[0].Name + "'");
                }
                //AgentID
                CAgents objCAgents = new CAgents();
                objCAgents.GetList("where ID = " + pAgentID);

                CAgentsTax objCAgentsTax = new CAgentsTax();
                if (objCAgents.lstCVarAgents.Count > 0)
                {
                    objCAgentsTax.GetList("where Name = N'" + objCAgents.lstCVarAgents[0].Name + "'");
                }
                //ShippingLineID
                CShippingLines objCShippingLines = new CShippingLines();
                objCShippingLines.GetList("where ID = " + pAgentID);

                CShippingLinesTAX objCShippingLinesTax = new CShippingLinesTAX();
                if (objCShippingLines.lstCVarShippingLines.Count > 0)
                {
                    objCShippingLinesTax.GetList("where Name = N'" + objCShippingLines.lstCVarShippingLines[0].Name + "'");
                }
                //AirlineID
                CAirlines objCAirlines = new CAirlines();
                objCAirlines.GetList("where ID = " + pAirlineID);

                CAirlinesTAX objCAirlinesTAX = new CAirlinesTAX();
                if (objCAirlines.lstCVarAirlines.Count > 0)
                {
                    objCAirlinesTAX.GetList("where Name = N'" + objCAirlines.lstCVarAirlines[0].Name + "'");
                }
                //TruckerID
                CTruckers objCTruckers = new CTruckers();
                objCTruckers.GetList("where ID = " + pTruckerID);

                CTruckersTAX objCTruckersTAX = new CTruckersTAX();
                if (objCTruckers.lstCVarTruckers.Count > 0)
                {
                    objCTruckersTAX.GetList("where Name = N'" + objCTruckers.lstCVarTruckers[0].Name + "'");
                }
                //CustodyID
                CCustody objCCustody = new CCustody();
                objCCustody.GetList("where ID = " + pCustodyID);

                CCustodyTAX objCCustodyTAX = new CCustodyTAX();
                if (objCCustody.lstCVarCustody.Count > 0)
                {
                    objCCustodyTAX.GetList("where Name = N'" + objCCustody.lstCVarCustody[0].Name + "'");
                }
                //SupplierID
                CSuppliers CSuppliers = new CSuppliers();
                CSuppliers.GetList("where ID = " + pSupplierID);

                CSuppliersTax objCCSuppliersTax = new CSuppliersTax();
                if (CSuppliers.lstCVarSuppliers.Count > 0)
                {
                    objCCSuppliersTax.GetList("where Name = N'" + CSuppliers.lstCVarSuppliers[0].Name + "'");
                }
                //CustomsClearanceAgentID
                CCustomsClearanceAgents CCustomsClearanceAgents = new CCustomsClearanceAgents();
                CCustomsClearanceAgents.GetList("where ID = " + pCustomsClearanceAgentID);

                CCustomsClearanceAgentsTax CCustomsClearanceAgentsTax = new CCustomsClearanceAgentsTax();
                if (CCustomsClearanceAgents.lstCVarCustomsClearanceAgents.Count > 0)
                {
                    CCustomsClearanceAgentsTax.GetList("where Name = N'" + CCustomsClearanceAgents.lstCVarCustomsClearanceAgents[0].Name + "'");
                }
                string OperationID = "";
                if (CompanyName == "CHM")
                {
                    OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransChemTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                }
                else if(CompanyName == "OCE")
                {
                    OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTroTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                }
                else if (CompanyName == "TRM")
                {
                    OperationID = objCCustomizedDBCall.CallStringFunctionByMultiReturn("select top 1 TaxID from ForwardingTransMasirTax.dbo.TaxLink WHERE Notes='Operations' and OriginID = " + pOperationID);
                }

                if (OperationID !="")
                {
                    CVarOperationPartnersTAX objCVarOperationPartnersTax = new CVarOperationPartnersTAX();

                    objCVarOperationPartnersTax.OperationID = int.Parse(OperationID);
                    objCVarOperationPartnersTax.OperationPartnerTypeID = pOperationPartnerTypeID;
                    objCVarOperationPartnersTax.CustomerID = objCCCustomersTax.lstCVarCustomersTAX.Count > 0 ? objCCCustomersTax.lstCVarCustomersTAX[0].ID : 0;
                    objCVarOperationPartnersTax.AgentID = objCAgentsTax.lstCVarAgentsTax.Count > 0 ? objCAgentsTax.lstCVarAgentsTax[0].ID : 0;
                    objCVarOperationPartnersTax.ShippingAgentID = 0;
                    objCVarOperationPartnersTax.CustomsClearanceAgentID = CCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax.Count > 0 ? CCustomsClearanceAgentsTax.lstCVarCustomsClearanceAgentsTax[0].ID : 0;
                    objCVarOperationPartnersTax.ShippingLineID = objCShippingLinesTax.lstCVarShippingLines.Count > 0 ? objCShippingLinesTax.lstCVarShippingLines[0].ID : 0;
                    objCVarOperationPartnersTax.AirlineID = objCAirlinesTAX.lstCVarAirlinesTAX.Count > 0 ? objCAirlinesTAX.lstCVarAirlinesTAX[0].ID : 0;
                    objCVarOperationPartnersTax.TruckerID = objCTruckersTAX.lstCVarTruckers.Count > 0 ? objCTruckersTAX.lstCVarTruckers[0].ID : 0;
                    objCVarOperationPartnersTax.SupplierID = objCCSuppliersTax.lstCVarSuppliersTax.Count > 0 ? objCCSuppliersTax.lstCVarSuppliersTax[0].ID : 0;
                    objCVarOperationPartnersTax.CustodyID = objCCustodyTAX.lstCVarCustodyTAX.Count > 0 ? objCCustodyTAX.lstCVarCustodyTAX[0].ID : 0;
                    objCVarOperationPartnersTax.ContactID = pContactID;
                    objCVarOperationPartnersTax.IsOperationClient = pIsOperationClient;

                    objCVarOperationPartnersTax.CreatorUserID = objCVarOperationPartnersTax.ModificatorUserID = WebSecurity.CurrentUserId;
                    objCVarOperationPartnersTax.CreationDate = objCVarOperationPartnersTax.ModificationDate = DateTime.Now;

                    COperationPartnersTAX objCOperationPartnersTax = new COperationPartnersTAX();
                    objCOperationPartnersTax.lstCVarOperationPartnersTAX.Add(objCVarOperationPartnersTax);
                    checkException = objCOperationPartnersTax.SaveMethod(objCOperationPartnersTax.lstCVarOperationPartnersTAX);
                    if (checkException != null) // an exception is caught in the model
                    {
                        if (checkException.Message.Contains("UNIQUE"))
                            _result = false;
                    }
                    else
                    {
                        _result = true;
                        string updateClause = "";
                        if (pIsOperationClient)//not unique
                        {
                            #region Update IsOperationClient to false for all other partners on the operation
                            updateClause = " IsOperationClient = 0 ";
                            updateClause += " WHERE OperationID=" + pOperationID.ToString() + " AND ID<>" + objCVarOperationPartners.ID.ToString();
                            objCOperationPartnersTax.UpdateList(updateClause);
                            #endregion Update IsOperationClient to false for all other partners on the operation
                        }//if (pIsOperationClient)//not unique

                        #region LinkIds
                        //link
                        objCCustomizedDBCall.ExecuteQuery_DataTable("insertTaxLink " + objCVarOperationPartners.ID + "," + objCVarOperationPartnersTax.ID + "," + "OperationPartners");
                        #endregion
                    }
                }
               

            }
            #endregion
            return _result;
        }

        [HttpGet, HttpPost]
        public object[] Update(Int64 pID, Int64 pOperationID, int pBLType, int pOperationPartnerTypeID, int pCustomerID, int pAgentID, int pShippingAgentID, int pCustomsClearanceAgentID, int pShippingLineID, int pAirlineID, int pTruckerID, int pSupplierID, int pCustodyID, Int64 pContactID, int pDirectionType, int pPartnerID
            , bool pIsOperationClient) // pDirectionType: to decide wether to set shipper or consignee in Operations, //pPartnerID:used to pass check to allow save partners used in invoice or payables in case of changing contact only
        {
            bool _result = false;
            string msgReturned = "";
            COperationPartners objCCheckOperationPartners = new COperationPartners();
            objCCheckOperationPartners.GetList("WHERE ID=(SELECT MIN(ID) FROM OperationPartners WHERE OperationID=" + pOperationID.ToString() + " AND OperationPartnerTypeID=" + pOperationPartnerTypeID.ToString() + ")AND ID=" + pID.ToString());
            ////_IsUpdatePartnerOnOperation: true if the its the first partner entered
            //bool _IsUpdatePartnerOnOperation = (objCCheckOperationPartners.lstCVarOperationPartners.Count > 0 ? true : false);

            CDefaults objCDefaults = new CDefaults();
            objCDefaults.GetListPaging(1, 1, "", "ID", out _);
            if (objCDefaults.lstCVarDefaults[0].UnEditableCompanyName == "AKS" && pCustomerID > 0)
            {
                var cust = new CCustomers();
                Exception ee = cust.GetItem(pCustomerID);
                if(ee == null && cust.lstCVarCustomers.Count == 1 && cust.lstCVarCustomers[0].IsMustPay)
                {
                    return new object[] { false, "Customer Is Blacklisted" };
                }
            }

            if (1==1)//(CheckIfOperationPartnerCanBeChanged(pID, pOperationPartnerTypeID, pPartnerID))
            {
                CVarOperationPartners objCVarOperationPartners = new CVarOperationPartners();
                CNetwork objCNetwork = new CNetwork();

                //**********************************************************************
                //COperations cOperations = new COperations();
                //CVarOperations objCVarOperations = new CVarOperations();
                //objCVarOperations.ConsigneeID = pCustomerID;
                //cOperations.lstCVarOperations.Add(objCVarOperations);
                //cOperations.SaveMethod(cOperations.lstCVarOperations);
                //***********************************************************************




                //the next 4 lines to get the CreatorUserID and CreationDate and set them as they were entered before
                COperationPartners objCGetCreationInformation = new COperationPartners();
                objCGetCreationInformation.GetItem(pID);
                objCVarOperationPartners.CreatorUserID = objCGetCreationInformation.lstCVarOperationPartners[0].CreatorUserID;
                objCVarOperationPartners.CreationDate = objCGetCreationInformation.lstCVarOperationPartners[0].CreationDate;

                objCVarOperationPartners.ID = pID;

                objCVarOperationPartners.OperationID = pOperationID;
                objCVarOperationPartners.OperationPartnerTypeID = pOperationPartnerTypeID;
                objCVarOperationPartners.CustomerID = pCustomerID;
                objCVarOperationPartners.AgentID = pAgentID;
                objCVarOperationPartners.ShippingAgentID = pShippingAgentID;
                objCVarOperationPartners.CustomsClearanceAgentID = pCustomsClearanceAgentID;
                objCVarOperationPartners.ShippingLineID = pShippingLineID;
                objCVarOperationPartners.AirlineID = pAirlineID;
                objCVarOperationPartners.TruckerID = pTruckerID;
                objCVarOperationPartners.SupplierID = pSupplierID;
                objCVarOperationPartners.CustodyID = pCustodyID; 
                objCVarOperationPartners.ContactID = pContactID;
                objCVarOperationPartners.IsOperationClient = pIsOperationClient;

                objCVarOperationPartners.ModificatorUserID = WebSecurity.CurrentUserId;
                objCVarOperationPartners.ModificationDate = DateTime.Now;

                COperationPartners objCOperationPartners = new COperationPartners();
                objCOperationPartners.lstCVarOperationPartners.Add(objCVarOperationPartners);
                Exception checkException = objCOperationPartners.SaveMethod(objCOperationPartners.lstCVarOperationPartners);
                if (checkException != null) // an exception is caught in the model
                {
                    if (checkException.Message.Contains("UNIQUE"))
                        _result = false;
                }
                else //not unique
                {
                    _result = true;
                    string updateClause = "";
                   
                    #region Update Client or Agent
                    //if (_IsUpdatePartnerOnOperation)
                    if (pIsOperationClient)
                    {
                        updateClause = " ConsigneeID = " + (pCustomerID == 0 ? "NULL" : pCustomerID.ToString());
                        updateClause += " , ConsigneeContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                        updateClause += " WHERE ID = " + pOperationID.ToString();
                        COperations objCOperation = new COperations();
                        objCOperation.UpdateList(updateClause);
                        //// Decide wether to update shipper or consignee in Operations
                        //// pOperationPartnerTypeID: 1=Shipper, 2=consignee, .....
                        ////if (pDirectionType == 1 && pOperationPartnerTypeID == 2) //import operation, so the Client is the consignee so update it
                        //if (pOperationPartnerTypeID == 2) //I updated the previous condition to update partner in operations wether consignee, shipper or agent to handle the case of changing the operation type so i find the client
                        //{
                        //    updateClause = " ConsigneeID = " + (pCustomerID == 0 ? "NULL" : pCustomerID.ToString());
                        //    updateClause += " , ConsigneeContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                        //    updateClause += " WHERE ID = " + pOperationID.ToString();
                        //    COperations objCOperations = new COperations();
                        //    objCOperations.UpdateList(updateClause);
                        //}
                        ////if ((pDirectionType == 2 || pDirectionType == 3) && pOperationPartnerTypeID == 1) //export or domestic operation, so the Client is the consignee so update it
                        //if (pOperationPartnerTypeID == 1) //I updated the previous condition to update partner in operations wether consignee, shipper or agent to handle the case of changing the operation type so i find the client
                        //{
                        //    updateClause = " ShipperID = " + (pCustomerID == 0 ? "NULL" : pCustomerID.ToString());
                        //    updateClause += " , ShipperContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                        //    updateClause += " WHERE ID = " + pOperationID.ToString();
                        //    COperations objCOperations = new COperations();
                        //    objCOperations.UpdateList(updateClause);
                        //}
                        ////if (pBLType == 3 && pOperationPartnerTypeID == 6) //Master operation, so update Agent in the Operation
                        //if (pOperationPartnerTypeID == 6) //I updated the previous condition to update partner in operations wether consignee, shipper or agent to handle the case of changing the operation type so i find the client
                        //{
                        //    updateClause = " AgentID = " + (pAgentID == 0 ? "NULL" : pAgentID.ToString());
                        //    updateClause += " , NetworkID = null ";
                        //    updateClause += " , AgentContactID = " + (pContactID == 0 ? "null" : pContactID.ToString());
                        //    updateClause += " WHERE ID = " + pOperationID.ToString();
                        //    COperations objCOperations = new COperations();
                        //    objCOperations.UpdateList(updateClause);
                        //}
                        #region Update IsOperationClient to false for all other partners on the operation
                        updateClause = " IsOperationClient = 0 ";
                        updateClause += " WHERE OperationID=" + pOperationID.ToString() + " AND ID<>" + objCVarOperationPartners.ID.ToString();
                        objCOperationPartners.UpdateList(updateClause);
                        #endregion Update IsOperationClient to false for all other partners on the operation
                    } //if(pIsOperationClient)
                    #endregion
                    #region UpdateOperationConsignee2
                    if(objCVarOperationPartners.OperationPartnerTypeID==3 && objCVarOperationPartners.CustomerID>0)
                    {
                        COperations objCOperations = new COperations();
                        checkException = objCOperations.UpdateList($" ConsigneeID2 = {objCVarOperationPartners.CustomerID} where ID = {objCVarOperationPartners.OperationID}");
                    } else if(objCVarOperationPartners.OperationPartnerTypeID == 11 && objCVarOperationPartners.TruckerID > 0)
                    {
                        COperations objCOperations2 = new COperations();
                        checkException = objCOperations2.UpdateList($" TruckerID = {objCVarOperationPartners.TruckerID} where ID = {objCVarOperationPartners.OperationID}");
                    } else if(objCVarOperationPartners.OperationPartnerTypeID == 1 && objCVarOperationPartners.CustomerID > 0)
                    { // Shipper
                        COperations objCOperations = new COperations();
                        checkException = objCOperations.UpdateList($" ShipperID = {objCVarOperationPartners.CustomerID} where ID = {objCVarOperationPartners.OperationID}");
                    } else if(objCVarOperationPartners.OperationPartnerTypeID == 2 && objCVarOperationPartners.CustomerID > 0)
                    {//Consignee
                        COperations objCOperations = new COperations();
                        checkException = objCOperations.UpdateList($" ConsigneeID = {objCVarOperationPartners.CustomerID} where ID = {objCVarOperationPartners.OperationID}");
                    } else if(objCVarOperationPartners.OperationPartnerTypeID == 6)
                    {//Agent
                        COperations objCOperations = new COperations();
                        checkException = objCOperations.UpdateList($" AgentID = {(pAgentID == 0 ? "NULL" : pAgentID.ToString())}, AgentContactID = {(pContactID == 0 ? "NULL" : pContactID.ToString())} where ID = {objCVarOperationPartners.OperationID}");
                    }
                    #endregion
                }
            }
            else
            {
                _result = false;
                msgReturned = "This Partner might be used in Payables, Receivables, Invoices or C/D Notes.";
            }
            return new object[] { _result, msgReturned };
        }

        [HttpGet, HttpPost]
        public bool CheckIfOperationPartnerCanBeChanged(Int64 pOperationPartnerID, int pOperationPartnerTypeID, int pPartnerID)
        {
            bool _result = true;
            CvwOperationPartners objCvwOperationPartners = new CvwOperationPartners();
            objCvwOperationPartners.GetList(" WHERE ID = " + pOperationPartnerID);
            if (objCvwOperationPartners.lstCVarvwOperationPartners[0].UsedInInvoicesCount > 0 || objCvwOperationPartners.lstCVarvwOperationPartners[0].UsedInPayablesCount > 0
                && (objCvwOperationPartners.lstCVarvwOperationPartners[0].OperationPartnerTypeID != pOperationPartnerTypeID || objCvwOperationPartners.lstCVarvwOperationPartners[0].PartnerID != pPartnerID) 
               )
                _result = false;
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Delete(String pOperationPartnersIDs)
        {
            bool _result = true;
            COperationPartners objCOperationPartners = new COperationPartners();
            
            foreach (var currentID in pOperationPartnersIDs.Split(','))
            {
                objCOperationPartners.lstDeletedCPKOperationPartners.Add(new CPKOperationPartners() { ID = Int64.Parse(currentID.Trim()) });
            }

            Exception checkException = objCOperationPartners.DeleteItem(objCOperationPartners.lstDeletedCPKOperationPartners);
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
