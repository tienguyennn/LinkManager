using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;

using Web.Areas.EnvironmentEntityArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.EnvironmentEntityService;
using Service.EnvironmentEntityService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;




namespace Web.Areas.EnvironmentEntityArea.Controllers
{
    public class EnvironmentEntityController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IMapper _mapper;
        public const string permissionIndex = "EnvironmentEntity_index";
        public const string permissionCreate = "EnvironmentEntity_create";
        public const string permissionEdit = "EnvironmentEntity_edit";
        public const string permissionDelete = "EnvironmentEntity_delete";
        public const string permissionImport = "EnvironmentEntity_import";
        public const string permissionExport = "EnvironmentEntity_export";
        public const string searchKey = "EnvironmentEntityPageSearchModel";
        private readonly IEnvironmentEntityService _EnvironmentEntityService;


        public EnvironmentEntityController(IEnvironmentEntityService EnvironmentEntityService, ILog Ilog,

            IMapper mapper
            )
        {
            _EnvironmentEntityService = EnvironmentEntityService;
            _Ilog = Ilog;
            _mapper = mapper;

        }
        // GET: EnvironmentEntityArea/EnvironmentEntity
        [PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            var listData = _EnvironmentEntityService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as EnvironmentEntitySearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new EnvironmentEntitySearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _EnvironmentEntityService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
	[PermissionAccess(Code = permissionCreate)]
        public PartialViewResult Create()
        {
            var myModel = new CreateVM();

            return PartialView("_CreatePartial", myModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public JsonResult Create(CreateVM model)
        {
            var result = new JsonResultBO(true, "Tạo Danh mục sản phẩm thành công");
            try
            {
                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<EnvironmentEntity>(model);

                    _EnvironmentEntityService.Create(EntityModel);

                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới Danh mục sản phẩm", ex);
            }
            return Json(result);
        }

	[PermissionAccess(Code = permissionEdit)]
        public PartialViewResult Edit(long id)
        {
            var myModel = new EditVM();

            var obj= _EnvironmentEntityService.GetById(id);
            if (obj== null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }

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

                    var obj = _EnvironmentEntityService.GetById(model.Id);
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }

                    obj= _mapper.Map(model, obj);

                    _EnvironmentEntityService.Update(obj);
                    
                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin Danh mục sản phẩm", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(EnvironmentEntitySearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as EnvironmentEntitySearchDto;

            if (searchModel == null)
            {
                searchModel = new EnvironmentEntitySearchDto();
                searchModel.pageSize = 20;
            }
			searchModel.TenEnvironmentEntityFilter = form.TenEnvironmentEntityFilter;
			searchModel.MaEnvironmentEntityFilter = form.MaEnvironmentEntityFilter;
			searchModel.ThuTuFilter = form.ThuTuFilter;
			searchModel.GhiChuFilter = form.GhiChuFilter;

            SessionManager.SetValue((searchKey) , searchModel);

            var data = _EnvironmentEntityService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

	[PermissionAccess(Code = permissionDelete)]
        [HttpPost]
        public JsonResult Delete(long id)
        {
            var result = new JsonResultBO(true, "Xóa Danh mục sản phẩm thành công");
            try
            {
                var user = _EnvironmentEntityService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _EnvironmentEntityService.Delete(user);
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
            model.objInfo = _EnvironmentEntityService.GetDtoById(id);
            return View(model);
        }

        
    }
}