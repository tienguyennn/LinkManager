using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.EnvironmentEntityService.Dto
{
    public class EnvironmentEntitySearchDto : SearchBase
    {
		public string TenEnvironmentEntityFilter { get; set; }
		public string MaEnvironmentEntityFilter { get; set; }
		public int? ThuTuFilter { get; set; }
		public string GhiChuFilter { get; set; }


    }
}