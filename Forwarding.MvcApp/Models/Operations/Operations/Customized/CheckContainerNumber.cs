using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Forwarding.MvcApp.Models.Operations.Operations.Customized
{
    #region "Array Class"
    class Array
    {
        private int mValue;
        private char mName;

        public int Value
        {
            get { return mValue; }
            set { mValue = value; }
        }

        public char Name
        {
            get { return mName; }
            set { mName = value; }
        }
    }
    #endregion
    #region "Check Container Number"
    public class CheckContainerNumber
    {
        #region "Variables"
        int Xvalue;//Character Value
        char Xchar;//Character Name
                   //public int NoOfCharacter=4;
                   //public int NoOfNum=7;
        public String ContainerNumberMask = ">LLLL0000000";
        private List<Array> Prefix = new List<Array>();//Characters Array
        Array objArray = null;//Object to work with Array
        #endregion
        #region "Fill Array"
        /// <summary>
        /// Fill Array of Characters
        /// </summary>
        private void FillArray()
        {
            Prefix.Clear();
            int seed = 1;
            for (Char i = 'A'; i <= 'Z'; i++)
            {
                if (i == 'B' || i == 'L' || i == 'V')
                {
                    seed++;
                }
                objArray = new Array();
                objArray.Name = i;
                objArray.Value = 9 + seed;
                Prefix.Add(objArray);
                seed++;
            }
        }
        #endregion
        #region "Check Container Number Validity"
        /// <summary>
        /// this function to check Container number contain 11 characters first (4 symbols are characters) and last (7 symbols are numbers)
        /// </summary>
        /// <param name="ContainerNumber">pass Container Number </param>
        /// <returns>Container Number Checked Result like a string Message</returns>
        public string Check_Container_Number(string ContainerNumber)
        {
            ContainerNumber = ContainerNumber.Trim().ToUpper();
            string Message = String.Empty;
            try
            {
                if (ContainerNumber.Length == 11)
                {
                    int sum = 0;
                    FillArray();

                    for (int i = 0; i < 4; i++)
                    {
                        Xchar = ContainerNumber.Substring(i, 1)[0];
                        Xvalue = Prefix.Find(new Predicate<Array>(GetCharacterValue)).Value;
                        sum += Xvalue * ((int)Math.Pow(2, i));
                    }
                    for (int i = 4; i < 10; i++)
                    {
                        Xchar = ContainerNumber.Substring(i, 1)[0];
                        sum += Convert.ToInt32(Xchar.ToString()) * ((int)Math.Pow(2, i));
                    }
                    if ((sum % 11 == Convert.ToInt32(ContainerNumber.Substring(10, 1)[0].ToString())) || (((sum % 11) - 10) == Convert.ToInt32(ContainerNumber.Substring(10, 1)[0].ToString())))
                    {
                        Message = "Valid";
                    }
                    else
                    {
                        Message = "InValid Number";
                    }
                }
                else
                {
                    Message = "InValid Length";
                }
            }
            catch (NullReferenceException ex)
            {
                Message = "InValid";
            }
            catch (Exception ex)
            {
                Message = "#ERROR#" + ex.Message;
            }
            return Message;
        }
        /// <summary>
        /// This function works during a user typing for container number to prevent him editing a wrong one
        /// </summary>
        /// <param name="input">Container number</param>
        /// <param name="NoOfCharacter">Number of first characters</param>
        /// <param name="NoOfNum">Number of last digits</param>
        /// <returns></returns>
        //public  Boolean CheckEditingContiner_Number(string input)
        //{
        //    if (input.Length <= (NoOfCharacter + NoOfNum))
        //    {
        //        Match match=null;
        //        for (int i = 0; i < input.Length; i++)
        //        {
        //            if (i <= NoOfCharacter-1)
        //            {
        //                match = Regex.Match(Convert.ToString(input[i]), @"^[A-Za-z]$");
        //            }
        //            else
        //            {
        //                if (i <= (NoOfCharacter + NoOfNum))
        //                {
        //                    match = Regex.Match(Convert.ToString(input[i]), @"^[0-9]$");
        //                }
        //                else
        //                {
        //                    return false;
        //                }
        //            }
        //            if (!match.Success)
        //            {
        //                return false;
        //            }
        //        }
        //        //if (input.Length <= NoOfCharacter)
        //        //{

        //        //    match = Regex.Match(input.Substring(input.Length - 1), @"^[A-Za-z]$");
        //        //}
        //        //else
        //        //{
        //        //    if (input.Length <= (NoOfCharacter + NoOfNum))
        //        //    {
        //        //        match = Regex.Match(input.Substring(input.Length - 1), @"^[0-9]$");
        //        //    }
        //        //    else
        //        //    {
        //        //        return false;
        //        //    }
        //        //}

        //    }
        //    else
        //    {
        //        return false;
        //    }
        //    return true;
        //}
        #endregion
        #region "Get Character Value"
        /// <summary>
        /// Function uses to search a value inside it
        /// </summary>
        /// <param name="Tmp">Array of charcters</param>
        /// <returns>true=find character & false=donot find</returns>
        private bool GetCharacterValue(Array Tmp)
        {
            if (Tmp.Name == Xchar)
            {
                return true;
            }
            return false;
        }
        #endregion
    }
    #endregion
}