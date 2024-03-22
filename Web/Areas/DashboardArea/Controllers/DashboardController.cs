using AutoMapper;
using BotDetect.C5;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using CommonHelper.String;
using Model;
using Model.Entities;
using Service.AppUserService;
//using Web.Areas.KeKhaiArea.Data;
using Web.Core;
using Web.Filters;
using log4net;
using Lucene.Net.Search;
using OfficeOpenXml.FormulaParsing.ExpressionGraph.FunctionCompilers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Runtime.Remoting.Channels;
using System.Threading.Tasks;
using System.Web.Mvc;
using Service.LinkService;

namespace Web.Areas.DashboardArea.Controllers
{
    public class DashboardController : BaseController
    {
        readonly IMapper _mapper;
        private readonly ILinkService _linkService;
        readonly ILog _log;
        public DashboardController(
            IMapper mapper,
            ILinkService linkService,
            ILog log)
        {
            _log = log;
            _mapper = mapper;
            this._linkService = linkService;
        }



        public ActionResult Index()
        {
            if(CurrentUserInfo.UserName == "admin")
            {
                ViewBag.Data = _linkService.GetData();
                return View();
            }
            else
            {
                ViewBag.Data = _linkService.GetData();
                return View("IndexUser");
            }
            

        }
    }
}

