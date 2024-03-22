using System.Web.Mvc;

namespace Web.Areas.EnvironmentEntityArea
{
    public class EnvironmentEntityAreaAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "EnvironmentEntityArea";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "EnvironmentEntityArea_default",
                "EnvironmentEntityArea/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}