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
using Forwarding.MvcApp.Models.PR.MasterData.Generated;
using System.Data.SqlClient;
using System.Configuration;
using Forwarding.MvcApp.Models.PS.PS_Transactions.Generated;
using Forwarding.MvcApp.Models.MasterData.Others.Generated;
using Forwarding.MvcApp.Models.SC.Transactions.Customized;

namespace Forwarding.MvcApp.Controllers.PR.API_PR_ProductStages
{
    public class PR_ProductStagesController : ApiController
    {
        //[Route("/api/PR_ProductStages/LoadAll")]
        //[HttpGet, HttpPost]
        ////sherif: to be used in select boxes
        //public Object[] LoadAll(string pWhereClause)
        //{
        //    CPR_ProductStages objCPR_ProductStages = new CPR_ProductStages();
        //    objCPR_ProductStages.GetList(pWhereClause);
        //    return new Object[] { new JavaScriptSerializer().Serialize(objCPR_ProductStages.lstCVarPR_ProductStages) };
        //}
         

        [HttpGet, HttpPost]
        public Object[] IntializeData(int? pID)
        {

            CSC_Stores cSC_Stores = new CSC_Stores();
           
            //-----
            CPackageTypes Units = new CPackageTypes();
           
            //-----
            CvwSC_PurchaseItem cPurchaseItem = new CvwSC_PurchaseItem();
            
            //------
            CvwSC_PurchaseItem FinalItems = new CvwSC_PurchaseItem();

            CvwPR_ProductStagesDetails cvwPR_ProductStagesDetails = new CvwPR_ProductStagesDetails();
            if (pID == null || pID == 0)
            {
                cSC_Stores.GetList("where 1 = 1");
                Units.GetList("where 1 = 1");
                FinalItems.GetList("where ID NOT In (select isnull( prs.ProductID , 0 ) from PR_FinalProduct prs where isnull( prs.IsDeleted , 0) = 0) order by Name");
                cPurchaseItem.GetList("where 1 = 1");
            }
            else
            {
                cvwPR_ProductStagesDetails.GetList("Where isnull( DIsDeleted , 0 ) = 0 and  FinalProductID = " + pID + " and isnull(IsDeleted , 0 ) = 0 ");
                FinalItems.GetList("where (ID NOT In (select isnull( prs.ProductID , 0 ) from PR_FinalProduct prs where isnull( prs.IsDeleted , 0) = 0) or (ID = (select top(1) prs.ProductID from PR_FinalProduct prs where prs.ID = "+ pID + " )))");
            }


            CPR_Stages cPR_Stages = new CPR_Stages();
            cPR_Stages.GetList("where 1 = 1");
            return new Object[] 
            {
            new JavaScriptSerializer().Serialize(cPurchaseItem.lstCVarvwSC_PurchaseItem),
            new JavaScriptSerializer().Serialize(cSC_Stores.lstCVarSC_Stores),
            new JavaScriptSerializer().Serialize(Units.lstCVarPackageTypes),
            new JavaScriptSerializer().Serialize(cPR_Stages.lstCVarPR_Stages) ,
            new JavaScriptSerializer().Serialize(FinalItems.lstCVarvwSC_PurchaseItem) ,
            new JavaScriptSerializer().Serialize(cvwPR_ProductStagesDetails.lstCVarvwPR_ProductStagesDetails.OrderBy(x=> x.OrderNo).ToList())
            };
            //----
        }




        [HttpGet, HttpPost]
        public Object[] FillBatchesItems(string pItemID, string pStoreID, DateTime pDate, string pTransactionID)
        {
            CPR_GetBatchesDetails cPR_GetBatchesDetails = new CPR_GetBatchesDetails();
            cPR_GetBatchesDetails.GetList(long.Parse(pItemID), int.Parse(pStoreID),(DateTime) pDate, int.Parse(pTransactionID));
            return new Object[] { new JavaScriptSerializer().Serialize(cPR_GetBatchesDetails.lstCVarPR_GetBatchesDetails) };
        }



        // [Route("/api/PR_ProductStages/LoadWithPaging/{pPageNumber}/{pPageSize}")]
        [HttpGet, HttpPost]
        public Object[] LoadWithPaging(Int32 pPageNumber, Int32 pPageSize, string pSearchKey)
        {
            CvwPR_FinalProduct vwPR_FinalProduct = new CvwPR_FinalProduct();
            //objCvwPR_ProductStages.GetList(string.Empty);
            Int32 _RowCount = 0;// objCvwPR_ProductStages.lstCVarPR_ProductStages.Count;
        pSearchKey = (pSearchKey == null ? "" : pSearchKey.Trim().ToUpper());
            string whereClause = " Where ProductName LIKE N'%" + pSearchKey + "%'";

            vwPR_FinalProduct.GetListPaging(pPageSize, pPageNumber, whereClause, " ID ", out _RowCount);

            return new Object[] { new JavaScriptSerializer().Serialize(vwPR_FinalProduct.lstCVarvwPR_FinalProduct), _RowCount };
        }
        
        [HttpGet, HttpPost]
        public long Save(
        string pID
      , string pProductID
      , string pFromStoreID
      , string pToStoreID
      , string pNotes
            , string pIsDeleted
            )
        {
            long _result = 0;

            CVarPR_FinalProduct objCVarPR_FinalProduct = new CVarPR_FinalProduct();
            objCVarPR_FinalProduct.ID = int.Parse(pID);
            objCVarPR_FinalProduct.ProductID = int.Parse( pProductID );
            objCVarPR_FinalProduct.FromStoreID = int.Parse(pFromStoreID);
            objCVarPR_FinalProduct.ToStoreID = int.Parse(pToStoreID);
            objCVarPR_FinalProduct.Notes = pNotes;
            objCVarPR_FinalProduct.IsDeleted = bool.Parse(pIsDeleted);
            


            CPR_FinalProduct objCPR_FinalProduct = new CPR_FinalProduct();
            objCPR_FinalProduct.lstCVarPR_FinalProduct.Add(objCVarPR_FinalProduct);
            Exception checkException = objCPR_FinalProduct.SaveMethod(objCPR_FinalProduct.lstCVarPR_FinalProduct);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = 0;
            }
            else //not unique
                _result = objCVarPR_FinalProduct.ID;
            return _result;
        }





        [HttpGet, HttpPost]
        [AllowAnonymous]
        public object[] InsertItems([FromBody]string pItems)
        {

                // Insert List Of Details
                string _result = "0";
                var istrue = false;
            CPR_ProductStages cPR_ProductStages = new CPR_ProductStages();
            CPR_ProductStagesDetails_In cPR_ProductStagesIn = new CPR_ProductStagesDetails_In();
            CPR_ProductStagesDetails_Out cPR_ProductStagesOut =  new CPR_ProductStagesDetails_Out();


            List<CVarPR_ProductStagesDetails_In> cVarPR_ProductStagesDetails_Ins = new List<CVarPR_ProductStagesDetails_In>();
            List<CVarPR_ProductStagesDetails_Out> cVarPR_ProductStagesDetails_Outs = new List<CVarPR_ProductStagesDetails_Out>();




            var Listobj = new JavaScriptSerializer().Deserialize<List<CVarvwPR_ProductStagesDetails>>(pItems);
            Listobj = Listobj.OrderBy(x=> x.OrderNo).ToList();


            var ProductStageID = 0;
            var Counter = 0;


          for (int i = 0; i< Listobj.Count; i++)
            {
                if(i == 0 || Listobj[i].OrderNo != Listobj[i-1].OrderNo )
                {
                    var Stage = new CVarPR_ProductStages();
                    Stage.OrderNo = Listobj[i].OrderNo;
                    Stage.StageID = Listobj[i].StageID;
                    Stage.ID = Listobj[i].ID;
                    Stage.ParentStageID = Listobj[i].ParentStageID;
                    Stage.IsDeleted = Listobj[i].IsDeleted;
                    Stage.FinalProductID = Listobj[i].FinalProductID;
                    cPR_ProductStages.lstCVarPR_ProductStages.Add(Stage);

                    Exception ex =   cPR_ProductStages.SaveMethod(cPR_ProductStages.lstCVarPR_ProductStages);
                    ProductStageID = cPR_ProductStages.lstCVarPR_ProductStages[Counter].ID;
                    Counter++;
                }



                if(Listobj[i].ISIn == true)
                {
                    var In = new CVarPR_ProductStagesDetails_In();
                    In.ID = Listobj[i].DID;
                    In.IsDeleted = (Listobj[i].IsDeleted == true ? true : Listobj[i].DIsDeleted);
                    In.Percentage = Listobj[i].Percentage;
                    In.Qty = Listobj[i].Qty;
                    In.ProductID = Listobj[i].ProductID;
                    In.ProductStageID = ProductStageID;



                    cVarPR_ProductStagesDetails_Ins.Add(In);

                }
                else
                {
                    var Out = new CVarPR_ProductStagesDetails_Out();
                    Out.ID = Listobj[i].DID;
                    Out.IsDeleted = (Listobj[i].IsDeleted == true ? true : Listobj[i].DIsDeleted);
                    Out.Percentage = Listobj[i].Percentage;
                    Out.Qty = Listobj[i].Qty;
                    Out.ProductID = Listobj[i].ProductID;
                    Out.ProductStageID = ProductStageID;
                    Out.IsDeleted = (Listobj[i].IsDeleted == true ? true : Listobj[i].DIsDeleted);


                    cVarPR_ProductStagesDetails_Outs.Add(Out);
                }



            }

          var Exception =  cPR_ProductStagesIn.SaveMethod(cVarPR_ProductStagesDetails_Ins);
           var Exception1 = cPR_ProductStagesOut.SaveMethod(cVarPR_ProductStagesDetails_Outs);


           if(Exception != null)
            {
                _result = Exception.Message;
                istrue = false; 

            }
           else if (Exception1 != null)
            {
                _result = Exception1.Message;
                istrue = false;

            }
           else
            {
                _result ="";
                istrue = true;
            }

                // Deserialize List -------------------------------------------------------------------------------


                istrue = true;
                    return new object[] { istrue, _result, 1 };
           




            
        }

        [HttpGet, HttpPost]
        public object[] Delete(String pPR_ProductStagesIDs)
        {
            bool _result = false;
            var ErrorMessage = "";
            CPR_ProductStages objCPR_ProductStages = new CPR_ProductStages();
            Exception checkException = objCPR_ProductStages.UpdateList("IsDeleted = 1 where ID IN("+ pPR_ProductStagesIDs + ")");
            if (checkException != null) // an exception is caught in the model
            {
                ErrorMessage = checkException.Message;
                    _result = false;
            }
            else
            {
                ErrorMessage = checkException.Message;
                _result = true;
            }

            return new Object[] { new JavaScriptSerializer().Serialize(_result),
                 new JavaScriptSerializer().Serialize(ErrorMessage) };
        }
    }
}
