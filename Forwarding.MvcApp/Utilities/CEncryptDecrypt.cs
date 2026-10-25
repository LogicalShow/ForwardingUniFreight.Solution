using System;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace Forwarding.BLL.Utilities
{
    public class CEncryptDecrypt
    {
        private const String _strEDKey = "2015;3[fruRIT);@Info6(sYs";
        /// <summary>
        /// Encrypt a string using dual encryption method. Return a encrypted cipher Text
        /// </summary>
        /// <param name="pToEncrypt">string to be encrypted</param>
        /// <param name="pUseHashing">use hashing? send to for extra security</param>
        /// <returns></returns>
        public static string Encrypt(string pToEncrypt, bool pUseHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(pToEncrypt);

            if (pUseHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(_strEDKey));
                hashmd5.Clear();
            }
            else
                keyArray = UTF8Encoding.UTF8.GetBytes(_strEDKey);

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            tdes.Clear();
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        /// <summary>
        /// DeCrypt a string using dual encryption method. Return a DeCrypted clear string
        /// </summary>
        /// <param name="pCipherString">encrypted string</param>
        /// <param name="pUseHashing">Did you use hashing to encrypt this data? pass true is yes</param>
        /// <returns></returns>
        public static string Decrypt(string pCipherString, bool pUseHashing)
        {
            byte[] keyArray;
            byte[] toEncryptArray = Convert.FromBase64String(pCipherString);

            if (pUseHashing)
            {
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(_strEDKey));
                hashmd5.Clear();
            }
            else
                keyArray = UTF8Encoding.UTF8.GetBytes(_strEDKey);

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;

            ICryptoTransform cTransform = tdes.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

            tdes.Clear();
            return UTF8Encoding.UTF8.GetString(resultArray);
        }
    }



    /// <summary>
    /// HtmlTableParser parses the contents of an html string into a System.Data DataSet or DataTable.
    /// </summary>
    public class HtmlTableParser
    {
        private const RegexOptions ExpressionOptions = RegexOptions.Singleline | RegexOptions.Multiline | RegexOptions.IgnoreCase;

        private const string CommentPattern = "<!--(.*?)-->";
        private const string TablePattern = "<table[^>]*>(.*?)</table>";
        private const string HeaderPattern = "<th[^>]*>(.*?)</th>";
        private const string RowPattern = "<tr[^>]*>(.*?)</tr>";
        private const string CellPattern = "<td[^>]*>(.*?)</td>";

        /// <summary>
        /// Given an HTML string containing n table tables, parse them into a DataSet containing n DataTables.
        /// </summary>
        /// <param name="html">An HTML string containing n HTML tables</param>
        /// <returns>A DataSet containing a DataTable for each HTML table in the input HTML</returns>
        public static DataSet ParseDataSet(string html)
        {
            DataSet dataSet = new DataSet();
            MatchCollection tableMatches = Regex.Matches(
                WithoutComments(html),
                TablePattern,
                ExpressionOptions);

            foreach (Match tableMatch in tableMatches)
            {
                dataSet.Tables.Add(ParseTable(tableMatch.Value));
            }

            return dataSet;
        }

        /// <summary>
        /// Given an HTML string containing a single table, parse that table to form a DataTable.
        /// </summary>
        /// <param name="tableHtml">An HTML string containing a single HTML table</param>
        /// <returns>A DataTable which matches the input HTML table</returns>
        public static DataTable ParseTable(string tableHtml)
        {
            string tableHtmlWithoutComments = WithoutComments(tableHtml);

            DataTable dataTable = new DataTable();

            MatchCollection rowMatches = Regex.Matches(
                tableHtmlWithoutComments,
                RowPattern,
                ExpressionOptions);

            dataTable.Columns.AddRange(tableHtmlWithoutComments.Contains("<th")
                                           ? ParseColumns(tableHtml)
                                           : GenerateColumns(rowMatches));

            ParseRows(rowMatches, dataTable);

            return dataTable;
        }

        /// <summary>
        /// Strip comments from an HTML stirng
        /// </summary>
        /// <param name="html">An HTML string potentially containing comments</param>
        /// <returns>The input HTML string with comments removed</returns>
        private static string WithoutComments(string html)
        {
            return Regex.Replace(html, CommentPattern, string.Empty, ExpressionOptions);
        }

        /// <summary>
        /// Add a row to the input DataTable for each row match in the input MatchCollection
        /// </summary>
        /// <param name="rowMatches">A collection of all the rows to add to the DataTable</param>
        /// <param name="dataTable">The DataTable to which we add rows</param>
        private static void ParseRows(MatchCollection rowMatches, DataTable dataTable)
        {
            foreach (Match rowMatch in rowMatches)
            {
                // if the row contains header tags don't use it - it is a header not a row
                if (!rowMatch.Value.Contains("<th"))
                {
                    DataRow dataRow = dataTable.NewRow();

                    MatchCollection cellMatches = Regex.Matches(
                        rowMatch.Value,
                        CellPattern,
                        ExpressionOptions);

                    for (int columnIndex = 0; columnIndex < cellMatches.Count; columnIndex++)
                    {
                        dataRow[columnIndex] = cellMatches[columnIndex].Groups[1].ToString();
                    }

                    dataTable.Rows.Add(dataRow);
                }
            }
        }

        /// <summary>
        /// Given a string containing an HTML table, parse the header cells to create a set of DataColumns
        /// which define the columns in a DataTable.
        /// </summary>
        /// <param name="tableHtml">An HTML string containing a single HTML table</param>
        /// <returns>A set of DataColumns based on the HTML table header cells</returns>
        private static DataColumn[] ParseColumns(string tableHtml)
        {
            MatchCollection headerMatches = Regex.Matches(
                tableHtml,
                HeaderPattern,
                ExpressionOptions);

            return (from Match headerMatch in headerMatches
                    select new DataColumn(headerMatch.Groups[1].ToString())).ToArray();
        }

        /// <summary>
        /// For tables which do not specify header cells we must generate DataColumns based on the number
        /// of cells in a row (we assume all rows have the same number of cells).
        /// </summary>
        /// <param name="rowMatches">A collection of all the rows in the HTML table we wish to generate columns for</param>
        /// <returns>A set of DataColumns based on the number of celss in the first row of the input HTML table</returns>
        private static DataColumn[] GenerateColumns(MatchCollection rowMatches)
        {
            int columnCount = Regex.Matches(
                rowMatches[0].ToString(),
                CellPattern,
                ExpressionOptions).Count;

            return (from index in Enumerable.Range(0, columnCount)
                    select new DataColumn("Column " + Convert.ToString(index))).ToArray();
        }
    }
}