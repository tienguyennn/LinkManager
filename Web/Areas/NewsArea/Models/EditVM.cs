using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.NewsArea.Models
{
    public class EditVM
    {
		public int Id { get; set; }
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