using Forwarding.MvcApp.Controllers.Operations.API_Operations;
using Forwarding.MvcApp.Models.Administration.Settings.Generated;
using Forwarding.MvcApp.Models.Whatsapp;
using Forwarding.MvcApp.Utilities.MessagingServices;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using static QRCoder.PayloadGenerator;

public class WhatsAppBackgroundJob
{
//    //public void ProcessNewMessages()
//    //{
//    //    int batchSize = 100;

//    //    string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//    //    using (SqlConnection con = new SqlConnection(connectionString))
//    //    {
//    //        con.Open();
//    //        bool hasMore = true;

//    //        CvwDefaults objCvwDefaults = new CvwDefaults();
//    //        int _RowCount = 0;
//    //        objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

//    //        while (hasMore)
//    //        {
//    //            List<WhatsAppMessageBatch> messages = new List<WhatsAppMessageBatch>();

//    //            using (SqlCommand cmd = new SqlCommand(
//    //              "SELECT TOP (@BatchSize) ID, HouseNumber, ETA, ATA " +
//    //              "FROM WhatsAppMessageBatch WHERE Status = 'New' AND Location = 'Operation'", con))
//    //            {
//    //                cmd.Parameters.AddWithValue("@BatchSize", batchSize);

//    //                using (SqlDataReader reader = cmd.ExecuteReader())
//    //                {
//    //                    while (reader.Read())
//    //                    {
//    //                        messages.Add(new WhatsAppMessageBatch
//    //                        {
//    //                            ID = reader.GetInt32(0),
//    //                            HouseNumber = reader.GetString(1),
//    //                            ETA = reader.IsDBNull(2) ? "" : reader.GetString(2),
//    //                            ATA = reader.IsDBNull(3) ? "" : reader.GetString(3)
//    //                        });
//    //                    }
//    //                }
//    //            }

//    //            if (messages.Count == 0)
//    //            {
//    //                hasMore = false;
//    //                break;
//    //            }

//    //            foreach (var msg in messages)
//    //            {
//    //                bool isSent = false;

//    //                CWhatsApp objCWhatsApp = new CWhatsApp();
//    //                objCWhatsApp.GetList("Where houseNumber='" + msg.HouseNumber + "'");

//    //                for (int j = 0; j < objCWhatsApp.lstCVarWhatsApp.Count; j++)
//    //                {
//    //                    StringBuilder str = new StringBuilder();
//    //                    str.AppendLine("🔈🔈🔈");
//    //                    str.AppendLine($"Hello {objCWhatsApp.lstCVarWhatsApp[j].mName}");
//    //                    str.AppendLine("Automatic System Update :- ");
//    //                    str.AppendLine("تم تحديث بيانات البوليصه التي تم الاستعلام عنها من قبل");
//    //                    str.AppendLine($"B/L Number : {objCWhatsApp.lstCVarWhatsApp[j].HouseNumber}");
//    //                    str.AppendLine($"ATA : {msg.ATA}");
//    //                    str.AppendLine($"ETA : {msg.ETA}");

//    //                    if (objCvwDefaults.lstCVarvwDefaults[0].mCompanyLocalName == "CPWORLD EGYPT")
//    //                    {
//    //                        using (UltraMsg ultraMsg = new UltraMsg("instance120848", "bkw3ccdvdlk2vyyx"))
//    //                        {
//    //                            isSent = ultraMsg.SendWhatsAppMsg("+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber, str.ToString());

//    //                        }
//    //                    }
//    //                    else
//    //                    {
//    //                        using (UltraMsg ultraMsg = new UltraMsg("instance113161", "hu0rupmzj2y2d744"))
//    //                        {
//    //                            isSent = ultraMsg.SendWhatsAppMsg("+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber, str.ToString());
//    //                            //isSent = ultraMsg.SendWhatsAppMsg("+" + 201200388049, str.ToString());
//    //                        }
//    //                    }
//    //                }

//    //                string statusToUpdate = isSent ? "Done" : "Failed";
//    //                using (SqlCommand updateCmd = new SqlCommand(
//    //                    "UPDATE WhatsAppMessageBatch SET Status = @Status WHERE ID = @ID", con))
//    //                {
//    //                    updateCmd.Parameters.AddWithValue("@Status", statusToUpdate);
//    //                    updateCmd.Parameters.AddWithValue("@ID", msg.ID);
//    //                    updateCmd.ExecuteNonQuery();
//    //                }
//    //            }
//    //        }
//    //    }
//    //}


//    public void ProcessNewMessages()
//    {
//        int batchSize = 10;

//        // Delays (بالميلي ثانية)
//        int perMessageDelayMs = 3000;  // 2-3 ثواني: حط 2000 أو 3000
//        int perBatchDelayMs = 60000;   // 30-60 ثانية: حط 30000 أو 60000 (اختياري)
//        bool enableBatchDelay = true;  // لو مش عايز Delay بين الباتشات خليها false

//        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//        using (SqlConnection con = new SqlConnection(connectionString))
//        {
//            con.Open();
//            bool hasMore = true;

//            CvwDefaults objCvwDefaults = new CvwDefaults();
//            int _RowCount = 0;
//            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

//            while (hasMore)
//            {
//                List<WhatsAppMessageBatch> messages = new List<WhatsAppMessageBatch>();

//                using (SqlCommand cmd = new SqlCommand(
//                    "SELECT TOP (@BatchSize) ID, HouseNumber, ETA, ATA " +
//                    "FROM WhatsAppMessageBatch " +
//                    "WHERE Status = 'New' AND Location = 'Operation' " +
//                    "ORDER BY ID", con))
//                {
//                    cmd.Parameters.AddWithValue("@BatchSize", batchSize);

//                    using (SqlDataReader reader = cmd.ExecuteReader())
//                    {
//                        while (reader.Read())
//                        {
//                            messages.Add(new WhatsAppMessageBatch
//                            {
//                                ID = reader.GetInt32(0),
//                                HouseNumber = reader.GetString(1),
//                                ETA = reader.IsDBNull(2) ? "" : reader.GetString(2),
//                                ATA = reader.IsDBNull(3) ? "" : reader.GetString(3)
//                            });
//                        }
//                    }
//                }

//                if (messages.Count == 0)
//                {
//                    hasMore = false;
//                    break;
//                }

//                foreach (var msg in messages)
//                {
//                    bool isSentForThisBatchRow = false;

//                    CWhatsApp objCWhatsApp = new CWhatsApp();
//                    objCWhatsApp.GetList("Where houseNumber='" + msg.HouseNumber + "'");

//                    HashSet<string> sentRecipients = new HashSet<string>();

//                    for (int j = 0; j < objCWhatsApp.lstCVarWhatsApp.Count; j++)
//                    {
//                        string recipientKey = $"{objCWhatsApp.lstCVarWhatsApp[j].mName}|{objCWhatsApp.lstCVarWhatsApp[j].HouseNumber}|{objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber}";

//                        if (sentRecipients.Contains(recipientKey))
//                        {
//                            continue;
//                        }

//                        bool isSentThisRecipient = false;

//                        StringBuilder str = new StringBuilder();
//                        str.AppendLine("🔈🔈🔈");
//                        str.AppendLine($"Hello {objCWhatsApp.lstCVarWhatsApp[j].mName}");
//                        str.AppendLine("Automatic System Update :- ");
//                        str.AppendLine("تم تحديث بيانات البوليصه التي تم الاستعلام عنها من قبل");
//                        str.AppendLine($"B/L Number : {objCWhatsApp.lstCVarWhatsApp[j].HouseNumber}");
//                        str.AppendLine($"ATA : {msg.ATA}");
//                        str.AppendLine($"ETA : {msg.ETA}");

//                        if (objCvwDefaults.lstCVarvwDefaults[0].mCompanyLocalName == "CPWORLD EGYPT")
//                        {
//                            if (!string.IsNullOrEmpty(objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber) && !objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.Contains("@") && objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.All(char.IsDigit))
//                            {
//                                using (UltraMsg ultraMsg = new UltraMsg("instance120848", "bkw3ccdvdlk2vyyx"))
//                                {
//                                    isSentThisRecipient = ultraMsg.SendWhatsAppMsg(
//                                        "+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber,
//                                        str.ToString()
//                                    );
//                                }
//                            }
//                        }
//                        else
//                        {
//                            if (!string.IsNullOrEmpty(objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber) && !objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.Contains("@") && objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.All(char.IsDigit))
//                            {
//                                using (UltraMsg ultraMsg = new UltraMsg("instance113161", "hu0rupmzj2y2d744"))
//                                {
//                                    isSentThisRecipient = ultraMsg.SendWhatsAppMsg(
//                                        "+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber,
//                                        str.ToString()
//                                    );
//                                    //isSentThisRecipient = ultraMsg.SendWhatsAppMsg("+" + 201222883581, str.ToString());
//                                }
//                            }
//                        }

//                        if (isSentThisRecipient)
//                        {
//                            isSentForThisBatchRow = true;
//                            sentRecipients.Add(recipientKey);
//                        }

//                        Thread.Sleep(perMessageDelayMs);
//                    }

//                    string statusToUpdate = isSentForThisBatchRow ? "Done" : "Failed";
//                    using (SqlCommand updateCmd = new SqlCommand(
//                        "UPDATE WhatsAppMessageBatch SET Status = @Status WHERE ID = @ID", con))
//                    {
//                        updateCmd.Parameters.AddWithValue("@Status", statusToUpdate);
//                        updateCmd.Parameters.AddWithValue("@ID", msg.ID);
//                        updateCmd.ExecuteNonQuery();
//                    }
//                }

//                if (enableBatchDelay)
//                    Thread.Sleep(perBatchDelayMs);
//            }
//        }
//    }



//    //public void CFSNewMessages(string WarehouseName)
//    //{
//    //    int batchSize = 100;

//    //    string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//    //    using (SqlConnection con = new SqlConnection(connectionString))
//    //    {
//    //        con.Open();
//    //        bool hasMore = true;

//    //        CvwDefaults objCvwDefaults = new CvwDefaults();
//    //        int _RowCount = 0;
//    //        objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

//    //        while (hasMore)
//    //        {
//    //            List<WhatsAppMessageBatch> messages = new List<WhatsAppMessageBatch>();

//    //            using (SqlCommand cmd = new SqlCommand(
//    //                "SELECT TOP (@BatchSize) ID, HouseNumber, WarehouseID, EntryDate " +
//    //                "FROM WhatsAppMessageBatch WHERE Status = 'New' AND Location = 'CFS'", con))
//    //            {
//    //                cmd.Parameters.AddWithValue("@BatchSize", batchSize);

//    //                using (SqlDataReader reader = cmd.ExecuteReader())
//    //                {
//    //                    while (reader.Read())
//    //                    {
//    //                        messages.Add(new WhatsAppMessageBatch
//    //                        {
//    //                            ID = reader.GetInt32(0),
//    //                            HouseNumber = reader.GetString(1),
//    //                            WarehouseID = reader.IsDBNull(2) ? "" : reader.GetString(2),
//    //                            EntryDate = reader.IsDBNull(3) ? "" : reader.GetString(3)
//    //                        });
//    //                    }
//    //                }
//    //            }

//    //            if (messages.Count == 0)
//    //            {
//    //                hasMore = false;
//    //                break;
//    //            }

//    //            foreach (var msg in messages)
//    //            {
//    //                bool isSent = false;

//    //                CWhatsApp objCWhatsApp = new CWhatsApp();
//    //                objCWhatsApp.GetList("Where houseNumber='" + msg.HouseNumber + "'");

//    //                for (int j = 0; j < objCWhatsApp.lstCVarWhatsApp.Count; j++)
//    //                {
//    //                    StringBuilder str = new StringBuilder();
//    //                    str.AppendLine("🔈🔈🔈");
//    //                    str.AppendLine($"Hello {objCWhatsApp.lstCVarWhatsApp[j].mName}");
//    //                    str.AppendLine("Automatic System Update :- ");
//    //                    str.AppendLine("تم تحديث بيانات البوليصه التي تم الاستعلام عنها من قبل");
//    //                    str.AppendLine($"رقم البوليصة : {objCWhatsApp.lstCVarWhatsApp[j].HouseNumber}");
//    //                    str.AppendLine($" اسم المخزن : {WarehouseName}");
//    //                    str.AppendLine($"تاريخ التخزين : {msg.EntryDate}");

//    //                    if (objCvwDefaults.lstCVarvwDefaults[0].mCompanyLocalName == "CPWORLD EGYPT")
//    //                    {
//    //                        using (UltraMsg ultraMsg = new UltraMsg("instance120848", "bkw3ccdvdlk2vyyx"))
//    //                        {
//    //                            isSent = ultraMsg.SendWhatsAppMsg("+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber, str.ToString());
//    //                        }
//    //                    }
//    //                    else
//    //                    {
//    //                        using (UltraMsg ultraMsg = new UltraMsg("instance113161", "hu0rupmzj2y2d744"))
//    //                        {
//    //                            isSent = ultraMsg.SendWhatsAppMsg("+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber, str.ToString());
//    //                            //isSent = ultraMsg.SendWhatsAppMsg("+" + 201200388049, str.ToString());
//    //                        }
//    //                    }
//    //                }

//    //                string statusToUpdate = isSent ? "Done" : "Failed";
//    //                using (SqlCommand updateCmd = new SqlCommand(
//    //                    "UPDATE WhatsAppMessageBatch SET Status = @Status WHERE ID = @ID", con))
//    //                {
//    //                    updateCmd.Parameters.AddWithValue("@Status", statusToUpdate);
//    //                    updateCmd.Parameters.AddWithValue("@ID", msg.ID);
//    //                    updateCmd.ExecuteNonQuery();
//    //                }
//    //            }
//    //        }
//    //    }
//    //}


//    //public void CFSNewMessages(string WarehouseName)
//    //{
//    //    int batchSize = 10;

//    //    // Delays (بالميلي ثانية)
//    //    int perMessageDelayMs = 3000;   // 2-3 ثواني: حط 2000 أو 3000
//    //    int perBatchDelayMs = 60000;    // 30-60 ثانية: حط 30000 أو 60000 (اختياري)
//    //    bool enableBatchDelay = true;   // لو مش عايز Delay بين الباتشات خليها false

//    //    string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//    //    using (SqlConnection con = new SqlConnection(connectionString))
//    //    {
//    //        con.Open();
//    //        bool hasMore = true;

//    //        CvwDefaults objCvwDefaults = new CvwDefaults();
//    //        int _RowCount = 0;
//    //        objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

//    //        while (hasMore)
//    //        {
//    //            List<WhatsAppMessageBatch> messages = new List<WhatsAppMessageBatch>();

//    //            using (SqlCommand cmd = new SqlCommand(
//    //                "SELECT TOP (@BatchSize) ID, HouseNumber, WarehouseID, EntryDate " +
//    //                "FROM WhatsAppMessageBatch " +
//    //                "WHERE Status = 'New' AND Location = 'CFS' " +
//    //                "ORDER BY ID", con))
//    //            {
//    //                cmd.Parameters.AddWithValue("@BatchSize", batchSize);

//    //                using (SqlDataReader reader = cmd.ExecuteReader())
//    //                {
//    //                    while (reader.Read())
//    //                    {
//    //                        messages.Add(new WhatsAppMessageBatch
//    //                        {
//    //                            ID = reader.GetInt32(0),
//    //                            HouseNumber = reader.GetString(1),
//    //                            WarehouseID = reader.IsDBNull(2) ? "" : reader.GetString(2),
//    //                            EntryDate = reader.IsDBNull(3) ? "" : reader.GetString(3)
//    //                        });
//    //                    }
//    //                }
//    //            }

//    //            if (messages.Count == 0)
//    //            {
//    //                hasMore = false;
//    //                break;
//    //            }

//    //            foreach (var msg in messages)
//    //            {
//    //                bool isSentForThisBatchRow = false;

//    //                CWhatsApp objCWhatsApp = new CWhatsApp();
//    //                objCWhatsApp.GetList("Where houseNumber='" + msg.HouseNumber + "'");

//    //                HashSet<string> sentRecipients = new HashSet<string>();

//    //                for (int j = 0; j < objCWhatsApp.lstCVarWhatsApp.Count; j++)
//    //                {
//    //                    string recipientKey = $"{objCWhatsApp.lstCVarWhatsApp[j].mName}|{objCWhatsApp.lstCVarWhatsApp[j].HouseNumber}|{objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber}";

//    //                    if (sentRecipients.Contains(recipientKey))
//    //                    {
//    //                        continue;
//    //                    }

//    //                    bool isSentThisRecipient = false;

//    //                    StringBuilder str = new StringBuilder();
//    //                    str.AppendLine("🔈🔈🔈");
//    //                    str.AppendLine($"Hello {objCWhatsApp.lstCVarWhatsApp[j].mName}");
//    //                    str.AppendLine("Automatic System Update :- ");
//    //                    str.AppendLine("تم تحديث بيانات البوليصه التي تم الاستعلام عنها من قبل");
//    //                    str.AppendLine($"رقم البوليصة : {objCWhatsApp.lstCVarWhatsApp[j].HouseNumber}");
//    //                    str.AppendLine($"اسم المخزن : {WarehouseName}");
//    //                    str.AppendLine($"تاريخ التخزين : {msg.EntryDate}");

//    //                    if (objCvwDefaults.lstCVarvwDefaults[0].mCompanyLocalName == "CPWORLD EGYPT")
//    //                    {
//    //                        if (!string.IsNullOrEmpty(objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber) && !objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.Contains("@") && objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.All(char.IsDigit))
//    //                        {
//    //                            using (UltraMsg ultraMsg = new UltraMsg("instance120848", "bkw3ccdvdlk2vyyx"))
//    //                            {
//    //                                isSentThisRecipient = ultraMsg.SendWhatsAppMsg(
//    //                                    "+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber,
//    //                                    str.ToString()
//    //                                );
//    //                            }
//    //                        }
//    //                    }
//    //                    else
//    //                    {
//    //                        if (!string.IsNullOrEmpty(objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber) && !objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.Contains("@") && objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber.All(char.IsDigit))
//    //                        {
//    //                            using (UltraMsg ultraMsg = new UltraMsg("instance113161", "hu0rupmzj2y2d744"))
//    //                            {
//    //                                isSentThisRecipient = ultraMsg.SendWhatsAppMsg(
//    //                                    "+" + objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber,
//    //                                    str.ToString()
//    //                                );
//    //                                //   isSentThisRecipient = ultraMsg.SendWhatsAppMsg(
//    //                                //    "+201200388049",
//    //                                //    str.ToString()
//    //                                //);
//    //                            }
//    //                        }
//    //                    }

//    //                    if (isSentThisRecipient)
//    //                    {
//    //                        isSentForThisBatchRow = true;
//    //                        sentRecipients.Add(recipientKey);
//    //                    }

//    //                    // Delay بين كل رسالة والتانية
//    //                    Thread.Sleep(perMessageDelayMs);
//    //                }

//    //                string statusToUpdate = isSentForThisBatchRow ? "Done" : "Failed";
//    //                using (SqlCommand updateCmd = new SqlCommand(
//    //                    "UPDATE WhatsAppMessageBatch SET Status = @Status WHERE ID = @ID", con))
//    //                {
//    //                    updateCmd.Parameters.AddWithValue("@Status", statusToUpdate);
//    //                    updateCmd.Parameters.AddWithValue("@ID", msg.ID);
//    //                    updateCmd.ExecuteNonQuery();
//    //                }
//    //            }

//    //            if (enableBatchDelay)
//    //                Thread.Sleep(perBatchDelayMs);
//    //        }
//    //    }
//    //}




//    public void CFSNewMessages(string WarehouseName)
//    {
//        int batchSize = 10;

//        // Delays (بالميلي ثانية)
//        int perMessageDelayMs = 3000;
//        int perBatchDelayMs = 60000;
//        bool enableBatchDelay = true;

//        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//        using (SqlConnection con = new SqlConnection(connectionString))
//        {
//            con.Open();
//            bool hasMore = true;

//            CvwDefaults objCvwDefaults = new CvwDefaults();
//            int _RowCount = 0;
//            objCvwDefaults.GetListPaging(1, 1, "WHERE 1=1", "ID", out _RowCount);

//            while (hasMore)
//            {
//                // 1) Claim rows atomically: UPDATE + OUTPUT
//                List<WhatsAppMessageBatch> messages = new List<WhatsAppMessageBatch>();

//                using (SqlCommand cmd = new SqlCommand(@"
//;WITH cte AS (
//    SELECT TOP (@BatchSize) ID, HouseNumber, WarehouseID, EntryDate ,Status
//    FROM WhatsAppMessageBatch WITH (ROWLOCK, UPDLOCK, READPAST)
//    WHERE Status = 'New' AND Location = 'CFS'
//    ORDER BY ID
//)
//UPDATE cte
//SET Status = 'Processing'
//OUTPUT inserted.ID, inserted.HouseNumber, inserted.WarehouseID, inserted.EntryDate;", con))
//                {
//                    cmd.Parameters.Add("@BatchSize", SqlDbType.Int).Value = batchSize;

//                    using (SqlDataReader reader = cmd.ExecuteReader())
//                    {
//                        while (reader.Read())
//                        {
//                            messages.Add(new WhatsAppMessageBatch
//                            {
//                                ID = reader.GetInt32(0),
//                                HouseNumber = reader.GetString(1),
//                                WarehouseID = reader.IsDBNull(2) ? "" : reader.GetString(2),
//                                EntryDate = reader.IsDBNull(3) ? "" : reader.GetString(3)
//                            });
//                        }
//                    }
//                }

//                if (messages.Count == 0)
//                {
//                    hasMore = false;
//                    break;
//                }

//                foreach (var msg in messages)
//                {
//                    bool isSentForThisBatchRow = false;

//                    CWhatsApp objCWhatsApp = new CWhatsApp();
//                    objCWhatsApp.GetList("Where houseNumber='" + msg.HouseNumber + "'"); // يفضّل تتعمل Parameterized داخل GetList لو تقدر

//                    HashSet<string> sentRecipientsInMemory = new HashSet<string>();

//                    for (int j = 0; j < objCWhatsApp.lstCVarWhatsApp.Count; j++)
//                    {
//                        string name = objCWhatsApp.lstCVarWhatsApp[j].mName;
//                        string houseNumber = objCWhatsApp.lstCVarWhatsApp[j].HouseNumber;
//                        string phoneRaw = objCWhatsApp.lstCVarWhatsApp[j].PhoneNumber;

//                        // منع تكرار داخل نفس الـ run (زي ما عندك)
//                        string recipientKey = $"{name}|{houseNumber}|{phoneRaw}";
//                        if (sentRecipientsInMemory.Contains(recipientKey))
//                            continue;

//                        // Validate phone
//                        if (string.IsNullOrWhiteSpace(phoneRaw) ||
//                            phoneRaw.Contains("@") ||
//                            !phoneRaw.All(char.IsDigit))
//                        {
//                            continue;
//                        }

//                        // Build message
//                        StringBuilder str = new StringBuilder();
//                        str.AppendLine("🔈🔈🔈");
//                        str.AppendLine($"Hello {name}");
//                        str.AppendLine("Automatic System Update :- ");
//                        str.AppendLine("تم تحديث بيانات البوليصه التي تم الاستعلام عنها من قبل");
//                        str.AppendLine($"رقم البوليصة : {houseNumber}");
//                        str.AppendLine($"اسم المخزن : {WarehouseName}");
//                        str.AppendLine($"تاريخ التخزين : {msg.EntryDate}");

//                        string messageText = str.ToString();

//                        // 2) Idempotency: Try INSERT into WhatsAppSentLog (BatchID + PhoneNumber unique)
//                        long logId = 0;
//                        bool canSend = TryCreateSendLog(con, msg.ID, phoneRaw, messageText, out logId);

//                        if (!canSend)
//                        {
//                            // اتسجل قبل كده لنفس (BatchID, PhoneNumber) => ممنوع يبعت تاني
//                            continue;
//                        }

//                        bool isSentThisRecipient = false;
//                        string errorMsg = null;

//                        try
//                        {
//                            string phoneToSend = "+" + phoneRaw;

//                            if (objCvwDefaults.lstCVarvwDefaults[0].mCompanyLocalName == "CPWORLD EGYPT")
//                            {
//                                using (UltraMsg ultraMsg = new UltraMsg("instance120848", "bkw3ccdvdlk2vyyx"))
//                                {
//                                    isSentThisRecipient = ultraMsg.SendWhatsAppMsg(phoneToSend, messageText);
//                                }
//                            }
//                            else
//                            {
//                                using (UltraMsg ultraMsg = new UltraMsg("instance113161", "hu0rupmzj2y2d744"))
//                                {
//                                    isSentThisRecipient = ultraMsg.SendWhatsAppMsg(phoneToSend, messageText);
//                                    //isSentThisRecipient = ultraMsg.SendWhatsAppMsg("+" + 201200388049, str.ToString());
//                                    //isSentThisRecipient = ultraMsg.SendWhatsAppMsg("+" + 201222883581, str.ToString());
//                                }
//                            }
//                        }
//                        catch (Exception ex)
//                        {
//                            isSentThisRecipient = false;
//                            errorMsg = ex.Message;
//                        }
//                        finally
//                        {
//                            UpdateSendLogStatus(con, logId, isSentThisRecipient, errorMsg);
//                        }

//                        if (isSentThisRecipient)
//                        {
//                            isSentForThisBatchRow = true;
//                            sentRecipientsInMemory.Add(recipientKey);
//                        }

//                        Thread.Sleep(perMessageDelayMs);
//                    }

//                    // Update WhatsAppMessageBatch status
//                    string statusToUpdate = isSentForThisBatchRow ? "Done" : "Failed";
//                    using (SqlCommand updateCmd = new SqlCommand(
//                        "UPDATE WhatsAppMessageBatch SET Status = @Status WHERE ID = @ID", con))
//                    {
//                        updateCmd.Parameters.Add("@Status", SqlDbType.NVarChar, 20).Value = statusToUpdate;
//                        updateCmd.Parameters.Add("@ID", SqlDbType.Int).Value = msg.ID;
//                        updateCmd.ExecuteNonQuery();
//                    }
//                }

//                if (enableBatchDelay)
//                    Thread.Sleep(perBatchDelayMs);
//            }
//        }
//    }

//    // ================= Helpers =================

//    private bool TryCreateSendLog(SqlConnection con, int batchId, string phoneNumber, string messageText, out long logId)
//    {
//        logId = 0;

//        // توحيد بسيط للرقم (مهم عشان الـ Unique يشتغل صح)
//        phoneNumber = (phoneNumber ?? "").Trim();
//        if (phoneNumber.StartsWith("+")) phoneNumber = phoneNumber.Substring(1);

//        try
//        {
//            using (SqlCommand cmd = new SqlCommand(@"
//INSERT INTO dbo.WhatsAppSentLog (BatchID, PhoneNumber, MessageText, Status)
//VALUES (@BatchID, @PhoneNumber, @MessageText, N'Attempt');
//SELECT CAST(SCOPE_IDENTITY() AS BIGINT);", con))
//            {
//                cmd.Parameters.Add("@BatchID", SqlDbType.Int).Value = batchId;
//                cmd.Parameters.Add("@PhoneNumber", SqlDbType.NVarChar, 30).Value = phoneNumber;
//                cmd.Parameters.Add("@MessageText", SqlDbType.NVarChar).Value = (object)messageText ?? DBNull.Value;

//                object result = cmd.ExecuteScalar();
//                if (result != null && result != DBNull.Value)
//                    logId = Convert.ToInt64(result);

//                return true; // اتسجل جديد => مسموح نبعت
//            }
//        }
//        catch (SqlException ex)
//        {
//            // 2601 / 2627 => Unique index violation (Duplicate)
//            if (ex.Number == 2601 || ex.Number == 2627)
//                return false; // اتسجل قبل كده => ممنوع نبعت

//            throw; // أي Error تاني
//        }
//    }

//    private void UpdateSendLogStatus(SqlConnection con, long logId, bool sent, string errorMsg)
//    {
//        if (logId <= 0) return;

//        using (SqlCommand cmd = new SqlCommand(@"
//UPDATE dbo.WhatsAppSentLog
//SET Status = @Status,
//    ErrorMessage = @ErrorMessage,
//    SentAt = SYSUTCDATETIME()
//WHERE Id = @Id;", con))
//        {
//            cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 20).Value = sent ? "Sent" : "Failed";
//            cmd.Parameters.Add("@ErrorMessage", SqlDbType.NVarChar, 4000).Value = (object)errorMsg ?? DBNull.Value;
//            cmd.Parameters.Add("@Id", SqlDbType.BigInt).Value = logId;
//            cmd.ExecuteNonQuery();
//        }
//    }

//    public void CreateBatchAndProcess(string HouseNumbers, string ETA, string ATA)
//    {
//        if (string.IsNullOrWhiteSpace(HouseNumbers))
//            return;

//        if (ETA == "01/01/1900") ETA = "";
//        if (ATA == "01/01/1900") ATA = "";

//        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//        string[] houseList = HouseNumbers.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
//        using (SqlConnection checkCon = new SqlConnection(connectionString))
//        {
//            checkCon.Open();
//            foreach (string house in houseList)
//            {
//                using (SqlCommand checkCmd = new SqlCommand(
//                    "SELECT COUNT(1) FROM WhatsAppMessageBatch WHERE HouseNumber = @HN AND Status = 'New' AND Location = @Loc", checkCon))
//                {
//                    checkCmd.Parameters.AddWithValue("@HN", house.Trim());
//                    checkCmd.Parameters.AddWithValue("@Loc", "Operation");
//                    int count = (int)checkCmd.ExecuteScalar();
//                    if (count > 0)
//                        return;
//                }
//            }
//        }

//        try
//        {
//            using (SqlConnection con = new SqlConnection(connectionString))
//            using (SqlCommand cmd = new SqlCommand("CreateWhatsAppMessageBatch", con))
//            {
//                cmd.CommandType = CommandType.StoredProcedure;
//                cmd.Parameters.AddWithValue("@HouseNumbers", HouseNumbers);
//                cmd.Parameters.AddWithValue("@ETA", (object)ETA ?? DBNull.Value);
//                cmd.Parameters.AddWithValue("@ATA", (object)ATA ?? DBNull.Value);
//                cmd.Parameters.AddWithValue("@Location", "Operation");
//                cmd.Parameters.AddWithValue("@WarehouseID", DBNull.Value);
//                cmd.Parameters.AddWithValue("@EntryDate", DBNull.Value);
//                con.Open();
//                cmd.ExecuteNonQuery();
//            }
//        }
//        catch (SqlException ex) when (ex.Number == 2601 || ex.Number == 2627)
//        {
//            // Unique index violation - duplicate 'New' record already exists, safe to ignore
//            return;
//        }

//        ProcessNewMessages();
//    }

//    public void CreateCFSBatchAndProcess(string Containerid, string WarehouseID, string EntryDate)
//    {
//        string connectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

//        string housesString;
//        string WarehouseName;

//        using (SqlConnection con = new SqlConnection(connectionString))
//        {
//            con.Open();
//            using (SqlCommand cmd = new SqlCommand(
//                "SELECT SUBSTRING((SELECT ',' + O.HouseNumber FROM Operations O WHERE MasterOperationID IS NOT NULL AND O.ID IN (SELECT OperationID FROM OperationContainersAndPackagesPlacedOn WHERE OperationContainersAndPackagesID = @Containerid) FOR XML PATH('')), 2, 10000)", con))
//            {
//                cmd.Parameters.AddWithValue("@Containerid", Containerid);
//                housesString = cmd.ExecuteScalar()?.ToString() ?? "";
//            }

//            using (SqlCommand cmd = new SqlCommand(
//                "SELECT Name FROM vwWH_Warehouse WHERE ID = @WarehouseID", con))
//            {
//                cmd.Parameters.AddWithValue("@WarehouseID", WarehouseID);
//                WarehouseName = cmd.ExecuteScalar()?.ToString() ?? "";
//            }
//        }

//        if (string.IsNullOrWhiteSpace(housesString))
//            return;

//        string[] houseList = housesString.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
//        using (SqlConnection checkCon = new SqlConnection(connectionString))
//        {
//            checkCon.Open();
//            foreach (string house in houseList)
//            {
//                using (SqlCommand checkCmd = new SqlCommand(
//                    "SELECT COUNT(1) FROM WhatsAppMessageBatch WHERE HouseNumber = @HN AND Status = 'New' AND Location = @Loc", checkCon))
//                {
//                    checkCmd.Parameters.AddWithValue("@HN", house.Trim());
//                    checkCmd.Parameters.AddWithValue("@Loc", "CFS");
//                    int count = (int)checkCmd.ExecuteScalar();
//                    if (count > 0)
//                        return;
//                }
//            }
//        }

//        try
//        {
//            using (SqlConnection con = new SqlConnection(connectionString))
//            using (SqlCommand cmd = new SqlCommand("CreateWhatsAppMessageBatch", con))
//            {
//                cmd.CommandType = CommandType.StoredProcedure;
//                cmd.Parameters.AddWithValue("@HouseNumbers", housesString);
//                cmd.Parameters.AddWithValue("@ETA", DBNull.Value);
//                cmd.Parameters.AddWithValue("@ATA", DBNull.Value);
//                cmd.Parameters.AddWithValue("@Location", "CFS");
//                cmd.Parameters.AddWithValue("@WarehouseID", (object)WarehouseID ?? DBNull.Value);
//                cmd.Parameters.AddWithValue("@EntryDate", (object)EntryDate ?? DBNull.Value);
//                con.Open();
//                cmd.ExecuteNonQuery();
//            }
//        }
//        catch (SqlException ex) when (ex.Number == 2601 || ex.Number == 2627)
//        {
//            // Unique index violation - duplicate 'New' record already exists, safe to ignore
//            return;
//        }

//        CFSNewMessages(WarehouseName);
//    }


}