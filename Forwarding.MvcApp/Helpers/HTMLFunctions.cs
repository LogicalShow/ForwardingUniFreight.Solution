using Forwarding.MvcApp.Models.CRM.CRM_Reports.Customized;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Forwarding.MvcApp.Helpers
{
    public  class HTMLFunctions
    {

        //********* return string of [html table header , body and total for each column ]
        // ***** return without table tag
        // **** by mostafa hany


        // RowsColumnTitle ex)) CLient\\Location    [\\]for c#  is show as [\]
        public static string GetRows(DataTable datasource , string RowsColumnTitle , string TableTitle)
        {
            var Lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            var tr = "";
            List<DataRow> list = new List<DataRow>();
            //if (datasource.Count > 0)
            //{

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Load Columns Names @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            string[] columnNames = (from dc in datasource.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



            //@@@@@@@@@@@@@@@@@@@@@@@@@ TO Calculate Total For Each Column @@@@@@@@@@@@@@@
            var subTotalArr = new List<decimal>(columnNames.Count());
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



            //@@@@@@@@@@@@@@@@@@@@@@@@@@@ Table Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            tr = tr + " <caption><h3> "+ TableTitle + " </h3> </caption> " + " ";
            tr = tr + "              <thead>" + " ";
            tr = tr + "              <tr>" + " ";

            for (int i = 0; i < columnNames.Length; i++)
            {

                if (i == 0)
                {
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + RowsColumnTitle + "</th>";
                }
                else
                {
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + columnNames[i].ToUpper() + "</th>";

                }
            }

            tr = tr + "</tr>" + " ";
            tr = tr + "</thead>" + " ";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



            //@@@@@@@@@@@@@@@@@ Divide Rows as Lists @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            foreach (DataRow dr in datasource.Rows)
            {
                list.Add(dr);
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Body @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            for (int i = 0; i < list.Count; i++) // ** each rows   // ** ItemArray[j] : row cell with it index
            {



                if (i == 0) // ** first row of data // ** 
                {
                    tr = tr + "              <tbody>" + " ";
                    tr = tr + "              <tr>" + " ";

                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {
                            try
                            {
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                subTotalArr.Add(0);
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                        }
                        tr = tr + " <td style = \"text-align:center;\"> " + list[i].ItemArray[j] + " </ td > "; ;
                    }

                    tr = tr + "</tr>" + " ";
                    //tr = tr + "</thead>" + " ";

                }
                else if ((i + 1) == list.Count) // ** last row of data
                {

                    tr = tr + "              <tr>" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {
                            try
                            {
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                subTotalArr.Add(0);
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                        }
                        tr = tr + " <td> " + list[i].ItemArray[j] + " </ td > ";
                    }

                    tr = tr + "</tr>" + " ";




                }
                else
                {
                    tr = tr + "              <tr>" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {


                        tr = tr + " <td style = \"text-align:center;\"> " + list[i].ItemArray[j] + " </ td > ";
                    }

                    tr = tr + "</tr>" + " ";


                }
                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Fill Total Summary @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                if ((i + 1) == list.Count) // ** if last row >> add total row
                {


                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j == 0)
                        {
                            if (Lang == "en")
                            {
                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>Total</b>" + " </ td > ";
                            }
                            else
                            {
                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>الإجمالي</b>" + " </ td > ";
                            }
                        }
                        else
                        {

                            tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + subTotalArr[j - 1] + "</b></ td > ";

                        }
                    }
                    tr = tr + "</tbody>" + " ";
                }



            }






            // }
            return tr;
        }


        public static string GetRows_Customized_For_SalesMenTargetReport(DataTable datasource, string RowsColumnTitle, string TableTitle, List<CVarvwCRM_SalesMenTargetReport> lstCVarvwCRM_SalesMenTargetReport)
        {
            var Lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            var tr = "";
            List<DataRow> list = new List<DataRow>();
            //if (datasource.Count > 0)
            //{

            var ReportData = lstCVarvwCRM_SalesMenTargetReport;

            string[] columnNames = (from dc in datasource.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();

            var subTotalArr = new List<decimal>(columnNames.Count());

            var RowName = "";
            var TotalTarget = 0;
            var TotalTargetForAllActions = 0;
            decimal TotalActonsForAllActions = 0;
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            tr = tr + " <caption><h3> " + TableTitle + "</h3> </caption> " + " ";
            tr = tr + "              <thead>" + " ";
            tr = tr + "              <tr>" + " ";

            for (int i = 0; i < columnNames.Length; i++)
            {

                if (i == 0)
                {
                    //tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + "ACTION \\ CUSTOMER" + "</th>";
                    tr = tr + "    <th  style= \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + RowsColumnTitle + "</th>";
                }
                else
                {
                    if (Lang == "en")
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + columnNames[i].ToUpper() + "</th>";
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + "# Target" + "</th>";
                        tr = tr + "    <th  style= \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + "# Remain" + "</th>";
                    }
                    else
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + columnNames[i].ToUpper() + "</th>";
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + "# تارجت" + "</th>";
                        tr = tr + "    <th  style= \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + "# الباقي" + "</th>";

                    }
                }
            }
            if (Lang == "en")
            {
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + " Total Actions" + "</th>";
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + " Total Target" + "</th>";

                tr = tr + "    <th  style= \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + " Rate" + "</th>";
            }
            else
            {
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + " إجمالي الإجراءات" + "</th>";
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + " إجمالي التارجت" + "</th>";

                tr = tr + "    <th  style= \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;background-color:Gainsboro!important;text-align:center; border-top-width:3px!important; border-top-color:black!important; line-height:2!important;\">" + " معدل" + "</th>";
            }
            tr = tr + "</tr>" + " ";
            tr = tr + "</thead>" + " ";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@ List Of Rows @@@@@@@@@@@@@@@@@@@@@@
            foreach (DataRow dr in datasource.Rows)
            {
                list.Add(dr);
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@ List Of Rows @@@@@@@@@@@@@@@@@@@@@@@@@@



            for (int i = 0; i < list.Count; i++)
            {
                TotalTargetForAllActions = 0;
                TotalActonsForAllActions = 0;
                // tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + TotalTargetForAllActions + " </ td > ";

                //@@@@@@@@@@@@@ First Data Row


                if (i == 0) //** First data Row
                {
                    tr = tr + "              <tbody>" + " ";
                    tr = tr + "              <tr>" + " ";

                    for (int j = 0; j < list[i].ItemArray.Length; j++)  //** ItemArray cells of Row
                    {

                        if (j > 0)
                        {
                            TotalActonsForAllActions = TotalActonsForAllActions + Convert.ToDecimal(list[i].ItemArray[j]);
                            try
                            {
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                subTotalArr.Add(0);
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            tr = tr + " <td style = \"text-align:center;\"> " + list[i].ItemArray[j] + " </ td > ";

                            RowName = (list[i].ItemArray[0]).ToString();
                            try
                            {
                                TotalTarget = ReportData.FirstOrDefault(x => (x.ActionName.Trim() == columnNames[j].Trim()) && (x.SalesRepName.Trim() == RowName.Trim())).ActualTotalTarget;
                            }
                            catch
                            {
                                TotalTarget = 0;
                            }
                            TotalTargetForAllActions = TotalTargetForAllActions + TotalTarget;
                            tr = tr + " <td style = \"text-align:center;\"> " + TotalTarget + " </ td > ";
                            tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + (int.Parse((list[i].ItemArray[j]).ToString()) - TotalTarget) + " </ td > ";

                        }
                        else // ** first cell of row [title]
                        {
                            tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + list[i].ItemArray[j] + " </ td > ";

                        }


                    }




                    tr = tr + " <td style = \"text-align:center;\"> " + TotalActonsForAllActions + " </ td > ";
                    tr = tr + " <td style = \"text-align:center;\"> " + TotalTargetForAllActions + " </ td > ";
                    tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + ((TotalActonsForAllActions / TotalTargetForAllActions) * 100).ToString("0.##") + " %" + " </ td > ";

                    tr = tr + "</tr>" + " ";

                }
                else if ((i + 1) == list.Count) // ** Last Row (Fill Last Data)
                {

                    tr = tr + "              <tr>" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {
                            TotalActonsForAllActions = TotalActonsForAllActions + Convert.ToDecimal(list[i].ItemArray[j]);
                            try
                            {
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                subTotalArr.Add(0);
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            tr = tr + " <td style = \"text-align:center;\"> " + list[i].ItemArray[j] + " </ td > ";
                            RowName = (list[i].ItemArray[0]).ToString();
                            // var ReportData = lstCVarvwCRM_SalesMenTargetReport;
                            try
                            {
                                TotalTarget = ReportData.FirstOrDefault(x => (x.ActionName.Trim() == columnNames[j].Trim()) && (x.SalesRepName.Trim() == RowName.Trim())).ActualTotalTarget;
                            }
                            catch
                            {
                                TotalTarget = 0;

                            }
                            TotalTargetForAllActions = TotalTargetForAllActions + TotalTarget;
                            tr = tr + " <td style = \"text-align:center;\"> " + TotalTarget + " </ td > ";
                            tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + (int.Parse((list[i].ItemArray[j]).ToString()) - TotalTarget) + " </ td > ";

                        }
                        else
                        {
                            tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + list[i].ItemArray[j] + " </ td > ";

                            //  tr = tr + " <td> " + list[i].ItemArray[j] + " </ td > ";

                        }


                    }



                    tr = tr + " <td style = \"text-align:center;\"> " + TotalActonsForAllActions + " </ td > ";
                    tr = tr + " <td style = \"text-align:center;\"> " + TotalTargetForAllActions + " </ td > ";
                    tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + ((TotalActonsForAllActions / TotalTargetForAllActions) * 100).ToString("0.##") + " %" + " </ td > ";

                    tr = tr + "</tr>" + " ";




                }
                else // others row
                {
                    tr = tr + "              <tr>" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {
                            TotalActonsForAllActions = TotalActonsForAllActions + Convert.ToDecimal(list[i].ItemArray[j]);
                            try
                            {
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                subTotalArr.Add(0);
                                subTotalArr[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            tr = tr + " <td style = \"text-align:center;\"> " + list[i].ItemArray[j] + " </ td > ";
                            RowName = (list[i].ItemArray[0]).ToString();
                            // var ReportData = lstCVarvwCRM_SalesMenTargetReport;
                            try
                            {
                                TotalTarget = ReportData.FirstOrDefault(x => (x.ActionName.Trim() == columnNames[j].Trim()) && (x.SalesRepName.Trim() == RowName.Trim())).ActualTotalTarget;
                            }
                            catch
                            {
                                TotalTarget = 0;

                            }
                            TotalTargetForAllActions = TotalTargetForAllActions + TotalTarget;
                            tr = tr + " <td style = \"text-align:center;\"> " + TotalTarget + " </ td > ";

                            tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + (int.Parse((list[i].ItemArray[j]).ToString()) - TotalTarget) + " </ td > ";

                        }
                        else
                        {
                            tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + list[i].ItemArray[j] + " </ td > ";

                        }


                    }



                    tr = tr + " <td style = \"text-align:center;\"> " + TotalActonsForAllActions + " </ td > ";
                    tr = tr + " <td style = \"text-align:center;\"> " + TotalTargetForAllActions + " </ td > ";
                    tr = tr + " <td style = \"text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + ((TotalActonsForAllActions / TotalTargetForAllActions) * 100).ToString("0.##") + " %" + " </ td > ";

                    tr = tr + "</tr>" + " ";


                }

                if ((i + 1) == list.Count) // last row // add Total Summary
                {


                    //for (int j = 0; j < list[i].ItemArray.Length; j++)
                    //{

                    //    if (j == 0)
                    //    {
                    //        tr = tr + " <td style = \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"><b>" + "Total" + "</b></td> ";
                    //    }
                    //    else
                    //    {

                    //        tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + subTotalArr[j - 1] + "</b></ td > ";
                    //        tr = tr + " <td style = \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;text-align:center;\"> " + "#" + " </ td > ";
                    //        tr = tr + " <td style = \"background-color:Gainsboro!important; border-top-width:3px!important; border-top-color:black!important;text-align:center; line-height:2!important;text-align:center;text-align:center;border-right-width:3px!important; border-right-color:black!important;\"> " + "#" + " </ td > ";

                    //    }
                    //}
                    tr = tr + "</tbody>" + " ";
                }



            }






            // }
            return tr;
        }


        //**** convert [ pivot table (datatable) ] to [ html table ] ****without <table>******
        //datasource : pivot table
        // RowsColumnTitle ex)) CLient\\Location    [\\]for c#  is show as [\]
        // TableTitle : <caption>TableTitle</caption>
        // HasHorizontalTotal : true if you need calculate [ Horizontal Total ]
        // HasVerticalTotal :  true if you need calculate [ Vertical Total ]
        // HasPercantage :  true if you need calculate [Percantage]
        // ************* mostafa hany
        public static string GetHTMLTableContains(DataTable datasource, string RowsColumnTitle, string TableTitle, bool HasHorizontalTotal /*-*/, bool HasVerticalTotal/*|*/, bool HasPercantage)
        {
            var Lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            var tr = "";
            List<DataRow> list = new List<DataRow>();
            //if (datasource.Count > 0)
            //{

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Load Columns Names @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            string[] columnNames = (from dc in datasource.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



            //@@@@@@@@@@@@@@@@@@@@@@@@@ TO Calculate Total For Each Column @@@@@@@@@@@@@@@
            var TotalOfColumns = new List<decimal>(columnNames.Count());       // ^ total
            decimal TotalOfRows = 0.0M;                                            // > total
            decimal TotalAll = 0.0M;
            var rowtitle = "";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #region TableHeader

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@ Table Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            tr = tr + " <caption><h3> " + TableTitle + " </h3> </caption> " + " ";
            tr = tr + "              <thead>" + " ";
            tr = tr + "              <tr>" + " ";

            for (int i = 0; i < columnNames.Length; i++)
            {

                if (i == 0)
                {
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:10px; line-height:2!important;\">" + RowsColumnTitle + "</th>";
                }
                else
                {
                    try
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:9px; line-height:2!important;\">[" + (Convert.ToDateTime(columnNames[i])).Day + "-" + (Convert.ToDateTime(columnNames[i])).Month + "]</th>";
                    }
                    catch
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:10px; line-height:2!important;\">" + columnNames[i] + "</th>";

                    }

                }
            }
            if (HasVerticalTotal)
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; font-size:10px; line-height:2!important;\">" + "TOTAL" + "</th>";

            tr = tr + "</tr>" + " ";
            tr = tr + "</thead>" + " ";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #endregion TableHeader

            //@@@@@@@@@@@@@@@@@ Divide Rows as Lists @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            foreach (DataRow dr in datasource.Rows)
            {
                list.Add(dr);
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Body @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            for (int i = 0; i < list.Count; i++) // ** each rows   // ** ItemArray[j] : row cell with it index
            {



                if (i == 0) // ** first row of data // ** 
                {
                    tr = tr + "              <tbody>" + " ";
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    TotalOfRows = 0;
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {

                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);


                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:10px;\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";

                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            //  }

                        }
                        else
                        {
                            rowtitle = Convert.ToString(list[i].ItemArray[j]);


                            tr = tr + " <td style = \"text-align:center;font-size:10px;\"><b> " + rowtitle + "</b> </td> ";


                        }


                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:10px; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;
                    //tr = tr + "</thead>" + " ";

                }
                else if ((i + 1) == list.Count) // ** last row of data
                {
                    TotalOfRows = 0;
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {
                            //if (rowtitle.Contains("**"))
                            //{
                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:10px;\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";




                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            // }


                        }
                        else
                        {
                            rowtitle = Convert.ToString(list[i].ItemArray[j]);


                            tr = tr + " <td style = \"text-align:center;font-size:10px;\"><b> " + rowtitle + "</b> </td> ";



                        }

                        //  tr = tr + " <td> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:10px; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;




                }
                else
                {
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    TotalOfRows = 0;
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {

                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:10px;\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";




                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));

                        }
                        else
                        {
                            rowtitle = Convert.ToString(list[i].ItemArray[j]);

                            tr = tr + " <td style = \"text-align:center;font-size:10px;\"><b> " + rowtitle + "</b> </td> ";



                        }
                        // tr = tr + " <td style = \"text-align:center;font-size:10px;\"> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:10px; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;


                }
                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Fill Total Summary @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                if ((i + 1) == list.Count) // ** if last row >> add total row
                {
                    //************** Total *********************
                    if (HasHorizontalTotal)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                if (Lang == "en")
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:10px; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>Total</b>" + " </td> ";
                                }
                                else
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:10px; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>الإجمالي</b>" + " </td> ";
                                }
                            }
                            else
                            {

                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:10px; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";

                            }
                        }
                        //  tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px;border-top-width:3px!important; border-top-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + "ALL ROOM" + "%</b></td> ";
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px;border-top-width:3px!important; border-top-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + " " + "</b></td> ";
                        tr = tr + "</tr>";


                    }
                    //****************** % *****************************
                    if (HasPercantage)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                if (Lang == "en")
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px;border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>Month / Total %</b>" + " </td> ";
                                }
                                else
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px;border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>الشهر / الإجمالي %</b>" + " </td> ";
                                }
                            }
                            else
                            {
                                try
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px; border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + (((TotalOfColumns[j - 1] / Convert.ToDecimal(TotalAll)) * 100)).ToString("0.##") + "%</b></td> ";
                                }
                                catch (Exception ex)
                                {
                                    // tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:10px; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "0.0" + "%</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px; border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "0.0" + "%</b></td> ";

                                }

                            }
                        }
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:10px;border-bottom-width:3px!important; border-bottom-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalAll).ToString("0.##") + "</b></td> ";


                        tr = tr + "</tr>";
                    }

                    //***************

                    //--------------------
                    tr = tr + "</tbody>" + " ";
                }



            }






            // }
            return tr;
        }

        // add new feature
        //add font size
        public static string GetHTMLTableContainsWithFontSize(string pLanguage, DataTable datasource, string RowsColumnTitle, string TableTitle, bool HasHorizontalTotal /*-*/, bool HasVerticalTotal /*|*/, bool HasPercantage , string FontSize /*"50px"*/)
        {
            var Lang = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;
            var tr = "";
            List<DataRow> list = new List<DataRow>();
            //if (datasource.Count > 0)
            //{

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Load Columns Names @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            string[] columnNames = (from dc in datasource.Columns.Cast<DataColumn>()
                                    select dc.ColumnName).ToArray();
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



            //@@@@@@@@@@@@@@@@@@@@@@@@@ TO Calculate Total For Each Column @@@@@@@@@@@@@@@
            var TotalOfColumns = new List<decimal>(columnNames.Count());       // ^ total
            decimal TotalOfRows = 0.0M;                                            // > total
            decimal TotalAll = 0.0M;
            var rowtitle = "";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #region TableHeader

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@ Table Header @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            tr = tr + " <caption><h3> " + TableTitle + " </h3> </caption> " + " ";
            tr = tr + "              <thead>" + " ";
            tr = tr + "              <tr>" + " ";

            for (int i = 0; i < columnNames.Length; i++)
            {

                if (i == 0)
                {
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">" + RowsColumnTitle + "</th>";
                }
                else
                {
                    try
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:" + FontSize + "; line-height:2!important;\">[" + (Convert.ToDateTime(columnNames[i])).Day + "-" + (Convert.ToDateTime(columnNames[i])).Month + "]</th>";
                    }
                    catch
                    {
                        tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; border-bottom-color:black!important; font-size:"+FontSize+"; line-height:2!important;\">" + columnNames[i] + "</th>";

                    }

                }
            }
            if (HasVerticalTotal)
                if (pLanguage == "en")
                {
                tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; font-size:"+FontSize+"; line-height:2!important;\">" + "TOTAL" + "</th>";

                }
                else
                {
                    tr = tr + "    <th  style= \"background-color:Gainsboro!important;text-align:center; border-bottom-width:3px!important; font-size:" + FontSize + "; line-height:2!important;\">" + "الإجمالي" + "</th>";
                }

            tr = tr + "</tr>" + " ";
            tr = tr + "</thead>" + " ";

            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

            #endregion TableHeader

            //@@@@@@@@@@@@@@@@@ Divide Rows as Lists @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            foreach (DataRow dr in datasource.Rows)
            {
                list.Add(dr);
            }
            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@





            //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Body @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            for (int i = 0; i < list.Count; i++) // ** each rows   // ** ItemArray[j] : row cell with it index
            {



                if (i == 0) // ** first row of data // ** 
                {
                    tr = tr + "              <tbody>" + " ";
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    TotalOfRows = 0;
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {

                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);


                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:"+FontSize+";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";

                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            //  }

                        }
                        else
                        {
                            rowtitle = Convert.ToString(list[i].ItemArray[j]);


                            tr = tr + " <td style = \"text-align:center;font-size:"+FontSize+";\"><b> " + rowtitle + "</b> </td> ";


                        }


                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:"+FontSize+"; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;
                    //tr = tr + "</thead>" + " ";

                }
                else if ((i + 1) == list.Count) // ** last row of data
                {
                    TotalOfRows = 0;
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {
                            //if (rowtitle.Contains("**"))
                            //{
                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:"+FontSize+";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";




                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));
                            // }


                        }
                        else
                        {
                            rowtitle = Convert.ToString(list[i].ItemArray[j]);


                            tr = tr + " <td style = \"text-align:center;font-size:"+FontSize+";\"><b> " + rowtitle + "</b> </td> ";



                        }

                        //  tr = tr + " <td> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:"+FontSize+"; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;




                }
                else
                {
                    tr = tr + "              <tr class=\"trcombat\" >" + " ";
                    TotalOfRows = 0;
                    for (int j = 0; j < list[i].ItemArray.Length; j++)
                    {

                        if (j > 0)
                        {

                            try
                            {
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }
                            catch
                            {
                                TotalOfColumns.Add(0);
                                TotalOfColumns[j - 1] += Convert.ToDecimal(list[i].ItemArray[j]);
                            }

                            tr = tr + " <td class=\"combat\" style = \"text-align:center;font-size:"+FontSize+";\">" + Convert.ToDecimal((list[i].ItemArray[j])).ToString("0.##") + "</td> ";




                            TotalOfRows = TotalOfRows + Convert.ToDecimal((list[i].ItemArray[j]));

                        }
                        else
                        {
                            rowtitle = Convert.ToString(list[i].ItemArray[j]);

                            tr = tr + " <td style = \"text-align:center;font-size:"+FontSize+";\"><b> " + rowtitle + "</b> </td> ";



                        }
                        // tr = tr + " <td style = \"text-align:center;font-size:"+FontSize+";\"> " + list[i].ItemArray[j] + " </td> ";
                    }
                    if (HasVerticalTotal)
                        tr = tr + "    <td  style= \"background-color:Gainsboro!important;text-align:center; border-left-width:3px!important; border-left-color:black!important; font-size:"+FontSize+"; line-height:2!important;\">" + Convert.ToDecimal(TotalOfRows).ToString("0.##") + " </td> ";
                    tr = tr + "</tr>" + " ";
                    TotalAll += TotalOfRows;


                }
                // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Fill Total Summary @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                if ((i + 1) == list.Count) // ** if last row >> add total row
                {
                    //************** Total *********************
                    if (HasHorizontalTotal)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                if (pLanguage == "en")
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>Total</b>" + " </td> ";
                                }
                                else
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:" + FontSize + "; border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>الإجمالي</b>" + " </td> ";
                                }
                            }
                            else
                            {

                                tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:"+FontSize+"; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalOfColumns[j - 1]).ToString("0.##") + "</b></td> ";

                            }
                        }
                        //  tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:"+FontSize+";border-top-width:3px!important; border-top-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + "ALL ROOM" + "%</b></td> ";
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:"+FontSize+";border-top-width:3px!important; border-top-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + " " + "</b></td> ";
                        tr = tr + "</tr>";


                    }
                    //****************** % *****************************
                    if (HasPercantage)
                    {
                        tr = tr + " <tr>";
                        for (int j = 0; j < list[i].ItemArray.Length; j++)
                        {

                            if (j == 0)
                            {
                                if (pLanguage == "en")
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + ";border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>Month / Total %</b>" + " </td> ";
                                }
                                else
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + ";border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"> " + "<b>الشهر / الإجمالي %</b>" + " </td> ";
                                }
                            }
                            else
                            {
                                try
                                {
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + "; border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + (((TotalOfColumns[j - 1] / Convert.ToDecimal(TotalAll)) * 100)).ToString("0.##") + "%</b></td> ";
                                }
                                catch (Exception ex)
                                {
                                    // tr = tr + " <td  style= \"background-color:Gainsboro!important; border-top-width:3px!important;font-size:"+FontSize+"; border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "0.0" + "%</b></td> ";
                                    tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:" + FontSize + "; border-bottom-width:3px!important;border-bottom-color:black!important;  border-top-width:3px!important;border-top-color:black!important;text-align:center; line-height:2!important;\"><b>" + "0.0" + "%</b></td> ";

                                }

                            }
                        }
                        if (HasVerticalTotal)
                            tr = tr + " <td  style= \"background-color:Gainsboro!important;font-size:"+FontSize+";border-bottom-width:3px!important; border-bottom-color:black!important;border-right-width:3px!important; border-right-color:black!important; border-left-width:3px!important; border-left-color:black!important;text-align:center; line-height:2!important;\"><b>" + Convert.ToDecimal(TotalAll).ToString("0.##") + "</b></td> ";


                        tr = tr + "</tr>";
                    }

                    //***************

                    //--------------------
                    tr = tr + "</tbody>" + " ";
                }



            }






            // }
            return tr;
        }








    }






}
