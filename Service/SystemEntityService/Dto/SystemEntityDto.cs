using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;


namespace Service.SystemEntityService.Dto
{
    public class SystemEntityDto : SystemEntity
    {

       public EnvironmentEntity EnvironmentEntity { get; set; }
    }
}