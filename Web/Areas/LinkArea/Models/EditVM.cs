using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.LinkArea.Models
{
    public class EditVM
    {
	    public int Id { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập thông tin này")]
        public string Href { get; set; }
        public long SystemId { get; set; }
        public bool Active { get; set; }


    }
}