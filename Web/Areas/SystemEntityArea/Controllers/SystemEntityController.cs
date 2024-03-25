using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;

using Web.Areas.SystemEntityArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.SystemEntityService;
using Service.SystemEntityService.Dto;
using CommonHelper.ObjectExtention;
using System.IO;
using System.Web.Configuration;
using CommonHelper;

using Service.EnvironmentEntityService;
using Service.EnvironmentEntityService.Dto;



namespace Web.Areas.SystemEntityArea.Controllers
{
    public class SystemEntityController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "SystemEntity_index";
        public const string permissionCreate = "SystemEntity_create";
        public const string permissionEdit = "SystemEntity_edit";
        public const string permissionDelete = "SystemEntity_delete";
        public const string permissionImport = "SystemEntity_import";
        public const string permissionExport = "SystemEntity_export";
        public const string searchKey = "SystemEntityPageSearchModel";
        private readonly ISystemEntityService _SystemEntityService;
        private readonly IEnvironmentEntityService _EnvironmentEntityService;

        public SystemEntityController(ISystemEntityService SystemEntityService, ILog Ilog,
                IEnvironmentEntityService EnvironmentEntityService,

            IMapper mapper
            )
        {
            _SystemEntityService = SystemEntityService;
            _Ilog = Ilog;
            _mapper = mapper;
            _EnvironmentEntityService = EnvironmentEntityService;

        }
        // GET: SystemEntityArea/SystemEntity
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {
            var dropdownListEnvironmentEntityId = _EnvironmentEntityService.GetDropdown("Name", "Id");
            ViewBag.dropdownListEnvironmentEntityId = dropdownListEnvironmentEntityId;

            var listData = _SystemEntityService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as SystemEntitySearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new SystemEntitySearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _SystemEntityService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
        [PermissionAccess(Code = permissionCreate)]
        public PartialViewResult Create()
        {
            var myModel = new CreateVM();
            var dropdownListEnvironmentEntityId = _EnvironmentEntityService.GetDropdown("Name", "Id");
            ViewBag.dropdownListEnvironmentEntityId = dropdownListEnvironmentEntityId;

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
                    var EntityModel = _mapper.Map<SystemEntity>(model);
                    _SystemEntityService.Create(EntityModel);

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

            var obj = _SystemEntityService.GetById(id);
            if (obj == null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }
            var dropdownListEnvironmentEntityId = _EnvironmentEntityService.GetDropdown("Name", "Id", obj.EnvironmentId);
            ViewBag.dropdownListEnvironmentEntityId = dropdownListEnvironmentEntityId;

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

                    var obj = _SystemEntityService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }
                    obj.Name = model.Name;
                    obj.EnvironmentId = model.EnvironmentId;
                    obj.Description = model.Description;
                    obj.ThuTu = model.ThuTu;
                    _SystemEntityService.Update(obj);

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
        public JsonResult searchData(SystemEntitySearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as SystemEntitySearchDto;

            if (searchModel == null)
            {
                searchModel = new SystemEntitySearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.EnvironmentEntityIdFilter = form.EnvironmentEntityIdFilter;
            searchModel.TenFilter = form.TenFilter;
            searchModel.GiaFilter = form.GiaFilter;
            searchModel.ThuTuFilter = form.ThuTuFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _SystemEntityService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Sản phẩm thành công");
            try
            {
                var user = _SystemEntityService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _SystemEntityService.Delete(user);
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
            model.objInfo = _SystemEntityService.GetDtoById(id);
            return View(model);
        }
    }
}