using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("EnvironmentEntity")]
    public class EnvironmentEntity : AuditableEntity<long>
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public int Order { get; set; }
        public string Description { get; set; }


    }
}
