using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.NewsService.Dto
{
    public class NewsSearchDto : SearchBase
    {
		public bool? IsPublishFilter { get; set; }
		public long? CategoryIdFilter { get; set; }
		public string TitleFilter { get; set; }
		public string StatusFilter { get; set; }
		public string DescriptionFilter { get; set; }
		public DateTime? PublishDateFilter { get; set; }
		public string ContentFilter { get; set; }
		public string ImageThumbFilter { get; set; }
		public string AttachFileDataFilter { get; set; }


    }
}