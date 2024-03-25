using System.ComponentModel.DataAnnotations.Schema;


namespace Model.Entities
{
    [Table("Link")]
    public class Link : AuditableEntity<long>
    {
        public string Name { get; set; }
        public string Href { get; set; }
        public long? SystemId { get; set; }
        public bool Active { get; set; }
    }
}
