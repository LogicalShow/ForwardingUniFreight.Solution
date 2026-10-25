//using DisbursementAccount.MvcApp.Models.DASJobs.Jobs;
//using DisbursementAccount.MvcApp.Models.MasterData.Others;
//using DisbursementAccount.MvcApp.Models.MasterData.Locations.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;
using Forwarding.MvcApp.Models.Administration.DisbursementLink.Generated;
using Forwarding.MvcApp.Models.MasterData.Partners.Generated;
//using Forwarding.MvcApp.Models.Purchasing.MasterData.Generated;
using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;




//using DisbursementAccount.MvcApp.Models.DASInquiries.Inquiry;
//using DisbursementAccount.MvcApp.Models.MasterData.Partners.Generated;
//using DisbursementAccount.MvcApp.Models.MasterData.Others.Generated;
using System.Data;
//using DisbursementAccount.MvcApp.Controllers.DASInquiries;
//using DisbursementAccount.MvcApp.Models.DASJobs.Jobs;
using System.Web;
using System.IO;
using System.Collections;
using Forwarding.MvcApp.Models.MasterData.Invoicing.Generated;

namespace Forwarding.MvcApp.Controllers.ReceiptsAndPayments.API_Transactions
{
    public class DAS_DisbursementJobsController : ApiController
    {
        #region G L O B A L   V A R I A B L E S

        //  DASJobsController DASJobsController = new DASJobsController();
        public DataTable bsEstimation
        {
            get { return System.Web.HttpContext.Current.Session["bsEstimation"] == null ? null : (DataTable)System.Web.HttpContext.Current.Session["bsEstimation"]; }
            set { System.Web.HttpContext.Current.Session["bsEstimation"] = value; }

        }
        public Int64 NewEstimationID
        {
            get { return System.Web.HttpContext.Current.Session["NewEstimationID"] == null ? 0 : (Int64)System.Web.HttpContext.Current.Session["NewEstimationID"]; }
            set { System.Web.HttpContext.Current.Session["NewEstimationID"] = value; }

        }
        public CDAS_Estimation_Details ObjDasEstDetails
        {
            get { return System.Web.HttpContext.Current.Session["ObjDasEstDetails"] == null ? null : (CDAS_Estimation_Details)System.Web.HttpContext.Current.Session["ObjDasEstDetails"]; }
            set { System.Web.HttpContext.Current.Session["ObjDasEstDetails"] = value; }

        }

        public String InitTable(DataTable dt, String FunctionName)
        {
            String TableInit = "";
            String TblHeader = "";
            String TblRows = "";
            Decimal ColSum = 0;
            string tblfooter = "";

            switch (FunctionName)
            {
                #region Calculate
                case "Calc":
                    //TblHeader += "<thead> <tr style='border: solid #c8c8c8 !Important;'>";

                    TblHeader += "<thead> ";

                    TblHeader += "<tr>";
                    TblHeader += "<th id='total' colspan='2' style='border: 1px solid #000; background-color:#fef48d;'>Total :</th>";

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        ColSum = 0;

                        if (dt.Columns[j].ColumnName == "Amount")
                        {

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                ColSum += Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2);

                            }

                            TblHeader += "<td style='background-color:#fef48d; font-weight:bold;border: 1px solid #000;'>" + ColSum + "</td>";
                        }

                    }

                    TblHeader += "</tr>";

                    TblHeader += "<tr style='border: solid #c8c8c8 !Important;'>";


                    dt.Columns["Calculation_Bands_Name"].SetOrdinal(0);
                    dt.Columns["Currency_Code"].SetOrdinal(1);
                    dt.Columns["Amount"].SetOrdinal(2);

                    for (int i = 0; i < dt.Columns.Count; i++)
                    {

                        switch (dt.Columns[i].ColumnName.ToString().Trim())
                        {
                            case "Calculation_Bands_Name":
                                TblHeader += "<th>Expense</th>";
                                break;
                            case "Currency_Code":
                                TblHeader += "<th>Currency</th>";
                                break;
                            case "Amount":
                                TblHeader += "<th>Calculated" + "&nbsp;&nbsp;&nbsp;<input  name = 'chkDltPrnt' spclPrpty = 'AntiRemove' type = 'checkbox' class='ChkDelPda' value='" + dt.Columns[i].ColumnName + "'/></th>";
                                break;
                            default:
                                TblHeader += "<th class='hide'>" + dt.Columns[i].ColumnName + "</th>";
                                break;
                        }



                    }
                    TblHeader += "</tr> </thead>";



                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        TblRows += "<tr>";

                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            if (dt.Columns[j].ColumnName.ToString().Trim() != "Calculation_Bands_Name" && dt.Columns[j].ColumnName.ToString().Trim() != "Currency_Code" && dt.Columns[j].ColumnName.ToString().Trim() != "Amount")
                            {
                                TblRows += "<td class='hide'>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                            }
                            else
                            {
                                if (dt.Columns[j].ColumnName.ToString().Trim() == "Amount")
                                {
                                    TblRows += "<td>" + Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2).ToString() + "</td>";
                                }
                                else
                                {
                                    TblRows += "<td>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                                }

                            }

                        }


                        TblRows += "</tr>";
                    }


                    ////// Sum Columns ///////////////////////////////////

                    ColSum = 0;
                    tblfooter = "";
                    tblfooter += "<tfoot>";
                    tblfooter += "<tr>";
                    tblfooter += "<th id='total' colspan='2' style='border: 1px solid #000;background-color:#fef48d;'>Total :</th>";

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        ColSum = 0;

                        if (dt.Columns[j].ColumnName == "Amount")
                        {

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                ColSum += Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2);

                            }

                            tblfooter += "<td style='background-color:#fef48d; font-weight:bold;border: 1px solid #000;'>" + ColSum + "</td>";
                        }

                    }

                    tblfooter += "</tr>";
                    tblfooter += "</tfoot>";

                    /////////////////////////////////////////////////////


                    TableInit = TblHeader + TblRows + tblfooter;

                    break;

                #endregion

                #region Save Inquiry
                case "SaveInq":

                    TblHeader += "<thead> ";

                    TblHeader += "<tr>";
                    TblHeader += "<th id='total' colspan='2' style='border: 1px solid #000; background-color:#fef48d;'>Total :</th>";

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        ColSum = 0;

                        if (dt.Columns[j].ColumnName == "Amount")
                        {

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                ColSum += Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2);

                            }

                            TblHeader += "<td style='background-color:#fef48d; font-weight:bold;border: 1px solid #000;'>" + ColSum + "</td>";
                        }

                    }

                    TblHeader += "</tr>";

                    TblHeader += "<tr style='border: solid #c8c8c8 !Important;'>";

                    dt.Columns["Calculation_Bands_Name"].SetOrdinal(0);
                    dt.Columns["Currency_Code"].SetOrdinal(1);
                    ////dtemp.Columns["Amount"].SetOrdinal(2);

                    for (int i = 0; i < dt.Columns.Count; i++)
                    {

                        switch (dt.Columns[i].ColumnName.ToString().Trim())
                        {
                            case "Calculation_Bands_Name":
                                TblHeader += "<th>Expense</th>";
                                break;
                            case "Currency_Code":
                                TblHeader += "<th>Currency</th>";
                                break;

                            default:

                                if (i >= 6)
                                {
                                    if (i == 6)
                                    {
                                        TblHeader += "<th>Calculated" + "&nbsp;&nbsp;&nbsp;<input  name = 'chkDltPrnt' spclPrpty = 'AntiRemove' type = 'checkbox' class='ChkDelPda' value='" + dt.Columns[i].ColumnName + "'/></th>";
                                    }
                                    else
                                    {
                                        TblHeader += "<th>PDA" + (i - 5) + "&nbsp;&nbsp;&nbsp;<input  name='chkDltPrnt' spclPrpty = 'AllowRemove' type='checkbox' class='ChkDelPda' value='" + dt.Columns[i].ColumnName + "'/></th>";
                                    }

                                }
                                else
                                {
                                    TblHeader += "<th class='hide'>" + dt.Columns[i].ColumnName + "</th>";
                                }

                                break;
                        }

                    }

                    TblHeader += "</tr> </thead>";

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        TblRows += "<tr>";

                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            if (dt.Columns[j].ColumnName.ToString().Trim() != "Calculation_Bands_Name" && dt.Columns[j].ColumnName.ToString().Trim() != "Currency_Code" && j < 6)
                            {
                                TblRows += "<td class='hide'>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                            }
                            else
                            {
                                if (j >= 6)
                                {
                                    TblRows += "<td>" + Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2).ToString() + "</td>";
                                }
                                else
                                {
                                    TblRows += "<td>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                                }

                            }

                        }

                        TblRows += "</tr>";
                    }


                    ////// Sum Columns ///////////////////////////////////
                    ColSum = 0;
                    tblfooter = "";
                    tblfooter += "<tfoot>";
                    tblfooter += "<tr>";
                    tblfooter += "<th id='total' colspan='2' style='border: 1px solid #000;background-color:#fef48d;'>Total :</th>";

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        ColSum = 0;

                        if (j >= 6)
                        {

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                ColSum += Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2);

                            }

                            tblfooter += "<td style='background-color:#fef48d; font-weight:bold;border: 1px solid #000;'>" + ColSum + "</td>";
                        }

                    }

                    tblfooter += "</tr>";
                    tblfooter += "</tfoot>";

                    /////////////////////////////////////////////////////

                    TableInit = TblHeader + TblRows + tblfooter;

                    break;

                #endregion

                #region Pivote
                case "Pivot":

                    TblHeader += "<thead> ";

                    TblHeader += "<tr>";
                    TblHeader += "<td id='total' colspan='2' style='border: 1px solid #000;font-weight:bold; background-color:#fef48d;'>Total :</td>";

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        ColSum = 0;

                        if (j >= 6)
                        {

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                ColSum += Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2);

                            }

                            TblHeader += "<td style='background-color:#fef48d; font-weight:bold;border: 1px solid #000;'>" + ColSum + "</td>";
                        }

                    }

                    TblHeader += "</tr>";


                    TblHeader += "<tr style='border: solid #c8c8c8 !Important;'>";

                    dt.Columns["Calculation_Bands_Name"].SetOrdinal(0);
                    dt.Columns["Currency_Code"].SetOrdinal(1);
                    ////dtemp.Columns["Amount"].SetOrdinal(2);

                    for (int i = 0; i < dt.Columns.Count; i++)
                    {

                        switch (dt.Columns[i].ColumnName.ToString().Trim())
                        {
                            case "Calculation_Bands_Name":
                                TblHeader += "<th>Expense</th>";
                                break;
                            case "Currency_Code":
                                TblHeader += "<th>Currency</th>";
                                break;

                            default:

                                if (i >= 6)
                                {
                                    //if (i == 6)
                                    //{
                                    //    TblHeader += "<th>Calculated" + "&nbsp;&nbsp;&nbsp;<input  name = 'chkDltPrnt' spclPrpty = 'AntiRemove' type = 'checkbox' class='ChkDelPda' value='" + dt.Columns[i].ColumnName + "'/></th>";
                                    //}
                                    //else
                                    //{
                                    TblHeader += "<th>PDA" + (i - 5) + "&nbsp;&nbsp;&nbsp;<input  name='chkDltPrnt' spclPrpty = 'AllowRemove' type='checkbox' class='ChkDelPda' value='" + dt.Columns[i].ColumnName + "'/></th>";
                                    //}

                                }
                                else
                                {
                                    TblHeader += "<th class='hide'>" + dt.Columns[i].ColumnName + "</th>";
                                }

                                break;
                        }

                    }

                    TblHeader += "</tr> </thead>";

                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        TblRows += "<tr>";

                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            if (dt.Columns[j].ColumnName.ToString().Trim() != "Calculation_Bands_Name" && dt.Columns[j].ColumnName.ToString().Trim() != "Currency_Code" && j < 6)
                            {
                                TblRows += "<td class='hide'>" + dt.Rows[i][j].ToString() + "</td>";
                            }
                            else
                            {
                                if (j >= 6)
                                {
                                    if (j == dt.Columns.Count - 1 && j != 5)
                                    {
                                        TblRows += "<td><input class='Amount' type='number' id='TextAmount" + dt.Columns[j].ColumnName + "' value='" + Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2).ToString() + "' /></td>";
                                    }
                                    else
                                    {

                                        TblRows += "<td>" + Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2).ToString() + "</td>";

                                    }

                                }
                                else
                                {
                                    TblRows += "<td>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                                }

                            }

                        }

                        TblRows += "</tr>";
                    }

                    ////// Sum Columns ///////////////////////////////////

                    ColSum = 0;
                    tblfooter = "";
                    tblfooter += "<tfoot>";
                    tblfooter += "<tr>";
                    tblfooter += "<th id='total' colspan='2' style='border: 1px solid #000;background-color:#fef48d;'>Total :</th>";

                    for (int j = 0; j < dt.Columns.Count; j++)
                    {
                        ColSum = 0;

                        if (j >= 6)
                        {

                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                ColSum += Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2);

                            }

                            tblfooter += "<td style='background-color:#fef48d; font-weight:bold;border: 1px solid #000;'>" + ColSum + "</td>";
                        }

                    }

                    tblfooter += "</tr>";
                    tblfooter += "</tfoot>";

                    /////////////////////////////////////////////////////

                    TableInit = TblHeader + TblRows + tblfooter;

                    break;

                #endregion

                #region Remarks
                case "Remarks":

                    TblHeader += "<thead> <tr style='border: solid #c8c8c8 !Important;'>";
                    dt.Columns["Calculation_Bands_Name"].SetOrdinal(0);
                    dt.Columns["Currency_Code"].SetOrdinal(1);
                    dt.Columns["Amount"].SetOrdinal(2);
                    dt.Columns["HowToCalc"].SetOrdinal(3);
                    dt.Columns["Remarks"].SetOrdinal(4);
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {

                        switch (dt.Columns[i].ColumnName.ToString().Trim())
                        {
                            case "Calculation_Bands_Name":
                                TblHeader += "<th value='Calculation_Bands_Name'>Expense</th>";
                                break;
                            case "Currency_Code":
                                TblHeader += "<th value='Currency_Code'>Currency</th>";
                                break;
                            case "Amount":
                                TblHeader += "<th value='Amount'>Calculated</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "HowToCalc":
                                TblHeader += "<th value='HowToCalc'>How To Calc</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "Remarks":
                                TblHeader += "<th value='Remarks'>Remarks</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            default:
                                TblHeader += "<th value='" + dt.Columns[i].ColumnName + "' class='hide'>" + dt.Columns[i].ColumnName + "</th>";
                                break;
                        }



                    }
                    TblHeader += "</tr> </thead>";



                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        TblRows += "<tr>";

                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            if (dt.Columns[j].ColumnName.ToString().Trim() != "Calculation_Bands_Name" && dt.Columns[j].ColumnName.ToString().Trim() != "Currency_Code" && dt.Columns[j].ColumnName.ToString().Trim() != "Amount" && dt.Columns[j].ColumnName.ToString().Trim() != "HowToCalc" && dt.Columns[j].ColumnName.ToString().Trim() != "Remarks")
                            {
                                TblRows += "<td class='hide'>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                            }
                            else
                            {
                                if (dt.Columns[j].ColumnName.ToString().Trim() == "Amount")
                                {
                                    TblRows += "<td>" + Math.Round(Convert.ToDecimal((dt.Rows[i][j].ToString().Trim() == "" ? 0 : dt.Rows[i][j])), 2).ToString() + "</td>";
                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "Remarks")
                                {

                                    TblRows += "<td><input class='Remarks' type='text' style='width:350px;' id='TextRemarks" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";
                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "HowToCalc")
                                {
                                    ////TblRows += "<td>" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j].ToString()) + "</td>";
                                    TblRows += "<td><input class='HowToCalc' type='text' style='width:250px;' id='TextHowToCalc" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";
                                }
                                else
                                {
                                    TblRows += "<td>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                                }

                            }

                        }


                        TblRows += "</tr>";
                    }
                    TableInit = TblHeader + TblRows;
                    break;
                #endregion

                #region Attachments
                case "Attachments":

                    TblHeader += "<thead> <tr style='border: solid #c8c8c8 !Important;'>";
                    dt.Columns["FileName"].SetOrdinal(0);
                    dt.Columns["Notes"].SetOrdinal(1);
                    dt.Columns["FilePath"].SetOrdinal(2);
                    dt.Columns["TableName"].SetOrdinal(3);
                    dt.Columns["RowID"].SetOrdinal(4);
                    dt.Columns["Trans_Date"].SetOrdinal(5);
                    dt.Columns["UserID"].SetOrdinal(6);
                    dt.Columns["AttachmentID"].SetOrdinal(7);
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {

                        switch (dt.Columns[i].ColumnName.ToString().Trim())
                        {
                            case "FileName":
                                TblHeader += "<th value='FileName'>File Name</th>";
                                break;
                            case "Notes":
                                TblHeader += "<th value='Notes'>Notes</th>";
                                break;
                            case "FilePath":
                                TblHeader += "<th value='FilePath'>File Path</th>"; //<input id='' type='checkbox'/></th>";
                                //TblHeader += "<th hidden value='TableName'>TableName</th>"; //<input id='' type='checkbox'/></th>";
                                //TblHeader += "<th hidden value='RowID'>RowID</th>"; //<input id='' type='checkbox'/></th>";
                                //TblHeader += "<th hidden value='Trans_Date'>Trans_Date</th>"; //<input id='' type='checkbox'/></th>";
                                //TblHeader += "<th hidden value='UserID'>UserID</th>"; //<input id='' type='checkbox'/></th>";
                                //TblHeader += "<th hidden value='AttachmentID'>AttachmentID</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "TableName":
                                TblHeader += "<th value='TableName' class='Active hide'>" + dt.Columns[i].ColumnName + "</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "RowID":
                                TblHeader += "<th value='RowID' class='Active hide'>" + dt.Columns[i].ColumnName + "</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "Trans_Date":
                                TblHeader += "<th value='Trans_Date' class='Active hide'>" + dt.Columns[i].ColumnName.ToString() + "</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "UserID":
                                TblHeader += "<th value='UserID' class='Active hide'>" + dt.Columns[i].ColumnName + "</th>"; //<input id='' type='checkbox'/></th>";
                                break;
                            case "AttachmentID":
                                TblHeader += "<th value='AttachmentID' class='Active hide'>" + dt.Columns[i].ColumnName + "</th>"; //<input id='' type='checkbox'/></th>";
                                TblHeader += "<th>&nbsp;</th>"; //<input id='' type='checkbox'/></th>";
                                TblHeader += "<th>&nbsp;</th>"; //<input id='' type='checkbox'/></th>";
                                TblHeader += "<th>&nbsp;</th>"; //<input id='' type='checkbox'/></th>";
                                break;



                            default:
                                TblHeader += "<th value='" + dt.Columns[i].ColumnName + "' class='hide'>" + dt.Columns[i].ColumnName + "</th>";
                                break;
                        }



                    }
                    TblHeader += "</tr> </thead>";
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        //TblRows += "<tr>";
                        TblRows += "<tr ID='" + dt.Rows[i]["AttachmentID"].ToString() + "' > ";
                        for (int j = 0; j < dt.Columns.Count; j++)
                        {
                            if (dt.Columns[j].ColumnName.ToString().Trim() != "FileName" && dt.Columns[j].ColumnName.ToString().Trim() != "Notes" && dt.Columns[j].ColumnName.ToString().Trim() != "FilePath" && dt.Columns[j].ColumnName.ToString().Trim() != "AttachmentID" && dt.Columns[j].ColumnName.ToString().Trim() != "UserID" && dt.Columns[j].ColumnName.ToString().Trim() != "Trans_Date")
                            {
                                //TblRows += "<td class='hide'>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                                TblRows += "<td hidden><input class='" + dt.Columns[j].ColumnName.ToString().Trim() + "' type='text' disabled='disabled' style='width:250px;' id='Text" + dt.Columns[j].ColumnName.ToString().Trim() + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";
                            }
                            else
                            {
                                if (dt.Columns[j].ColumnName.ToString().Trim() == "FileName")
                                {
                                    TblRows += "<td style='width:20%'><input class='FileName' type='text' disabled='disabled' style='width:100%;' id='TextFileName" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";

                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "Notes")
                                {

                                    TblRows += "<td style='width:30%;'><input class='Notes' type='text' style='width:100%;' id='TextNotes" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";
                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "FilePath")
                                {

                                    TblRows += "<td style='width:40%'><input class='FilePath' type='text' disabled='disabled' style='width:100%;' id='TextFilePath" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";
                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "UserID")
                                {

                                    TblRows += "<td hidden><input class='UserID' type='text' disabled='disabled' style='width:300px;' id='TextUserID" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";
                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "Trans_Date")
                                {

                                    TblRows += "<td hidden><input class='Trans_Date' type='text' disabled='disabled' style='width:300px;' id='TextTrans_Date" + dt.Columns[j].ColumnName + "' value='01/01/1900' /></td>";
                                }
                                else if (dt.Columns[j].ColumnName.ToString().Trim() == "AttachmentID")
                                {
                                    TblRows += "<td hidden><input class='AttachmentID' type='text' disabled='disabled' style='width:300px;' id='TextAttachmentID" + dt.Columns[j].ColumnName + "' value='" + (dt.Rows[i][j].ToString().Trim() == "" ? "" : dt.Rows[i][j]).ToString() + "' /></td>";

                                    TblRows += "<td><input type='button' id='btnShowAttachmentsSave" + dt.Rows[i][j].ToString() + "' onclick='ShowAttachmentFile(\"" + dt.Rows[i]["FilePath"].ToString().Replace("\\", "\\\\") + "\", \"0\",\"" + dt.Rows[i]["FileName"].ToString() + "\" ); ' class='btn btn-primary btn-sm' value='Get File'></td>";
                                    //TblRows += "<td><input type='button' id='btnShowAttachmentsDlt" + dt.Rows[i][j].ToString() + "' onclick='DltAttachmentFile("+ dt.Rows[i][j].ToString() + "); ' class='btn btn-primary btn-sm' value='Delete'></td>";
                                    TblRows += "<td><input type='button' id='btnShowAttachmentsDlt" + dt.Rows[i][j].ToString() + "' onclick='DltAttachmentFile(" + dt.Rows[i][j].ToString() + "); ' class='btn btn-sm btn-danger  btn-Options' value='Delete'></td>";
                                }
                                else
                                {
                                    TblRows += "<td>" + (dt.Rows[i][j].ToString().Trim() == "" ? "0" : dt.Rows[i][j].ToString()) + "</td>";
                                }

                            }

                        }

                        TblRows += "</tr>";
                    }
                    TableInit = TblHeader + TblRows;
                    break;
                #endregion

                default:

                    break;
            }

            return TableInit;
        }

        #endregion
        [System.Web.Http.HttpGet, HttpPost]
        // agnet isline=1 or Disbursement IsLine=0
        public Object[] Job_LoadAll(string pOrderBy)
        {
            CDAS_vwDisbursementJobs objCJobs = new CDAS_vwDisbursementJobs();
            objCJobs.GetList(" order by " + pOrderBy);
            return new Object[] { new JavaScriptSerializer().Serialize(objCJobs.lstCVarDAS_vwDisbursementJobs) };
        }

        //[HttpGet, HttpPost]
        //public Object[] Inquiry_LoadItem(Int64 pInquiryIDForModal, Int32 pJobIDForModal)
        //{
        //    String TableInit = "";

        //    CDAS_vwInquiryStatusDetails objCInquiries = new CDAS_vwInquiryStatusDetails();
        //    objCInquiries.GetList("where Estimation_ID=" + pInquiryIDForModal.ToString() + "");




        //    if (objCInquiries.lstCVarDAS_vwInquiryStatusDetails.Count > 0)
        //    {
        //        NewEstimationID = objCInquiries.lstCVarDAS_vwInquiryStatusDetails[0].Estimation_ID;


        //        if (objCInquiries.lstCVarDAS_vwInquiryStatusDetails[0].InquiryNumber.Trim().Length > 0)
        //        {
        //            DataTable dtemp = new DataTable();
        //            //dtemp = new CDAS_Estimation_Details().GetListForJobPivot(Int32.Parse(NewEstimationID.ToString()));
        //            dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pJobIDForModal);
        //            bsEstimation = new DataTable();
        //            bsEstimation = dtemp;
        //            TableInit = InitTable(dtemp, "Pivot");

        //        }

        //        else

        //        {

        //            ObjDasEstDetails = new CDAS_Estimation_Details();
        //            ObjDasEstDetails.GetList(" Where Estimation_ID = " + NewEstimationID.ToString().Trim(), -1);
        //            DataTable dt = new DataTable();
        //            dt = DASJobsController.ToDataTable(ObjDasEstDetails.lstCVarDAS_Estimation_Details);
        //            TableInit = InitTable(dt, "Calc");

        //        }

        //    }

        //    return new Object[]
        //    {
        //        new JavaScriptSerializer().Serialize(objCInquiries.lstCVarDAS_vwInquiryStatusDetails[0])//0
        //        ,new JavaScriptSerializer().Serialize(TableInit)//1

        //    };
        //}

        [HttpGet, HttpPost]
        public Object[] Job_LoadItem(Int64 pJobIDForModal)
        {
            Int32 _RowCount = 0;
            CDAS_vwDisbursementJobs objCJobs = new CDAS_vwDisbursementJobs();
            objCJobs.GetListPaging(10000, 1, "WHERE DisbursementJob_ID = " + pJobIDForModal.ToString(), "Estimation_ID", out _RowCount);
            //CvwShippingOrderPortDate objCvwShippingOrderPortDate = new CvwShippingOrderPortDate();
            //objCvwShippingOrderPortDate.GetListPaging(100, 1, "WHERE ShippingOrderID = " + pShippingOrderIDForModal.ToString(), "ID", out _RowCount);

            return new Object[] {
                new JavaScriptSerializer().Serialize(objCJobs.lstCVarDAS_vwDisbursementJobs[0]) //var pShippingOrderHeader = pData[0];
                //, new JavaScriptSerializer().Serialize(objCvwShippingOrderPortDate.lstCVarvwShippingOrderPortDate) //var pShippingOrderPort = pData[1];
            };
        }

        [HttpGet, HttpPost]
        // public Object[] Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy, string pJobType)
        public Object[] Jobs_LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(Int32 pPageNumber, Int32 pPageSize, string pWhereClause)

        {
            CDAS_vwDisbursementJobs objCVw_Jobs = new CDAS_vwDisbursementJobs();

            pWhereClause = (pWhereClause == null ? "" : pWhereClause.Trim().ToUpper());
            Int32 _RowCount = 0;
            objCVw_Jobs.GetListPaging(pPageSize, pPageNumber, pWhereClause, "JobNumber", out _RowCount);

            CCustomers objCSL_Clients = new CCustomers();
            objCSL_Clients.GetList("where 1=1");
            //    objCSL_Clients.GetListPagingCbo(10000, pPageNumber, " where 1=1 ", " ID ");


            //CDAS_VesselTypes objCVesselTypes = new CDAS_VesselTypes();
            //objCVesselTypes.GetListPagingCbo(10000, pPageNumber, " Where 1 = 1", "  VesselType_Name");

            CDAS_Vessels objDAS_Vessels = new CDAS_Vessels();
            objDAS_Vessels.GetListPagingCbo(10000, pPageNumber, " where 1=1 ", " Vessel_Name ");

            CPorts objCPorts = new CPorts();
            objCPorts.GetListPagingCbo(10000, pPageNumber, " where 1=1 ", " ETA_Port_Name ");

            CSuppliers objCSuppliers = new CSuppliers();
            objCSuppliers.GetList("where 1=1");
            //objCSuppliers.GetListPagingCbo(10000, pPageNumber, " where 1=1 ", " Name ");


            CDAS_VesselTypes objCVesselTypes = new CDAS_VesselTypes();
            objCVesselTypes.GetListPagingCbo(10000, pPageNumber, " Where 1 = 1", "  VesselType_Name");

            // CCurrency objCurrency = new CCurrency();
            CvwCurrencies objCurrency = new CvwCurrencies();

            objCurrency.GetList("where 1=1 order by Code");

            CDAS_Disbursements objCDisburs = new CDAS_Disbursements();
            objCDisburs.GetListPagingCbo(10000, pPageNumber, " where 1=1 ", "Disbursement_Name");
            //switch (pJobType)
            //{
            //    case "P":
            //        objCDisburs.GetListPagingCbo(10000, pPageNumber, " where IsPort=1 ", "Disbursement_Name");
            //        break;
            //    case "T":
            //        objCDisburs.GetListPagingCbo(10000, pPageNumber, " where IsTransit=1 ", "Disbursement_Name");
            //        break;
            //    case "H":
            //        objCDisburs.GetListPagingCbo(10000, pPageNumber, " where IsHusbandry=1 ", "Disbursement_Name");
            //        break;
            //    default:
            //        objCDisburs.GetListPagingCbo(10000, pPageNumber, " where IsProtecting=1 ", "Disbursement_Name");
            //        break;
            //}




            JavaScriptSerializer serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };


            return new Object[] {serializer.Serialize(objCVw_Jobs.lstCVarDAS_vwDisbursementJobs),//0
                                    
                _RowCount, //1
                serializer.Serialize(objCSL_Clients.lstCVarCustomers), // 2
                serializer.Serialize(objDAS_Vessels.lstCVarDAS_Vessels),//3
                serializer.Serialize(objCPorts.lstCVarPorts), //4
                serializer.Serialize(objCSuppliers.lstCVarSuppliers), //5
                serializer.Serialize(objCVesselTypes.lstCVarDAS_VesselTypes),//6
                serializer.Serialize(objCurrency.lstCVarvwCurrencies),//7
                serializer.Serialize(objCDisburs.lstCVarDAS_Disbursements)//8

            };
        }




        [HttpGet, HttpPost]
        public object[] FillJobList(Int32 pVesselID, Char pJobType, String pVoyageNumber)
        {
            Int32 _Count = 0;
            CDAS_vwDisbursementJobs ObjVsls = new CDAS_vwDisbursementJobs();
            ObjVsls.GetListPagingJobsCbo(10000, 1, string.Format(" where IsClosed=0  and Vessel_ID={0} and VoyageNumber like '%{1}%' and JobType='{2}'", pVesselID, pVoyageNumber, pJobType), " JobNumber ");
            _Count = ObjVsls.lstCVarDAS_vwDisbursementJobs.Count;
            return new object[]
            {
                _Count
               ,new JavaScriptSerializer().Serialize(ObjVsls.lstCVarDAS_vwDisbursementJobs.Count>0? ObjVsls.lstCVarDAS_vwDisbursementJobs:null)// 1
               ,new JavaScriptSerializer().Serialize((ObjVsls.lstCVarDAS_vwDisbursementJobs.Count == 1?ObjVsls.lstCVarDAS_vwDisbursementJobs[0].DisbursementJob_ID:0)) // 2
            };
        }

        #region N E W   P D A

        //[HttpGet, HttpPost]
        //public object[] Job_NewPDA(int pJobID_ForModal)
        //{
        //    String TableInit = "";
        //    String TblHeader = "";
        //    String TblRows = "";
        //    DataTable dtemp = new DataTable();
        //    try
        //    {
        //        DataTable dt = new DataTable();
        //        dt = bsEstimation;
        //        if (dt.Columns.Count > 4)
        //        {
        //            string PDAID;
        //            int _lastIndex = (dt.Columns.Count - 1);
        //            PDAID = dt.Columns[_lastIndex].ColumnName.ToString();
        //            new CDAS_Estimation_Details().AddNewPDA(PDAID, NewEstimationID.ToString());
        //            //Now Filling the Grid with the estimated Values
        //            dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pJobID_ForModal);
        //            bsEstimation = new DataTable();
        //            bsEstimation = dtemp;
        //            TableInit = InitTable(dtemp, "Pivot");

        //        }
        //        else
        //        {

        //            dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pJobID_ForModal);
        //            bsEstimation = new DataTable();
        //            bsEstimation = dtemp;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }

        //    return new object[]
        //    {
        //        new JavaScriptSerializer().Serialize(TableInit)
        //    };
        //}
        #endregion

        #region S A V E   P D A
        //[HttpGet, HttpPost]
        //public object[] Job_SavePDA([FromBody] PdaDetails PdaDetails)
        //{
        //    String Message = "";
        //    String TableInit = "";
        //    String TblHeader = "";
        //    String TblRows = "";
        //    Boolean _Result = false;
        //    Exception Exp = null;
        //    try

        //    {

        //        ///DataTable tester = 
        //        //JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
        //        //List<Object> listofCVarDasEstDetails = jsonSerialiser.Deserialize<List<Object>>(PdaDetails.pPdaDetails);
        //        bsEstimation = new DataTable();
        //        bsEstimation = (DataTable)Newtonsoft.Json.JsonConvert.DeserializeObject(PdaDetails.pPdaDetails, (typeof(DataTable))); ///DASInquiriesController.ToDataTable(listofCVarDasEstDetails);

        //        DataTable dt = new DataTable();
        //        dt = bsEstimation;
        //        dt.Columns["Expense"].SetOrdinal(0);
        //        dt.Columns["Currency"].SetOrdinal(1);
        //        dt.Columns["Estimation_Details_ID"].SetOrdinal(2);
        //        dt.Columns["Estimation_ID"].SetOrdinal(3);
        //        dt.Columns["Calculation_Bands_ID"].SetOrdinal(4);
        //        dt.Columns["Currency_ID"].SetOrdinal(5);
        //        ///dt.Columns["Calculated"].SetOrdinal(6);
        //        if (dt.Columns.Count > 7)
        //        {
        //            string PDAID;
        //            int _lastIndex = (dt.Columns.Count - 1);
        //            PDAID = dt.Columns[_lastIndex].ColumnName.ToString();
        //            // getting current data for PDA remarks
        //            CDAS_Estimation_Details ObjEstDetails = new CDAS_Estimation_Details();
        //            ObjEstDetails.GetList(String.Format(" where Estimation_ID = {0} And PDA_ID = {1} ", NewEstimationID, PDAID), -1);
        //            List<CVarDAS_Estimation_Details> lstOldPDAEstimationData = new List<CVarDAS_Estimation_Details>();
        //            lstOldPDAEstimationData = ObjEstDetails.lstCVarDAS_Estimation_Details;

        //            new CDAS_Estimation_Details().DeleteList(String.Format(" where Estimation_ID = {0} And PDA_ID = {1} ", NewEstimationID, PDAID));

        //            List<CVarDAS_Estimation_Details> ED_List = new List<CVarDAS_Estimation_Details>();
        //            Int32 i = 1;
        //            foreach (DataRow dr in dt.Rows)
        //            {
        //                if (dr[4].ToString() != "Calculation_Bands_ID")
        //                {
        //                    i++;
        //                    if (i < dt.Rows.Count)
        //                    {
        //                        CVarDAS_Estimation_Details ED = new CVarDAS_Estimation_Details();

        //                        ED.Estimation_Details_ID = 0;
        //                        ED.Estimation_ID = Int64.Parse(NewEstimationID.ToString());
        //                        ED.Calculation_Bands_ID = Int32.Parse(dr[4].ToString());
        //                        ED.Currency_ID = byte.Parse(dr[5].ToString());
        //                        if (dr[_lastIndex] != DBNull.Value)
        //                        {
        //                            ED.Amount = Decimal.Parse(dr[_lastIndex].ToString());
        //                        }
        //                        else
        //                        {
        //                            ED.Amount = 0;
        //                        }
        //                        ED.PDA_ID = Int64.Parse(PDAID);
        //                        ED.mIsChanges = true;
        //                        ED.HowToCalc = "";
        //                        ED.Remarks = "";
        //                        ED.DisbursementJob_ID = PdaDetails.pJobIDForModal;

        //                        if (lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID) != null)
        //                        {
        //                            ED.HowToCalc = lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID).HowToCalc.ToString();
        //                        }
        //                        if ((lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID)) != null)
        //                        {
        //                            ED.Remarks = lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID).Remarks.ToString();
        //                        }
        //                        ED_List.Add(ED);

        //                    }
        //                }
        //            }

        //            Exp = new CDAS_Estimation_Details().SaveMethodFromJob(ED_List);


        //            //Now Filling the Grid with the estimated Values

        //            if (Exp == null)
        //            {
        //                _Result = true;
        //                bsEstimation.Clear();

        //                DataTable dtemp = new DataTable();
        //                dtemp = new CDAS_Estimation_Details().GetListForJobPivot(Int32.Parse(PdaDetails.pJobIDForModal.ToString()));
        //                bsEstimation = dtemp;
        //                TableInit = InitTable(dtemp, "Pivot");
        //            }
        //            Message = "PDA Was Saved Successfully";
        //            //btnSave_PDA.Enabled = false;
        //        }
        //        else
        //        {
        //            bsEstimation.Clear();
        //            if (Exp == null)
        //            {
        //                _Result = true;
        //                Message = "There is no PDA to save";
        //            }
        //            else
        //            {
        //                _Result = false;
        //                Message = "Failed to save PDA";
        //            }

        //            DataTable dtemp = new DataTable();
        //            dtemp = new CDAS_Estimation_Details().GetListForJobPivot(Int32.Parse(PdaDetails.pJobIDForModal.ToString()));
        //            bsEstimation = dtemp;
        //            TableInit = InitTable(dtemp, "Pivot");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    return new object[]
        //    {
        //        _Result
        //       , new JavaScriptSerializer().Serialize(Message)
        //       , new JavaScriptSerializer().Serialize(TableInit)
        //    };
        //}
        #endregion

        #region D E L E T E   P D A
        //[HttpGet, HttpPost]
        //public object[] Job_DeletePDA(int pPdaID, int pJobIDForModal)
        //{
        //    String Message = "";
        //    String TableInit = "";
        //    String TblHeader = "";
        //    String TblRows = "";
        //    int SelectedPDAID = 0;


        //    SelectedPDAID = pPdaID;

        //    Exception checkException = new CDAS_Estimation_Details().DeleteList(String.Format(" where Estimation_ID = {0} And PDA_ID = {1} ", NewEstimationID.ToString(), SelectedPDAID));
        //    Exception checkException2 = new CDAS_EstimationPDAs().DeleteList(String.Format(" where Estimation_ID = {0} And PDA_ID = {1} ", NewEstimationID.ToString(), SelectedPDAID));

        //    if (checkException == null && checkException2 == null)
        //    {
        //        Message = "PDA Was Deleted Successfully";
        //    }
        //    else
        //    {
        //        Message = "PDA Delete Failed";

        //    }
        //    //Now Filling the Grid with the estimated Values
        //    DataTable dtemp = new DataTable();
        //    dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pJobIDForModal);
        //    bsEstimation = new DataTable();
        //    bsEstimation = dtemp;
        //    TableInit = InitTable(dtemp, "Pivot");

        //    return new object[]
        //    {
        //       new JavaScriptSerializer().Serialize(Message)
        //       ,new JavaScriptSerializer().Serialize(TableInit)
        //    };

        //}
        #endregion

        #region U P D A T E   R E M A R K S

        //[HttpGet, HttpPost]
        //public object[] Job_GetRemarks()
        //{
        //    String Message = "";
        //    String TableInit = "";
        //    if (NewEstimationID > 0)
        //    {

        //        DataTable dt = new DataTable();
        //        List<CVarDAS_Estimation_Details> estlst;
        //        CDAS_Estimation_Details ObjEstDetails = new CDAS_Estimation_Details();
        //        ObjEstDetails.GetList(" where Estimation_ID=" + NewEstimationID.ToString() + " and PDA_ID = (select max(PDA_ID) from DAS_EstimationPDAs where Estimation_ID = " + NewEstimationID.ToString() + ")", -1);
        //        estlst = ObjEstDetails.lstCVarDAS_Estimation_Details;
        //        dt = DASJobsController.ToDataTable(estlst);

        //        TableInit = InitTable(dt, "Remarks");
        //    }
        //    else
        //    {
        //        Message = "Please Save Inquiry First";
        //    }

        //    return new object[]
        //    {
        //            new JavaScriptSerializer().Serialize(Message)
        //            ,new JavaScriptSerializer().Serialize(TableInit)
        //    };

        //}


        //[HttpGet, HttpPost]
        //public object[] Job_UpdateRemarks([FromBody] PdaDetailsRemarks PdaDetailsRemarks)
        //{
        //    bool _Result = false;
        //    JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
        //    List<CVarDAS_Estimation_Details> listofCVarDasEstDetails = jsonSerialiser.Deserialize<List<CVarDAS_Estimation_Details>>(PdaDetailsRemarks.pPdaDetails);
        //    CDAS_Estimation_Details ObjEstDetails = new CDAS_Estimation_Details();
        //    Exception Exp = ObjEstDetails.SaveMethod(listofCVarDasEstDetails);

        //    if (Exp == null)
        //    {
        //        _Result = true;
        //    }
        //    else
        //    {
        //        _Result = false;
        //    }


        //    return new object[]
        //    {
        //          _Result
        //    };

        //}
        #endregion

        #region Get&Save   Attachments

        //[HttpGet, HttpPost]
        //public object[] Job_GetAttachments(String pcurTableName, int pcurRowID)
        //{
        //    String Message = "";
        //    String TableInit = "";


        //    DataTable dt = new DataTable();
        //    List<CVarDAS_Attachments> estlst;
        //    CDAS_Attachments ObjAttachments = new CDAS_Attachments();
        //    ObjAttachments.GetList(" where TableName='" + pcurTableName.Trim() + "'  and RowID=" + pcurRowID);
        //    estlst = ObjAttachments.lstCVarDAS_Attachments;
        //    dt = DASJobsController.ToDataTable(estlst);

        //    TableInit = InitTable(dt, "Attachments");


        //    return new object[]
        //    {
        //            new JavaScriptSerializer().Serialize(Message)
        //            ,new JavaScriptSerializer().Serialize(TableInit)
        //    };

        //}

        //[HttpGet, HttpPost]
        //public object[] Job_InsertAttachments([FromBody] InsertAttachment insertAttachments)
        ////public bool Insert(String pCode, String pName)
        //{
        //    bool _result = false;
        //    int _RowCount = 0;
        //    CVarDAS_Attachments objCVarCAttachment = new CVarDAS_Attachments();

        //    objCVarCAttachment.TableName = (insertAttachments.pTableName == null ? "" : insertAttachments.pTableName.Trim().ToUpper());
        //    objCVarCAttachment.RowID = insertAttachments.pRowID == null ? 0 : insertAttachments.pRowID;
        //    objCVarCAttachment.FileName = insertAttachments.pFileName == "" ? "" : insertAttachments.pFileName.Trim().ToUpper();
        //    objCVarCAttachment.Notes = insertAttachments.pNotes == "" ? "" : insertAttachments.pNotes.Trim().ToUpper();
        //    objCVarCAttachment.Trans_Date = DateTime.Now;
        //    objCVarCAttachment.UserID = insertAttachments.pUserID == null ? WebSecurity.CurrentUserId : WebSecurity.CurrentUserId;
        //    objCVarCAttachment.FilePath = insertAttachments.pFilePath == "" ? "" : insertAttachments.pFilePath.Trim().ToUpper();




        //    CDAS_Attachments objCAttachmentl = new CDAS_Attachments();
        //    objCAttachmentl.lstCVarDAS_Attachments.Add(objCVarCAttachment);
        //    Exception checkException = objCAttachmentl.SaveMethod(objCAttachmentl.lstCVarDAS_Attachments);
        //    _result = true;


        //    var serializer = new JavaScriptSerializer() { MaxJsonLength = Int32.MaxValue };
        //    return new object[] {
        //        _result //pData[0]
        //    };
        //}
        //[HttpGet, HttpPost]
        //public object[] Job_UpdateAttachments([FromBody] JobAttachments PJobAttachments)
        //{
        //    bool _Result = false;
        //    JavaScriptSerializer jsonSerialiser = new JavaScriptSerializer();
        //    List<CVarDAS_Attachments> listofCVarDasAttachments = jsonSerialiser.Deserialize<List<CVarDAS_Attachments>>(PJobAttachments.pJobAttachments);
        //    CDAS_Attachments ObjEstDetails = new CDAS_Attachments();
        //    Exception Exp = ObjEstDetails.SaveMethod(listofCVarDasAttachments);

        //    if (Exp == null)
        //    {
        //        _Result = true;
        //    }
        //    else
        //    {
        //        _Result = false;
        //    }


        //    return new object[]
        //    {
        //          _Result
        //    };

        //}

        //[HttpGet, HttpPost]
        //public object[] FilePath(String pVesselName, String pJobNumber)
        //// public object[] FilePath()
        //{

        //    var fileSavePath = "";
        //    var SelectedFileName = "";
        //    String Msg = "";
        //    Int32 _RowCount = 0;
        //    if (HttpContext.Current.Request.Files.AllKeys.Any())
        //    {
        //        // Get the uploaded image from the Files collection
        //        var httpPostedFile = HttpContext.Current.Request.Files[0];

        //        if (httpPostedFile != null)
        //        {
        //            SelectedFileName = httpPostedFile.FileName;

        //            // Get the complete file path
        //            fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/App_Data/uploads/" + pVesselName + "/" + pJobNumber + "/Job"), httpPostedFile.FileName);
        //            String dirctPath = HttpContext.Current.Server.MapPath("~/App_Data/uploads/" + pVesselName + "/" + pJobNumber + "/Job");
        //            if (!Directory.Exists(dirctPath))
        //            {
        //                Directory.CreateDirectory(dirctPath);
        //            }
        //            // Save the uploaded file to "UploadedFiles" folder
        //            httpPostedFile.SaveAs(fileSavePath);
        //        }

        //        if (httpPostedFile.FileName != "")
        //        {
        //            Msg = DisbursementAccount.MvcApp.App_Resources.App_Resources.DASMsgUpld;
        //        }
        //        else
        //            Msg = DisbursementAccount.MvcApp.App_Resources.App_Resources.TraSelectFile;
        //    }

        //    return new object[]
        //    {
        //    Msg,//0
        //    SelectedFileName,//1
        //    fileSavePath//2
        //    };
        //}

        //[HttpGet, HttpPost]
        //public object[] Attachment_DeleteItem(Int32 pAttachmentID)
        //{
        //    bool _result = false;

        //    CDAS_Attachments objCAttachment = new CDAS_Attachments();

        //    objCAttachment.lstDeletedCPKDAS_Attachments.Add(new CPKDAS_Attachments() { AttachmentID = pAttachmentID });


        //    Exception checkException = objCAttachment.DeleteItem(objCAttachment.lstDeletedCPKDAS_Attachments);
        //    if (checkException == null)
        //        _result = true;

        //    return new object[] {
        //        _result

        //    };
        //}
        #endregion

        #region A D D   P D A   I T E M
        //[HttpGet, HttpPost]
        //public object[] AddPdaItemForJob(Int32 pCalcBandID, Byte pCurrencyID, Decimal pAmount,Int32 pDisbursementJob_ID)
        //{
        //    String Message = "";
        //    String TableInit = "";
        //    bool _duplicateditems = false;

        //    Boolean _Result = false;
        //    try

        //    {

        //        bsEstimation = new DataTable();
        //        bsEstimation = new CDAS_Estimation_Details().GetListForJobPivot(pDisbursementJob_ID);
        //        DataTable dt = new DataTable();
        //        dt = bsEstimation;
        //        dt.Columns["Calculation_Bands_Name"].SetOrdinal(0);
        //        dt.Columns["Currency_Code"].SetOrdinal(1);
        //        if (dt.Columns.Count > 6)
        //        {
        //            string PDAID;
        //            int _lastIndex = (dt.Columns.Count - 1);
        //            PDAID = dt.Columns[_lastIndex].ColumnName.ToString();
        //            // getting current data for PDA remarks
        //            CDAS_Estimation_Details ObjEstDetails = new CDAS_Estimation_Details();
        //            ObjEstDetails.GetList(String.Format(" where Estimation_ID = {0} And PDA_ID = {1} and DisbursementJob_ID={2}", NewEstimationID, PDAID, pDisbursementJob_ID), -1);
        //            List<CVarDAS_Estimation_Details> lstOldPDAEstimationData = new List<CVarDAS_Estimation_Details>();
        //            lstOldPDAEstimationData = ObjEstDetails.lstCVarDAS_Estimation_Details;

        //           // new CDAS_Estimation_Details().DeleteList(String.Format(" where Estimation_ID = {0} And PDA_ID = {1} and Calculation_Bands_ID={2} and DisbursementJob_ID={3}", NewEstimationID, PDAID, pCalcBandID, pDisbursementJob_ID));

        //            List<CVarDAS_Estimation_Details> ED_List = new List<CVarDAS_Estimation_Details>();

        //            CVarDAS_Estimation_Details ED = new CVarDAS_Estimation_Details();

        //            ED.Estimation_Details_ID = 0;
        //            ED.Estimation_ID = Int64.Parse(NewEstimationID.ToString());
        //            ED.Calculation_Bands_ID = pCalcBandID;
        //            ED.Currency_ID = pCurrencyID;
        //            ED.Amount = pAmount;
        //            ED.PDA_ID = Int64.Parse(PDAID);
        //            ED.mIsChanges = true;
        //            ED.HowToCalc = "";
        //            ED.Remarks = "";
        //            ED.DisbursementJob_ID = pDisbursementJob_ID;

        //            if (lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID) != null)
        //            {
        //                ED.HowToCalc = lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID).HowToCalc.ToString();
        //            }
        //            if ((lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID)) != null)
        //            {
        //                ED.Remarks = lstOldPDAEstimationData.Find(p => p.Calculation_Bands_ID == ED.Calculation_Bands_ID).Remarks.ToString();
        //            }
        //            ED_List.Add(ED);

        //            Exception Exp = new CDAS_Estimation_Details().SaveMethodFromJob(ED_List);

        //            //Now Filling the Grid with the estimated Values

        //            if (Exp == null)
        //            {
        //                _Result = true;
        //                bsEstimation.Clear();

        //                DataTable dtemp = new DataTable();
        //                dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pDisbursementJob_ID);
        //                bsEstimation = dtemp;
        //                TableInit = InitTable(dtemp, "Pivot");

        //                Message = "PDA Item Was Saved Successfully";

        //            }
        //            else
        //            {
        //                _Result = false;
        //                if (Exp.Message.Contains("UniqueItem") == true)
        //                {
        //                    _duplicateditems = true;
        //                }

        //                bsEstimation.Clear();
        //                DataTable dtemp = new DataTable();
        //                dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pDisbursementJob_ID);
        //                bsEstimation = dtemp;
        //                TableInit = InitTable(dtemp, "Pivot");
        //            }



        //            //btnSave_PDA.Enabled = false;
        //        }
        //        else
        //        {
        //            bsEstimation.Clear();

        //            DataTable dtemp = new DataTable();
        //            dtemp = new CDAS_Estimation_Details().GetListForJobPivot(pDisbursementJob_ID);
        //            bsEstimation = dtemp;

        //            Message = "Failed to save PDA Item";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    return new object[]
        //    {
        //        _Result //pdata[0]
        //       , new JavaScriptSerializer().Serialize(Message) //pdata[1]
        //       , new JavaScriptSerializer().Serialize(TableInit) //pdata[2]
        //       ,_duplicateditems //pdata[3]
        //    };
        //}
        #endregion


    }
}


public class InsertJob
{
    public String pEstimation_ID { get; set; }
    public string pJobNumber { get; set; }
    public DateTime pIssueDate { get; set; }
    public String pJobType { get; set; }
    public string pOwnerID { get; set; }
    public String pCharterID { get; set; }
    public String pCargoOperatorID { get; set; }
    public string pNominatoreID { get; set; }
    public Boolean pIsClosed { get; set; }
    public string pClosedBy { get; set; }
    public DateTime pClosedAt { get; set; }
    public DateTime pATA { get; set; }
    public DateTime pATD { get; set; }
    public DateTime pTransitDate { get; set; }
    public String pTransitSCAEstimationAmount { get; set; }
    public string pLocalAgentID { get; set; }
    public Boolean pIsRemittanceToLocalAgent { get; set; }
    public String pJobSDRRate { get; set; }
    public String pPrintedClient { get; set; }
    public Boolean pIsFDAsClosed { get; set; }
    public string pFDAsClosedBy { get; set; }
    public DateTime pFDAsClosedAt { get; set; }
    public DateTime pBerthingDate { get; set; }
    public String pRemarks { get; set; }
    public string pCostCenterID { get; set; }
    public String pVoyageNumber { get; set; }
    public String pCo { get; set; }
    public string pAddedby { get; set; }
    public DateTime pAddedAt { get; set; }
    public string pUpdatedBy { get; set; }
    public DateTime pUpdatedAt { get; set; }
    /*****************************/
    public string pWhereClauseJob { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}


public class UpdateJob
{
    public String pDisbursementJob_ID { get; set; }
    public string pJobNumber { get; set; }
    public DateTime pIssueDate { get; set; }
    public String pJobType { get; set; }
    public string pOwnerID { get; set; }
    public String pCharterID { get; set; }
    public String pCargoOperatorID { get; set; }
    public string pNominatoreID { get; set; }
    public Boolean pIsClosed { get; set; }
    public string pClosedBy { get; set; }
    public DateTime pClosedAt { get; set; }
    public DateTime pATA { get; set; }
    public DateTime pATD { get; set; }
    public DateTime pTransitDate { get; set; }
    public String pTransitSCAEstimationAmount { get; set; }
    public string pLocalAgentID { get; set; }
    public Boolean pIsRemittanceToLocalAgent { get; set; }
    public String pJobSDRRate { get; set; }
    public String pPrintedClient { get; set; }
    public Boolean pIsFDAsClosed { get; set; }
    public string pFDAsClosedBy { get; set; }
    public DateTime pFDAsClosedAt { get; set; }
    public DateTime pBerthingDate { get; set; }
    public String pRemarks { get; set; }
    public string pCostCenterID { get; set; }

    public String pVoyageNumber { get; set; }
    public String pCo { get; set; }

    public string pAddedby { get; set; }
    public DateTime pAddedAt { get; set; }
    public string pUpdatedBy { get; set; }
    public DateTime pUpdatedAt { get; set; }
    /*****************************/
    public string pWhereClauseJob { get; set; }
    public Int32 pPageSize { get; set; }
    public Int32 pPageNumber { get; set; }
    public string pOrderBy { get; set; }
}

public class JobAttachments
{
    public String pJobAttachments { get; set; }

}

public class InsertAttachment
{
    public String pTableName { get; set; }
    public decimal pRowID { get; set; }
    public String pFileName { get; set; }
    public String pNotes { get; set; }
    public DateTime pTrans_Date { get; set; }
    public Int32 pUserID { get; set; }
    public String pFilePath { get; set; }
}