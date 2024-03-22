using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.SystemEntityService.Dto
{
    public class SystemEntitySearchDto : SearchBase
    {
		public long? EnvironmentEntityIdFilter { get; set; }
		public string TenFilter { get; set; }
		public decimal? GiaFilter { get; set; }
		public int? ThuTuFilter { get; set; }


    }
}