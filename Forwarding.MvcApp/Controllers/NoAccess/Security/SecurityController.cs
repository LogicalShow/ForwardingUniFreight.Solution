using Forwarding.MvcApp.Models.Administration.Security.Generated;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.NoAccess.Security
{
    public class SecurityController : ApiController
    {
        //[Route("/api/Security/Modules_LoadAll")]
        [HttpPost] // to load modules(menu items) and groups(tabs)
        public object[] Modules_LoadAll([FromBody] ModulesData modulesData)
        {

            CvwUsers objCvwUsers = new CvwUsers();

            var CurrentUserID = WebSecurity.CurrentUserId;

            objCvwUsers.GetList(" where ID = " + CurrentUserID + "");

            var CurrentUser = objCvwUsers.lstCVarvwUsers[0];
            Int32 _RowCount = 0;
            //sherif: i changed here the httpverb to be get so i can send the pCultureID parameter from the js ajax
            //sherif: i didnt call SetLanguage fn cz it cant be seen here as this class is an ApiController
            Thread.CurrentThread.CurrentCulture = new CultureInfo(modulesData.pCutlureID);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;
            //i have to put the ResourceManager after the previous 2 lines so language is set
            var strHomePage = "HomePage";// coz i need to hold the value from the resources for translation
            strHomePage = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(strHomePage);

            // modulesData.pWhereClause += " AND IsInactive<>1 AND UserID = " + WebSecurity.CurrentUserId.ToString();

            if (CurrentUser.CustomerID == 0)
                modulesData.pWhereClause += " AND IsNull(IsForCustomers , 0) = 0 AND IsInactive<>1 AND UserID = " + WebSecurity.CurrentUserId.ToString();
            else
                modulesData.pWhereClause += " AND IsNull(IsForCustomers , 0) = 1 and IsInactive<>1 AND UserID = " + WebSecurity.CurrentUserId.ToString();


            CvwUserGroups objCvwUserGroups = new CvwUserGroups();
            objCvwUserGroups.GetListPaging(999, 1, modulesData.pWhereClause, modulesData.pOrderBy, out _RowCount);
            if (objCvwUserGroups != null && objCvwUserGroups.lstCVarvwUserGroups.Count > 0)
                foreach (var currentGroup in objCvwUserGroups.lstCVarvwUserGroups)
                {
                    currentGroup.GroupCode = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentGroup.GroupCode, true);
                    var value = currentGroup.GroupCode.ToString();
                    currentGroup.GroupDecryptedName = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                    if (currentGroup.ParentGroupCode != "0")
                    {
                        value = Forwarding.BLL.Utilities.CEncryptDecrypt.Decrypt(currentGroup.ParentGroupCode, true);
                        currentGroup.ParentGroupCode = Forwarding.MvcApp.App_Resources.App_Resources.ResourceManager.GetString(value);
                    }
                }
            #region Customized Security Tabs

            //get operations and quotations normal security (& Customers & Agents)
            CvwUserForms objCvwUserForms = new CvwUserForms();
            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='Customers' ORDER BY FormID ");
            bool CustomersCanAdd = objCvwUserForms.lstCVarvwUserForms[0].CanAdd;
            bool CustomersCanEdit = objCvwUserForms.lstCVarvwUserForms[0].CanEdit;
            bool CustomersCanDelete = objCvwUserForms.lstCVarvwUserForms[0].CanDelete;
            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='Agents' ORDER BY FormID ");
            bool AgentsCanAdd = objCvwUserForms.lstCVarvwUserForms[0].CanAdd;
            bool AgentsCanEdit = objCvwUserForms.lstCVarvwUserForms[0].CanEdit;

            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND (FormID = " + modulesData.pQuotationFormID + " OR FormID = " + modulesData.pOperationFormID + ") ORDER BY FormID ");
            bool QuotationsCanView = objCvwUserForms.lstCVarvwUserForms[0].CanView;
            bool QuotationsCanAdd = objCvwUserForms.lstCVarvwUserForms[0].CanAdd;
            bool QuotationsCanEdit = objCvwUserForms.lstCVarvwUserForms[0].CanEdit;
            bool QuotationsCanDelete = objCvwUserForms.lstCVarvwUserForms[0].CanDelete;

            bool OperationsCanView = objCvwUserForms.lstCVarvwUserForms[1].CanView;
            bool OperationsCanAdd = objCvwUserForms.lstCVarvwUserForms[1].CanAdd;
            bool OperationsCanEdit = objCvwUserForms.lstCVarvwUserForms[1].CanEdit;
            bool OperationsCanDelete = objCvwUserForms.lstCVarvwUserForms[1].CanDelete;
            //EOF get operations and quotations normal security

            CvwSecUserCustomizedTabs objCvwSecUserCustomizedTabs = new CvwSecUserCustomizedTabs();
            objCvwSecUserCustomizedTabs.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString());
            //TabName is used as Module name
            bool GeneralQuotationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Quotations")).CanView;
            bool GeneralQuotationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Quotations")).CanAdd;
            bool GeneralQuotationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Quotations")).CanEdit;
            bool GeneralQuotationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Quotations")).CanDelete;

            bool PartnersQuotationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Quotations")).CanView;
            bool PartnersQuotationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Quotations")).CanAdd;
            bool PartnersQuotationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Quotations")).CanEdit;
            bool PartnersQuotationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Quotations")).CanDelete;

            bool PackagesQuotationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Quotations")).CanView;
            bool PackagesQuotationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Quotations")).CanAdd;
            bool PackagesQuotationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Quotations")).CanEdit;
            bool PackagesQuotationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Quotations")).CanDelete;

            bool RoutingQuotationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Quotations")).CanView;
            bool RoutingQuotationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Quotations")).CanAdd;
            bool RoutingQuotationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Quotations")).CanEdit;
            bool RoutingQuotationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Quotations")).CanDelete;

            bool ChargesQuotationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Charges" && c.TabName == "Quotations")).CanView;
            bool ChargesQuotationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Charges" && c.TabName == "Quotations")).CanAdd;
            bool ChargesQuotationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Charges" && c.TabName == "Quotations")).CanEdit;
            bool ChargesQuotationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Charges" && c.TabName == "Quotations")).CanDelete;

            bool UploadFilesQuotationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "UploadFiles" && c.TabName == "Quotations")).CanView;
            bool UploadFilesQuotationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "UploadFiles" && c.TabName == "Quotations")).CanAdd;
            bool UploadFilesQuotationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "UploadFiles" && c.TabName == "Quotations")).CanEdit;
            bool UploadFilesQuotationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "UploadFiles" && c.TabName == "Quotations")).CanDelete;

            //Operations
            bool GeneralOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Operations")).CanView;
            bool GeneralOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Operations")).CanAdd;
            bool GeneralOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Operations")).CanEdit;
            bool GeneralOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "General" && c.TabName == "Operations")).CanDelete;

            bool PartnersOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Operations")).CanView;
            bool PartnersOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Operations")).CanAdd;
            bool PartnersOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Operations")).CanEdit;
            bool PartnersOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Partners" && c.TabName == "Operations")).CanDelete;

            bool PackagesOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Operations")).CanView;
            bool PackagesOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Operations")).CanAdd;
            bool PackagesOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Operations")).CanEdit;
            bool PackagesOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Packages" && c.TabName == "Operations")).CanDelete;

            bool VehicleOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Vehicle" && c.TabName == "Operations")).CanView;
            bool VehicleOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Vehicle" && c.TabName == "Operations")).CanAdd;
            bool VehicleOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Vehicle" && c.TabName == "Operations")).CanEdit;
            bool VehicleOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Vehicle" && c.TabName == "Operations")).CanDelete;

            bool RoutingOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Operations")).CanView;
            bool RoutingOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Operations")).CanAdd;
            bool RoutingOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Operations")).CanEdit;
            bool RoutingOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Routing" && c.TabName == "Operations")).CanDelete;

            bool InterDepartmentServiceOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "InterDepartmentService" && c.TabName == "Operations")).CanView;
            bool InterDepartmentServiceOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "InterDepartmentService" && c.TabName == "Operations")).CanAdd;
            bool InterDepartmentServiceOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "InterDepartmentService" && c.TabName == "Operations")).CanEdit;
            bool InterDepartmentServiceOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "InterDepartmentService" && c.TabName == "Operations")).CanDelete;

            bool PayablesOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Payables" && c.TabName == "Operations")).CanView;
            bool PayablesOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Payables" && c.TabName == "Operations")).CanAdd;
            bool PayablesOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Payables" && c.TabName == "Operations")).CanEdit;
            bool PayablesOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Payables" && c.TabName == "Operations")).CanDelete;

            bool ReceivablesOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Receivables" && c.TabName == "Operations")).CanView;
            bool ReceivablesOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Receivables" && c.TabName == "Operations")).CanAdd;
            bool ReceivablesOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Receivables" && c.TabName == "Operations")).CanEdit;
            bool ReceivablesOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Receivables" && c.TabName == "Operations")).CanDelete;

            bool InvoicesOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Invoices" && c.TabName == "Operations")).CanView;
            bool InvoicesOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Invoices" && c.TabName == "Operations")).CanAdd;
            bool InvoicesOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Invoices" && c.TabName == "Operations")).CanEdit;
            bool InvoicesOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Invoices" && c.TabName == "Operations")).CanDelete;

            bool DraftInvoiceOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DraftInvoice" && c.TabName == "Operations")).CanView;
            bool DraftInvoiceOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DraftInvoice" && c.TabName == "Operations")).CanAdd;
            bool DraftInvoiceOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DraftInvoice" && c.TabName == "Operations")).CanEdit;
            bool DraftInvoiceOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DraftInvoice" && c.TabName == "Operations")).CanDelete;

            bool PurchaseInvoiceOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchaseInvoice" && c.TabName == "Operations")).CanView;
            bool PurchaseInvoiceOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchaseInvoice" && c.TabName == "Operations")).CanAdd;
            bool PurchaseInvoiceOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchaseInvoice" && c.TabName == "Operations")).CanEdit;
            bool PurchaseInvoiceOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchaseInvoice" && c.TabName == "Operations")).CanDelete;

            bool DocsOutOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsOut" && c.TabName == "Operations")).CanView;
            bool DocsOutOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsOut" && c.TabName == "Operations")).CanAdd;
            bool DocsOutOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsOut" && c.TabName == "Operations")).CanEdit;
            bool DocsOutOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsOut" && c.TabName == "Operations")).CanDelete;

            bool MasterOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Master" && c.TabName == "Operations")).CanView;
            bool MasterOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Master" && c.TabName == "Operations")).CanAdd;
            bool MasterOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Master" && c.TabName == "Operations")).CanEdit;
            bool MasterOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Master" && c.TabName == "Operations")).CanDelete;

            bool ShipmentsOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Shipments" && c.TabName == "Operations")).CanView;
            bool ShipmentsOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Shipments" && c.TabName == "Operations")).CanAdd;
            bool ShipmentsOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Shipments" && c.TabName == "Operations")).CanEdit;
            bool ShipmentsOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Shipments" && c.TabName == "Operations")).CanDelete;

            bool DocsInOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsIn" && c.TabName == "Operations")).CanView;
            bool DocsInOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsIn" && c.TabName == "Operations")).CanAdd;
            bool DocsInOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsIn" && c.TabName == "Operations")).CanEdit;
            bool DocsInOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "DocsIn" && c.TabName == "Operations")).CanDelete;
            var DocsInPOperationstab = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PayablesInvoices" && c.TabName == "Operations"));

            bool DocsInPOperationsCanView = DocsInPOperationstab != null ? DocsInPOperationstab.CanView : false;
            bool DocsInPOperationsCanAdd = DocsInPOperationstab != null ? DocsInPOperationstab.CanAdd : false;
            bool DocsInPOperationsCanEdit = DocsInPOperationstab != null ? DocsInPOperationstab.CanEdit : false;
            bool DocsInPOperationsCanDelete = DocsInPOperationstab != null ? DocsInPOperationstab.CanDelete : false;

            //bool DocsInPOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PayablesInvoices" && c.TabName == "Operations")).CanView;
            //bool DocsInPOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PayablesInvoices" && c.TabName == "Operations")).CanAdd;
            //bool DocsInPOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PayablesInvoices" && c.TabName == "Operations")).CanEdit;
            //bool DocsInPOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PayablesInvoices" && c.TabName == "Operations")).CanDelete;

            bool AccNotesOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "AccNotes" && c.TabName == "Operations")).CanView;
            bool AccNotesOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "AccNotes" && c.TabName == "Operations")).CanAdd;
            bool AccNotesOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "AccNotes" && c.TabName == "Operations")).CanEdit;
            bool AccNotesOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "AccNotes" && c.TabName == "Operations")).CanDelete;

            bool TrackingOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Tracking" && c.TabName == "Operations")).CanView;
            bool TrackingOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Tracking" && c.TabName == "Operations")).CanAdd;
            bool TrackingOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Tracking" && c.TabName == "Operations")).CanEdit;
            bool TrackingOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Tracking" && c.TabName == "Operations")).CanDelete;

            bool OperationNotificationOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "OperationNotification" && c.TabName == "Operations")).CanView;
            bool OperationNotificationOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "OperationNotification" && c.TabName == "Operations")).CanAdd;
            bool OperationNotificationOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "OperationNotification" && c.TabName == "Operations")).CanEdit;
            bool OperationNotificationOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "OperationNotification" && c.TabName == "Operations")).CanDelete;

            bool DeliveryCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Delivery" && c.TabName == "Operations")).CanView;
            bool DeliveryCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Delivery" && c.TabName == "Operations")).CanAdd;
            bool DeliveryCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Delivery" && c.TabName == "Operations")).CanEdit;
            bool DeliveryCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "Delivery" && c.TabName == "Operations")).CanDelete;

            bool ACIDDetailsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "ACIDDetails" && c.TabName == "Operations")).CanView;
            bool ACIDDetailsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "ACIDDetails" && c.TabName == "Operations")).CanAdd;
            bool ACIDDetailsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "ACIDDetails" && c.TabName == "Operations")).CanEdit;
            bool ACIDDetailsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "ACIDDetails" && c.TabName == "Operations")).CanDelete;

            bool PurchasingInvoiceOperationsCanView = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchasingInvoice" && c.TabName == "Operations")).CanView;
            bool PurchasingInvoiceOperationsCanAdd = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchasingInvoice" && c.TabName == "Operations")).CanAdd;
            bool PurchasingInvoiceOperationsCanEdit = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchasingInvoice" && c.TabName == "Operations")).CanEdit;
            bool PurchasingInvoiceOperationsCanDelete = objCvwSecUserCustomizedTabs.lstCVarvwSecUserCustomizedTabs.Find(c => (c.TabCode == "PurchasingInvoice" && c.TabName == "Operations")).CanDelete;

            #endregion Customized Security Tabs

            #region Forms CanAdd that are used in Quotations Route Modal
            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='ShippingLines' ORDER BY FormID ");
            bool ShippingLinesCanAdd = objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false;

            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='AirLines' ORDER BY FormID ");
            bool AirLinesCanAdd = objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false;

            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='Truckers' ORDER BY FormID ");
            bool TruckersCanAdd = objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false;
            
            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='Commodities' ORDER BY FormID ");
            bool CommoditiesCanAdd = objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false;

            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='Ports' ORDER BY FormID ");
            bool PortsCanAdd = objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false;

            objCvwUserForms.GetList(" WHERE UserID = " + WebSecurity.CurrentUserId.ToString()
                                    + " AND IsInactive<>1 AND ImageName='Incoterms' ORDER BY FormID ");
            bool IncotermsCanAdd = objCvwUserForms.lstCVarvwUserForms.Count > 0 ? objCvwUserForms.lstCVarvwUserForms[0].CanAdd : false;
            #endregion Forms CanAdd that are used in Quotations Route Modal


            return new Object[] { new JavaScriptSerializer().Serialize(objCvwUserGroups.lstCVarvwUserGroups), strHomePage
            , QuotationsCanView, QuotationsCanAdd, QuotationsCanEdit,QuotationsCanDelete,OperationsCanView,OperationsCanAdd,OperationsCanEdit,OperationsCanDelete // 2 : 9

            , GeneralQuotationsCanView, GeneralQuotationsCanAdd, GeneralQuotationsCanEdit, GeneralQuotationsCanDelete // 10
            , PartnersQuotationsCanView, PartnersQuotationsCanAdd, PartnersQuotationsCanEdit, PartnersQuotationsCanDelete   // 14
            , PackagesQuotationsCanView, PackagesQuotationsCanAdd, PackagesQuotationsCanEdit, PackagesQuotationsCanDelete   //18
            , RoutingQuotationsCanView, RoutingQuotationsCanAdd, RoutingQuotationsCanEdit, RoutingQuotationsCanDelete       //22
            , ChargesQuotationsCanView, ChargesQuotationsCanAdd, ChargesQuotationsCanEdit, ChargesQuotationsCanDelete       //26

            , GeneralOperationsCanView, GeneralOperationsCanAdd, GeneralOperationsCanEdit, GeneralOperationsCanDelete       //30
            , PartnersOperationsCanView, PartnersOperationsCanAdd, PartnersOperationsCanEdit, PartnersOperationsCanDelete   //34
            , PackagesOperationsCanView, PackagesOperationsCanAdd, PackagesOperationsCanEdit, PackagesOperationsCanDelete   //38
            , RoutingOperationsCanView, RoutingOperationsCanAdd, RoutingOperationsCanEdit, RoutingOperationsCanDelete       //42
            , PayablesOperationsCanView, PayablesOperationsCanAdd, PayablesOperationsCanEdit, PayablesOperationsCanDelete   //46
            , ReceivablesOperationsCanView, ReceivablesOperationsCanAdd, ReceivablesOperationsCanEdit, ReceivablesOperationsCanDelete   //50
            , InvoicesOperationsCanView, InvoicesOperationsCanAdd, InvoicesOperationsCanEdit, InvoicesOperationsCanDelete   //54
            , DocsOutOperationsCanView, DocsOutOperationsCanAdd, DocsOutOperationsCanEdit, DocsOutOperationsCanDelete       //58
            , MasterOperationsCanView, MasterOperationsCanAdd, MasterOperationsCanEdit, MasterOperationsCanDelete           //62
            , ShipmentsOperationsCanView, ShipmentsOperationsCanAdd, ShipmentsOperationsCanEdit, ShipmentsOperationsCanDelete   //66
            , DocsInOperationsCanView, DocsInOperationsCanAdd, DocsInOperationsCanEdit, DocsInOperationsCanDelete           //70
            , AccNotesOperationsCanView, AccNotesOperationsCanAdd, AccNotesOperationsCanEdit, AccNotesOperationsCanDelete   //74
            , TrackingOperationsCanView, TrackingOperationsCanAdd, TrackingOperationsCanEdit, TrackingOperationsCanDelete   //78
            //Customers
            , CustomersCanAdd, CustomersCanEdit, AgentsCanAdd, AgentsCanEdit    //82
            , PurchaseInvoiceOperationsCanView, PurchaseInvoiceOperationsCanAdd, PurchaseInvoiceOperationsCanEdit, PurchaseInvoiceOperationsCanDelete   //86
            , DraftInvoiceOperationsCanView, DraftInvoiceOperationsCanAdd, DraftInvoiceOperationsCanEdit, DraftInvoiceOperationsCanDelete   //90
            , OperationNotificationOperationsCanView, OperationNotificationOperationsCanAdd, OperationNotificationOperationsCanEdit, OperationNotificationOperationsCanDelete
            , VehicleOperationsCanView, VehicleOperationsCanAdd, VehicleOperationsCanEdit, VehicleOperationsCanDelete   //98
            , InterDepartmentServiceOperationsCanView, InterDepartmentServiceOperationsCanAdd, InterDepartmentServiceOperationsCanEdit, InterDepartmentServiceOperationsCanDelete
            , DeliveryCanView, DeliveryCanAdd, DeliveryCanEdit, DeliveryCanDelete       //106
            , ACIDDetailsCanView, ACIDDetailsCanAdd, ACIDDetailsCanEdit, ACIDDetailsCanDelete   //110
            
            , UploadFilesQuotationsCanView, UploadFilesQuotationsCanAdd, UploadFilesQuotationsCanEdit, UploadFilesQuotationsCanDelete   //114

            , ShippingLinesCanAdd, AirLinesCanAdd, TruckersCanAdd, CommoditiesCanAdd, PortsCanAdd, IncotermsCanAdd  //118

            , PurchasingInvoiceOperationsCanView, PurchasingInvoiceOperationsCanAdd, PurchasingInvoiceOperationsCanEdit, PurchasingInvoiceOperationsCanDelete   //122
            , CustomersCanDelete //128
              , DocsInPOperationsCanView, DocsInPOperationsCanAdd, DocsInPOperationsCanEdit, DocsInPOperationsCanDelete           //132
            };
        }
    }

    public class ModulesData
    {
        public string pCutlureID { get; set; }
        public string pWhereClause { get; set; }
        public string pOrderBy { get; set; }
        public int pOperationFormID { get; set; }
        public int pQuotationFormID { get; set; }
    }
}
