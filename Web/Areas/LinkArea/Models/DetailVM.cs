using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.LinkService.Dto;

namespace Web.Areas.LinkArea.Models
{
    public class DetailVM
    {
       public LinkDto objInfo { get; set; }
    }
}