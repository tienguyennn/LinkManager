using System.Web.Mvc;

namespace Web.Areas.UserLinkArea
{
    public class UserLinkAreaAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "UserLinkArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "UserLinkArea_default",
                "UserLinkArea/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}