using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using OperationsOld = Forwarding.MvcApp.Models.Operations.Operations.Generated.Old;
using OperationsNew  = Forwarding.MvcApp.Entities.Operations;
using Forwarding.MvcApp.Controllers.Operations.API_Operations;
using Forwarding.MvcApp.Models.Operations.Operations.Generated;
using Forwarding.MvcApp.Controllers.Administration.API_Logs;

namespace Forwarding.MvcApp.AutoMapperConfig
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            //Mapper.CreateMap<SourceType, DestinationType>().IgnoreAllNonExisting();

            CreateMap<CVarvwRoutings, vwRoutingsLog>()
            .ForMember(dest => dest.ExpectedDeparture, opt => opt.MapFrom(src => src.ExpectedDeparture < Convert.ToDateTime("01/01/2000") ? "" : src.ExpectedDeparture.ToString("dd/MM/yy hh:mm:ss tt")))
            .ForMember(dest => dest.ATAPOLDate, opt => opt.MapFrom(src => src.ATAPOLDate < Convert.ToDateTime("01/01/2000") ? "" : src.ATAPOLDate.ToString("dd/MM/yy hh:mm:ss tt")))
            .ForMember(dest => dest.ActualDeparture, opt => opt.MapFrom(src => src.ActualDeparture < Convert.ToDateTime("01/01/2000") ? "" : src.ActualDeparture.ToString("dd/MM/yy hh:mm:ss tt")))
            .ForMember(dest => dest.ExpectedArrival, opt => opt.MapFrom(src => src.ExpectedArrival < Convert.ToDateTime("01/01/2000") ? "" : src.ExpectedArrival.ToString("dd/MM/yy hh:mm:ss tt")))
            .ForMember(dest => dest.ActualArrival, opt => opt.MapFrom(src => src.ActualArrival < Convert.ToDateTime("01/01/2000") ? "" : src.ActualArrival.ToString("dd/MM/yy hh:mm:ss tt")))
            .ForMember(dest => dest.ETAPOLDate, opt => opt.MapFrom(src => src.ETAPOLDate < Convert.ToDateTime("01/01/2000") ? "" : src.ETAPOLDate.ToString("dd/MM/yy hh:mm:ss tt")));


            CreateMap<CVarvwOperationContainersAndPackages, OperationContainersAndPackagesLog>()
                ;

            CreateMap<CVarvwOperations, vwOperationsLog>()
                ;
        }



    }

    public static class AutoMap
    {
       
        public static IMapper Mapper { get; set; }

        public static void RegisterMappings()
        {
            var mapperConfiguration = new MapperConfiguration(
               config =>
               {
                   config.AddProfile<AutoMapperProfile>();
               });

            Mapper = mapperConfiguration.CreateMapper();
        }
    }
}
