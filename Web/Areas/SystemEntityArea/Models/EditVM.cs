using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web.Areas.SystemEntityArea.Models
{
    public class EditVM
    {
        public long Id { get; set; }
        public long? EnvironmentId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public int ThuTu { get; set; }


    }
}