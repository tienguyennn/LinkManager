using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web.Core
{
    public class BoolModelBinder : DefaultModelBinder
    {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (valueProviderResult==null)
            {
                return null;
            }

            return (valueProviderResult != null && string.IsNullOrEmpty(valueProviderResult.AttemptedValue)) ? base.BindModel(controllerContext, bindingContext) : valueProviderResult.AttemptedValue == "on";
            // of course replace with your custom conversion logic
        }
    }
}