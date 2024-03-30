namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addActive : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.EnvironmentEntity", "Active", c => c.Boolean(nullable: false));
            AddColumn("dbo.Link", "Ip", c => c.String());
            AddColumn("dbo.SystemEntity", "Active", c => c.Boolean(nullable: false));
            DropColumn("dbo.SystemEntity", "Image");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SystemEntity", "Image", c => c.String());
            DropColumn("dbo.SystemEntity", "Active");
            DropColumn("dbo.Link", "Ip");
            DropColumn("dbo.EnvironmentEntity", "Active");
        }
    }
}
