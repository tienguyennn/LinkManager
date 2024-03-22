using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.EnvironmentEntityArea.Models
{
    public class CreateVM
    {
		public string Name { get; set; }
		public string Code { get; set; }
		public int Order { get; set; }
		public string Description { get; set; }

        
    }
}