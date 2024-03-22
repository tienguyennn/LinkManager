using Model.Entities;
using Service.NewsService.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.Models
{
    public class HomeViewModel
    {
        public List<NewsDto> ListSildes { get; set; }
        public List<NewsDto> ListBox { get; set; }
    }
}