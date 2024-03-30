using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;

using Web.Areas.UserLinkArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.UserLinkService;
using Service.UserLinkService.Dto;
using CommonHelper.ObjectExtention;
using System.IO;
using System.Web.Configuration;
using CommonHelper;
using Service.Constant;
using Service.SystemEntityService;
using Service.LinkService;



namespace Web.Areas.UserLinkArea.Controllers
{
    public class UserLinkController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly ISystemEntityService _systemEntityService;
        private readonly ILinkService _linkService;
        private readonly IMapper _mapper;
        public const string permissionIndex = "UserLink_index";
        public const string permissionCreate = "UserLink_create";
        public const string permissionEdit = "UserLink_edit";
        public const string permissionDelete = "UserLink_delete";
        public const string permissionImport = "UserLink_import";
        public const string permissionExport = "UserLink_export";
        public const string searchKey = "UserLinkPageSearchModel";
        private readonly IUserLinkService _UserLinkService;

        public UserLinkController(IUserLinkService UserLinkService, ILog Ilog,
            ISystemEntityService systemEntityService,
            ILinkService linkService,
            IMapper mapper
            )
        {
            _UserLinkService = UserLinkService;
            _Ilog = Ilog;
            this._systemEntityService = systemEntityService;
            this._linkService = linkService;
            _mapper = mapper;

        }
        // GET: UserLinkArea/UserLink
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index(long? id)
        {
            ViewBag.UserId = id;
            var data = _linkService.GetConfig(id);
            return View(data);
        }

        [HttpPost]
        public JsonResult Save(FormCollection form)
        {
            var result = new JsonResultBO(true);
            var userId = form["UserId"].ToLongOrZero();

            var linkIds = new List<long?>();
            var keys = form.AllKeys.Where(x => x.StartsWith("link-"));
            foreach (var key in keys)
            {
                var idLink = key.Replace("link-", "").ToLongOrZero();
                linkIds.Add(idLink);
            }

            var lstInDB = _UserLinkService.FindBy(x => x.UserId == userId).Select(x => x.LinkId).ToList();
            var lstDelete = lstInDB.Where(x => !linkIds.Contains(x));
            var inserts = linkIds.Where(x => !lstInDB.Contains(x)).Select(x => new UserLink()
            {
                UserId = userId,
                LinkId = x,
            });

            if (inserts.Any())
            {
                _UserLinkService.InsertRange(inserts);
            }
            _UserLinkService.Delete(x => x.UserId == userId && lstDelete.Contains(x.LinkId));


            return Json(result);
        }


    }
}