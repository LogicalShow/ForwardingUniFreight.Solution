using Forwarding.MvcApp.Models.Accounting.MasterData.Generated;
using Forwarding.MvcApp.Models.Customized;
using Forwarding.MvcApp.Models.Station.ST_Transactions.Generated;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using WebMatrix.WebData;

namespace Forwarding.MvcApp.Controllers.Station.ST_Employment
{
    public class ST_EmployeesController : ApiController
    {
        [HttpGet, HttpPost]
        public object[] LoadWithPagingWithWhereClauseAndOrderByWithObjectArrayReturned(bool pIsLoadArrayOfObjects, string pLanguage, Int32 pPageNumber, Int32 pPageSize, string pWhereClause, string pOrderBy)
        {
            int _RowCount = 0;
            CST_employment objCA_JournalTypes = new CST_employment();
            objCA_JournalTypes.GetListPaging(pPageSize, pPageNumber, pWhereClause, pOrderBy, out _RowCount);

            return new object[] {
                new JavaScriptSerializer().Serialize(objCA_JournalTypes.lstCVarST_employment)
                , _RowCount
            };
        }

        [HttpGet, HttpPost]
        public bool Insert(string pName,DateTime pBirthDate,string pNationalID,string pAddress,string pPhoneNumber1,string pPhoneNumber2,
            string pdegree, Int32 pSection, DateTime pJoiningDate,bool pGender, Int32 pReligion, Int32 pmaritalstatus,string pNumberofChildren,
            string pmilitarystatus ,string paccessories, string pSalary, string pcategory, string pshiftEmp, string prouteLine,bool pIsInactive)
        {
            bool _result = false;

			string chkRslt = CheckNationalID(pNationalID);
			if (!string.IsNullOrEmpty(chkRslt))
				return _result;

			CVarST_employment objCVarST_employment = new CVarST_employment();

            objCVarST_employment.Name = pName;
            objCVarST_employment.BirthDate = pBirthDate;
            objCVarST_employment.NationalID = pNationalID;
            objCVarST_employment.Address = pAddress;
            objCVarST_employment.PhoneNumber1 = int.Parse(pPhoneNumber1);
            objCVarST_employment.PhoneNumber2 = int.Parse(pPhoneNumber2);
            objCVarST_employment.degree = pdegree;
            objCVarST_employment.Section = pSection;
            objCVarST_employment.JoiningDate = pJoiningDate;
            objCVarST_employment.Gender = pGender;
            objCVarST_employment.Religion = pReligion;
            objCVarST_employment.maritalstatus = pmaritalstatus;
            objCVarST_employment.NumberofChildren = int.Parse(pNumberofChildren);
            objCVarST_employment.militarystatus = pmilitarystatus;
            objCVarST_employment.accessories = paccessories;
            objCVarST_employment.Salary = Decimal.Parse(pSalary);
            objCVarST_employment.category = int.Parse(pcategory);
            objCVarST_employment.shiftEmp = int.Parse(pshiftEmp);
            objCVarST_employment.routeLine = prouteLine;
            objCVarST_employment.IsInactive = pIsInactive;


            CST_employment objCST_employment = new CST_employment();
            objCST_employment.lstCVarST_employment.Add(objCVarST_employment);
            Exception checkException = objCST_employment.SaveMethod(objCST_employment.lstCVarST_employment);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                //CallCustomizedSP
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "ST_employment", objCVarST_employment.ID, "I");
            }
            return _result;
        }

        [HttpGet, HttpPost]
        public bool Update(Int32 pID, string pName, DateTime pBirthDate, string pNationalID, string pAddress, string pPhoneNumber1, string pPhoneNumber2,
            string pdegree, Int32 pSection, DateTime pJoiningDate, bool pGender, Int32 pReligion, Int32 pmaritalstatus, string pNumberofChildren,
            string pmilitarystatus, string paccessories, string pSalary, string pcategory, string pshiftEmp, string prouteLine, bool pIsInactive)
        {
            bool _result = false;

			string chkRslt = CheckNationalID(pNationalID, pID);
			if (!string.IsNullOrEmpty(chkRslt))
				return _result;

			CVarST_employment objCVarST_employment = new CVarST_employment();
            objCVarST_employment.ID = pID;
            objCVarST_employment.Name = pName;
            objCVarST_employment.BirthDate = pBirthDate;
            objCVarST_employment.NationalID = pNationalID;
            objCVarST_employment.Address = pAddress;
            objCVarST_employment.PhoneNumber1 = int.Parse(pPhoneNumber1);
            objCVarST_employment.PhoneNumber2 = int.Parse(pPhoneNumber2);
            objCVarST_employment.degree = pdegree;
            objCVarST_employment.Section = pSection;
            objCVarST_employment.JoiningDate = pJoiningDate;
            objCVarST_employment.Gender = pGender;
            objCVarST_employment.Religion = pReligion;
            objCVarST_employment.maritalstatus = pmaritalstatus;
            objCVarST_employment.NumberofChildren = int.Parse(pNumberofChildren);
            objCVarST_employment.militarystatus = pmilitarystatus;
            objCVarST_employment.accessories = paccessories;
            objCVarST_employment.Salary = Decimal.Parse(pSalary);
            objCVarST_employment.category = int.Parse(pcategory);
            objCVarST_employment.shiftEmp = int.Parse(pshiftEmp);
            objCVarST_employment.routeLine = prouteLine;
            objCVarST_employment.IsInactive = pIsInactive;

            CST_employment objCST_employment = new CST_employment();
            objCST_employment.lstCVarST_employment.Add(objCVarST_employment);
            Exception checkException = objCST_employment.SaveMethod(objCST_employment.lstCVarST_employment);
            if (checkException != null) // an exception is caught in the model
            {
                if (checkException.Message.Contains("UNIQUE"))
                    _result = false;
            }
            else
            { //not unique
                _result = true;
                CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "A_JournalTypes", pID, "U");
            }
            return _result;
        }

		string CheckNationalID(string pNationalID, int pID=0)
		{
			CST_employment objCST_employment = new CST_employment();
			objCST_employment.GetList($"where NationalID='{pNationalID}' and ID<>{pID}");
			if (objCST_employment.lstCVarST_employment.Count > 0)
				return $"Employee ({objCST_employment.lstCVarST_employment[0].Name}) Has This National ID ";
			else
				return null;
		}

        [HttpGet, HttpPost]
        public bool Delete(String pST_EmployeesIDs)
        {
            bool _result = true;
            CST_employment objCA_JournalTypes = new CST_employment();
            Exception checkException = null;
            foreach (var currentID in pST_EmployeesIDs.Split(','))
            {
                objCA_JournalTypes.lstDeletedCPKST_employment.Add(new CPKST_employment() { ID = Int32.Parse(currentID.Trim()) });
                checkException = objCA_JournalTypes.DeleteItem(objCA_JournalTypes.lstDeletedCPKST_employment);
                if (checkException != null)
                    _result = false;
                else
                {
                    CCustomizedDBCall objCCustomizedDBCall = new CCustomizedDBCall();
                    objCCustomizedDBCall.SP_Trans_Log("SP_Trans_Log", WebSecurity.CurrentUserId, "ST_employment", Int32.Parse(currentID.Trim()), "D");
                }

            }

            return _result;
        }

    }
}
