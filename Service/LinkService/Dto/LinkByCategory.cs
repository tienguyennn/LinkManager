using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;
using System.Web.Mvc;


namespace Service.LinkService.Dto
{
    public class EnvironmentEntityData
    {
        public EnvironmentEntity Environment { get; set; }

        public List<SystemEntityData> SystemEntityDatas { get; set; }
    }

    public class SystemEntityData
    {
        public SystemEntity SystemEntity { get; set; }
        public List<LinkDto> Links { get; set; }
    }
}