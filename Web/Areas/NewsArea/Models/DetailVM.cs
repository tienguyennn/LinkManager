using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Model.IdentityEntities;
using Model.Entities;
using Service.NewsService.Dto;

namespace Web.Areas.NewsArea.Models
{
    public class DetailVM
    {
       public NewsDto objInfo { get; set; }
    }
}