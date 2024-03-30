using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.LinkArea.Models
{
    public class CreateVM
    {
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public string Name { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public string Href { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public long SystemId { get; set; }
        public bool Active { get; set; }
        public string Ip { get; set; }
        public string Description { get; set; }


    }
}