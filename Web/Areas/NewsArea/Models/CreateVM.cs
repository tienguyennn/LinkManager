using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Areas.NewsArea.Models
{
    public class CreateVM
    {
		public bool? IsPublish { get; set; }
		public long? CategoryId { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
		public string Title { get; set; }
		public string Status { get; set; }
		public string Description { get; set; }
		public DateTime? PublishDate { get; set; }
		public string Content { get; set; }
		public string ImageThumb { get; set; }
		public string AttachFileData { get; set; }

        
    }
}