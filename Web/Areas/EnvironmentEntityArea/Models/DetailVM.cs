using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.EnvironmentEntityService.Dto;

namespace Web.Areas.EnvironmentEntityArea.Models
{
    public class DetailVM
    {
       public EnvironmentEntityDto objInfo { get; set; }
    }
}