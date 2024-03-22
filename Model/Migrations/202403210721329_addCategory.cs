namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addCategory : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Link", "Category", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Link", "Category");
        }
    }
}
