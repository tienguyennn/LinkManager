using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;


namespace Service.LinkService.Dto
{
    public class LinkDto : Link
    {
        public SystemEntity SystemEntity { get; set; }
        public EnvironmentEntity EnvironmentEntity { get;  set; }
        public bool Checked { get; set; }
    }
}