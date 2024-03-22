using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entities
{
    [Table("News")]
    public class News : AuditableEntity<int>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "ntext")]
        public string Content { get; set; }
        public string ImageThumb { get; set; }
        public long? CategoryId { get; set; }
        public bool? IsPublish { get; set; }
        public DateTime? PublishDate { get; set; }
        public string Status { get; set; }
        public string AttachFileData { get; set; }
    }
}
