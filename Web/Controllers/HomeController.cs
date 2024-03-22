using AutoMapper;
using CommonHelper.ObjectExtention;
using CommonHelper.String;
using Model.IdentityEntities;
using Service.AppUserService;
using Web.Core;
using Web.Filters;
using Web.Models;
using Web.Models.SSO;
using log4net;
using Microsoft.AspNet.Identity.Owin;
//using Moit.SingleWindow.ClientLib;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using Web.Common;
using System.Configuration;
using Model.Entities;
using CommonHelper.AsyncExtension;
using Service.LinkService;
using Service.NewsService;
using Service.Constant;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        ApplicationSignInManager _signInManager;
        ApplicationUserManager _userManager;


        readonly IMapper _mapper;
        readonly ILog _Ilog;
        private readonly INewsService _newsService;
        private readonly ILinkService _LinkService;
        readonly IAppUserService _AppUserService;

        public HomeController(
                IMapper mapper, ILog iLog,
                INewsService newsService,
                ILinkService LinkService,
                IAppUserService appUserService
                )
        {

            _mapper = mapper;
            _Ilog = iLog;
            this._newsService = newsService;
            this._LinkService = LinkService;
            _AppUserService = appUserService;
        }

        public HomeController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [AllowAnonymous]
        public ActionResult Index()
        {
            var model = new HomeViewModel()
            {
                ListBox = _newsService.GetListData(NewsTypeConstant.Box, 4),
                ListSildes = _newsService.GetListData(NewsTypeConstant.Slide, 3),
            };

            return View(model);
        }




    }
}