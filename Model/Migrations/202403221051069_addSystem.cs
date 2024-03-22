namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addSystem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EnvironmentEntity",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        Order = c.Int(nullable: false),
                        Description = c.String(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(maxLength: 256),
                        CreatedID = c.Long(),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 256),
                        UpdatedID = c.Long(),
                        IsDelete = c.Boolean(),
                        DeleteTime = c.DateTime(),
                        DeleteId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SystemEntity",
                c => new
                    {
                        Id = c.Long(nullable: false, identity: true),
                        EnvironmentId = c.Long(),
                        Name = c.String(),
                        Image = c.String(),
                        Description = c.String(),
                        ThuTu = c.Int(nullable: false),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(maxLength: 256),
                        CreatedID = c.Long(),
                        UpdatedDate = c.DateTime(nullable: false),
                        UpdatedBy = c.String(maxLength: 256),
                        UpdatedID = c.Long(),
                        IsDelete = c.Boolean(),
                        DeleteTime = c.DateTime(),
                        DeleteId = c.Long(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Link", "SystemId", c => c.Long());
            DropColumn("dbo.Link", "Category");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Link", "Category", c => c.String());
            DropColumn("dbo.Link", "SystemId");
            DropTable("dbo.SystemEntity");
            DropTable("dbo.EnvironmentEntity");
        }
    }
}
