using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.UserLinkService.Dto
{
    public class UserLinkSearchDto : SearchBase
    {
		public long? EnvironmentId { get; set; }
		public string Name { get; set; }
		public string Href { get; set; }
		public bool? Active { get; set; }


    }
}