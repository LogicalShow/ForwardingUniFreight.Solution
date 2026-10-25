using System;
using Forwarding.MvcApp.AutoMapperConfig;
using Q = Forwarding.MvcApp.Models.Quotations.Quotations.Generated.Old;

namespace Forwarding.MvcApp.Entities.Quotations
{
    [Serializable]
    public class CPKQuotations : Q.CPKQuotations
    {
    }

    public partial class CVarQuotations : Q.CVarQuotations
    {
        // initialize propety here 
        public CVarQuotations()
        {
            this.TemplateID_Transport = 0;
            this.TemplateID_Clearance = 0;
            this.TermsAndConditions_Clearance = "0";
            this.TermsAndConditions_Transport = "0";
            this.Subject_Clearance = "0";
            this.Subject_Transport = "0";
        }
        
        
    
    }

    public class CQuotations : Q.CQuotations
    {
        //#region "variables"
        //public List<CVarQuotations> lstCVarQuotations = new List<CVarQuotations>();
        //public List<CPKQuotations> lstDeletedCPKQuotations = new List<CPKQuotations>();
        //public Q.CQuotations _CQutations { get; set; }
        //#endregion

        //public CQuotations()
        //{
        //    _CQutations = new Q.CQuotations();

        //}
        //#region "Select Methods"
        //public Exception GetList(string WhereClause)
        //{

        //    return _CQutations.GetList(WhereClause);
        //}
        //public Exception GetListPaging(Int32 PageSize, Int32 PageNumber, string WhereClause, string OrderBy, out Int32 TotalRecords)
        //{
        //    return _CQutations.GetListPaging(PageSize, PageNumber, WhereClause, OrderBy, out TotalRecords);
        //}
        //public Exception GetItem(Int64 ID)
        //{
        //    return _CQutations.GetItem(ID);
        //}

        //#endregion
        //#region "Save Methods"
        //public Exception SaveMethod(List<CVarQuotations> SaveList)
        //{
        //    var _maped = AutoMap.Mapper.Map<List<Q.CVarQuotations>>(SaveList);
        //    var objCQuotations = new Q.CQuotations();
        //    var ex = objCQuotations.SaveMethod(_maped);
        //    return ex;
        //}
        //#endregion
        //#region "Update Methods"
        //public Exception UpdateList(string UpdateClause)
        //{
        //    var ex = _CQutations.UpdateList(UpdateClause);

        //    return ex;
        //}
        //#endregion
        //#region "Delete Methods"
        //public Exception DeleteItem(List<CPKQuotations> DeleteList)
        //{
        //    var _mapped = AutoMap.Mapper.Map<List<Q.CPKQuotations>>(DeleteList);
        //    return _CQutations.DeleteItem(_mapped);
        //}

        //public Exception DeleteList(string WhereClause)
        //{
        //    var ex = _CQutations.DeleteList(WhereClause);

        //    return ex;
        //}

        //#endregion
    }
}