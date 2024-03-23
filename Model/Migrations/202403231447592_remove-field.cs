namespace Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class removefield : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.AppUser", "TypeOrganization");
            DropColumn("dbo.AppUser", "OrganizationId");
            DropColumn("dbo.AppUser", "ChucVuId");
            DropColumn("dbo.AppUser", "ProvinceManagement");
            DropColumn("dbo.AppUser", "DichVuCongManagement");
            DropColumn("dbo.AppUser", "CreatedDate");
            DropColumn("dbo.AppUser", "IdChucVuNhanMail");
            DropColumn("dbo.AppUser", "CreatedBy");
            DropColumn("dbo.AppUser", "CreatedID");
            DropColumn("dbo.AppUser", "UpdatedDate");
            DropColumn("dbo.AppUser", "UpdatedBy");
            DropColumn("dbo.AppUser", "UpdatedID");
            DropColumn("dbo.AppUser", "IsDelete");
            DropColumn("dbo.AppUser", "DeleteTime");
            DropColumn("dbo.AppUser", "DeleteId");
            DropColumn("dbo.AppUser", "Mobile");
            DropColumn("dbo.AppUser", "Detail");
            DropColumn("dbo.AppUser", "LastLogin");
            DropColumn("dbo.AppUser", "Block");
            DropColumn("dbo.AppUser", "DateBlockStart");
            DropColumn("dbo.AppUser", "DateBlockEnd");
            DropColumn("dbo.AppUser", "TypeDashboard");
            DropColumn("dbo.AppUser", "IsUpdateNewPass");
            DropColumn("dbo.AppUser", "IsSendMail");
            DropColumn("dbo.AppUser", "ErrorMessage");
            DropColumn("dbo.AppUser", "DonViId");
            DropColumn("dbo.AppUser", "IsSingleSignOn");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUser", "IsSingleSignOn", c => c.Boolean(nullable: false));
            AddColumn("dbo.AppUser", "DonViId", c => c.Int());
            AddColumn("dbo.AppUser", "ErrorMessage", c => c.Boolean(nullable: false));
            AddColumn("dbo.AppUser", "IsSendMail", c => c.Boolean(nullable: false));
            AddColumn("dbo.AppUser", "IsUpdateNewPass", c => c.Boolean(nullable: false));
            AddColumn("dbo.AppUser", "TypeDashboard", c => c.Int(nullable: false));
            AddColumn("dbo.AppUser", "DateBlockEnd", c => c.DateTime());
            AddColumn("dbo.AppUser", "DateBlockStart", c => c.DateTime());
            AddColumn("dbo.AppUser", "Block", c => c.Boolean());
            AddColumn("dbo.AppUser", "LastLogin", c => c.DateTime());
            AddColumn("dbo.AppUser", "Detail", c => c.String());
            AddColumn("dbo.AppUser", "Mobile", c => c.String());
            AddColumn("dbo.AppUser", "DeleteId", c => c.Long());
            AddColumn("dbo.AppUser", "DeleteTime", c => c.DateTime());
            AddColumn("dbo.AppUser", "IsDelete", c => c.Boolean());
            AddColumn("dbo.AppUser", "UpdatedID", c => c.Long());
            AddColumn("dbo.AppUser", "UpdatedBy", c => c.String());
            AddColumn("dbo.AppUser", "UpdatedDate", c => c.DateTime());
            AddColumn("dbo.AppUser", "CreatedID", c => c.Long());
            AddColumn("dbo.AppUser", "CreatedBy", c => c.String(maxLength: 256));
            AddColumn("dbo.AppUser", "IdChucVuNhanMail", c => c.Int());
            AddColumn("dbo.AppUser", "CreatedDate", c => c.DateTime());
            AddColumn("dbo.AppUser", "DichVuCongManagement", c => c.String());
            AddColumn("dbo.AppUser", "ProvinceManagement", c => c.String());
            AddColumn("dbo.AppUser", "ChucVuId", c => c.Int());
            AddColumn("dbo.AppUser", "OrganizationId", c => c.Long());
            AddColumn("dbo.AppUser", "TypeOrganization", c => c.String());
        }
    }
}
