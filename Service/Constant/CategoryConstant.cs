using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Constant
{
    public class CategoryConstant
    {
        [DisplayName("DR")]
        public static string DR => "DR";
        [DisplayName("OAT")]
        public static string OAT => "OAT";
        [DisplayName("Production")]
        public static string Production => "Production";
        [DisplayName("UAT")]
        public static string UAT => "UAT";
    }
}
