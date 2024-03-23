using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;

using Web.Areas.LinkArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.LinkService;
using Service.LinkService.Dto;
using CommonHelper.ObjectExtention;
using System.IO;
using System.Web.Configuration;
using CommonHelper;
using Service.Constant;
using Service.SystemEntityService;



namespace Web.Areas.LinkArea.Controllers
{
    public class LinkController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly ISystemEntityService _systemEntityService;
        private readonly IMapper _mapper;
        public const string permissionIndex = "Link_index";
        public const string permissionCreate = "Link_create";
        public const string permissionEdit = "Link_edit";
        public const string permissionDelete = "Link_delete";
        public const string permissionImport = "Link_import";
        public const string permissionExport = "Link_export";
        public const string searchKey = "LinkPageSearchModel";
        private readonly ILinkService _LinkService;

        public LinkController(ILinkService LinkService, ILog Ilog,
            ISystemEntityService systemEntityService,
            IMapper mapper
            )
        {
            _LinkService = LinkService;
            _Ilog = Ilog;
            this._systemEntityService = systemEntityService;
            _mapper = mapper;

        }
        // GET: LinkArea/Link
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {
            var listData = _LinkService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            var dropdownListCategoryId = _systemEntityService.GetDropdown("Name", "Id");
            ViewBag.dropdownListCategoryId = dropdownListCategoryId;
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as LinkSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new LinkSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _LinkService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
        [PermissionAccess(Code = permissionCreate)]
        public PartialViewResult Create()
        {
            var myModel = new CreateVM();
            
            var dropdownListCategoryId = _systemEntityService.GetDropdown("Name", "Id");
            ViewBag.dropdownListCategoryId = dropdownListCategoryId;
            return PartialView("_CreatePartial", myModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public JsonResult Create(CreateVM model)
        {
            var result = new JsonResultBO(true, "Tạo Sản phẩm thành công");
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<Link>(model);
                    _LinkService.Create(EntityModel);

                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới Sản phẩm", ex);
            }
            return Json(result);
        }

        [PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj = _LinkService.GetById(id);
            if (obj == null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }
            var dropdownListCategoryId = _systemEntityService.GetDropdown("Name", "Id", obj.SystemId);
            ViewBag.dropdownListCategoryId = dropdownListCategoryId;

            myModel = _mapper.Map(obj, myModel);
            return PartialView("_EditPartial", myModel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]

        public JsonResult Edit(EditVM model)
        {
            var result = new JsonResultBO(true);
            try
            {
                if (ModelState.IsValid)
                {

                    var obj = _LinkService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj = _mapper.Map(model, obj);
                    _LinkService.Update(obj);

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Sản phẩm", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(LinkSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as LinkSearchDto;

            if (searchModel == null)
            {
                searchModel = new LinkSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.EnvironmentId = form.EnvironmentId;
            searchModel.Name = form.Name;
            searchModel.Href = form.Href;
            searchModel.Active = form.Active;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _LinkService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Sản phẩm thành công");
            try
            {
                var user = _LinkService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _LinkService.Delete(user);
            }
            catch (Exception ex)
            {
                result.MessageFail("Không thực hiện được");
                _Ilog.Error("Lỗi khi xóa tài khoản id=" + id, ex);
            }
            return Json(result);
        }


        public ActionResult Detail(long id)
        {
            var model = new DetailVM();
            model.objInfo = _LinkService.GetDtoById(id);
            return View(model);
        }
      
    }
}