using System.ComponentModel.DataAnnotations.Schema;


namespace Model.Entities
{
    [Table("UserLink")]
    public class UserLink : AuditableEntity<long>
    {
        public long? LinkId { get; set; }
        public long? UserId { get; set; }
    }
}
