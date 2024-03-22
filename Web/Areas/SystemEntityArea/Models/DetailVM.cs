using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.SystemEntityService.Dto;

namespace Web.Areas.SystemEntityArea.Models
{
    public class DetailVM
    {
       public SystemEntityDto objInfo { get; set; }
    }
}