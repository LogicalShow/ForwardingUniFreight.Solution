using System;
using System.Collections.Generic;
using Forwarding.MvcApp.AutoMapperConfig;
using OperationsOld = Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
namespace Forwarding.MvcApp.Entities.Operations
{
    [Serializable]
    public class CPKRoutings : OperationsOld.CPKRoutings
    {
     
    }

    [Serializable]
    public partial class CVarRoutings : OperationsOld.CVarRoutings
    {
        //  set default for property for insert operations   
        public CVarRoutings()
        {

        }
    }

    public partial class CRoutings : OperationsOld.CRoutings
    {
       
    }


}