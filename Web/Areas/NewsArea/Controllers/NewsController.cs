using AutoMapper;
using CommonHelper.String;
using CommonHelper.Upload;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Model.IdentityEntities;
using Model.Entities;
using Service.Common;
using Service.Constant;
using Web.Areas.NewsArea.Models;
using Web.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Filters;
using Service.NewsService;
using Service.NewsService.Dto;
using CommonHelper.Excel;
using CommonHelper.ObjectExtention;
using Web.Common;
using System.IO;
using System.Web.Configuration;
using CommonHelper;
using Microsoft.Security.Application;
using Service.AppUserService;

namespace Web.Areas.NewsArea.Controllers
{
    public class NewsController : BaseController
    {
        private readonly ILog _Ilog;
        private readonly IAppUserService _appUserService;
        private readonly IMapper _mapper;
        public const string permissionIndex = "News_index";
        public const string permissionCreate = "News_create";
        public const string permissionEdit = "News_edit";
        public const string permissionDelete = "News_delete";
        public const string permissionImport = "News_Inport";
        public const string permissionExport = "News_export";
        public const string searchKey = "NewsPageSearchModel";
        private readonly INewsService _NewsService;

        public NewsController(INewsService NewsService, ILog Ilog,
            IAppUserService appUserService,
            IMapper mapper
            )
        {
            _NewsService = NewsService;
            _Ilog = Ilog;
            this._appUserService = appUserService;
            _mapper = mapper;

        }
        // GET: NewsArea/News
        //[PermissionAccess(Code = permissionIndex)]
        public ActionResult Index()
        {

            ViewBag.ListLoaiTT = ConstantExtension.GetDropdownData<NewsTypeConstant>();
            var listData = _NewsService.GetDaTaByPage(null);
            SessionManager.SetValue(searchKey, null);
            return View(listData);
        }

        [HttpPost]
        public JsonResult getData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchKey) as NewsSearchDto;
            if (!string.IsNullOrEmpty(sortQuery))
            {
                if (searchModel == null)
                {
                    searchModel = new NewsSearchDto();
                }
                searchModel.sortQuery = sortQuery;
                if (pageSize > 0)
                {
                    searchModel.pageSize = pageSize;
                }
                SessionManager.SetValue(searchKey, searchModel);
            }
            var data = _NewsService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }
        public PartialViewResult Create()
        {
            ViewBag.ListLoaiTT = ConstantExtension.GetDropdownData<NewsTypeConstant>();
            var myModel = new CreateVM();
            return PartialView("_CreatePartial", myModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public JsonResult Create(CreateVM model, HttpPostedFileBase ImageThumb, HttpPostedFileBase AttachFileData)
        {
            ViewBag.ListLoaiTT = ConstantExtension.GetDropdownData<NewsTypeConstant>();
            var result = new JsonResultBO(true, "Tạo mới thành công");
            try
            {

                if (ModelState.IsValid)
                {
                    var EntityModel = _mapper.Map<News>(model);
                    if (AttachFileData != null)
                    {
                        var checkValidFileResult = UploadProvider.CheckSaveFile(AttachFileData, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon);
                        if (!checkValidFileResult.status)
                        {
                            ModelState.AddModelError("AttachFileData", checkValidFileResult.message);
                            return Json(result);
                        }
                        else
                        {
                            var saveResult = UploadProvider.SaveFile(AttachFileData, null, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon, "Uploads/NewsFileData", Server.MapPath("/"));
                            if (!saveResult.status)
                            {
                                ModelState.AddModelError("AttachFileData", checkValidFileResult.message);
                                return Json(result);
                            }
                            EntityModel.AttachFileData = saveResult.path;
                        }
                    }

                    _NewsService.Create(EntityModel);
                    if (ImageThumb != null && ImageThumb.ContentLength > 0)
                    {
                        var resultUpload = UploadProvider.SaveFile(ImageThumb, null, ".jpg,.png", null, "Uploads/News/", HostingEnvironment.MapPath("/"));

                        if (resultUpload.status == true)
                        {
                            EntityModel.ImageThumb = resultUpload.path;
                            _NewsService.Update(EntityModel);
                        }
                    }


                    if (EntityModel.IsPublish == true)
                    {
                        var userIds = _appUserService.FindBy(x => x.Id != CurrentUserId).Select(x => x.Id).ToList();
                        foreach (var userId in userIds)
                        {
                          
                        }
                    }

                }

            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới", ex);
            }
            return Json(result);
        }

        public PartialViewResult Edit(int id)
        {
            ViewBag.ListLoaiTT = ConstantExtension.GetDropdownData<NewsTypeConstant>();
            var myModel = new EditVM();

            var obj = _NewsService.GetById(id);
            if (obj == null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }

            myModel = _mapper.Map(obj, myModel);
            return PartialView("_EditPartial", myModel);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public JsonResult Edit(EditVM model, HttpPostedFileBase ImageThumb, HttpPostedFileBase AttachFileData)
        {
            ViewBag.ListLoaiTT = ConstantExtension.GetDropdownData<NewsTypeConstant>();
            var result = new JsonResultBO(true);
            try
            {
                if (ModelState.IsValid)
                {
                    var obj = _NewsService.GetById(model.Id);
                    if (ImageThumb != null && ImageThumb.ContentLength > 0)
                    {
                        var resultUpload = UploadProvider.SaveFile(ImageThumb, null, ".jpg,.png", null, "Uploads/News/", HostingEnvironment.MapPath("/"));

                        if (resultUpload.status == true)
                        {
                            model.ImageThumb = resultUpload.path;
                        }
                    }
                    else
                    {
                        model.ImageThumb = obj.ImageThumb;
                    }
                    if (obj == null)
                    {
                        throw new Exception("Không tìm thấy thông tin");
                    }
                    if (AttachFileData != null)
                    {
                        var checkValidFileResult = UploadProvider.CheckSaveFile(AttachFileData, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon);
                        if (!checkValidFileResult.status)
                        {
                            ModelState.AddModelError("AttachFileData", checkValidFileResult.message);
                            return Json(result);
                        }
                        else
                        {
                            var saveResult = UploadProvider.SaveFile(AttachFileData, null, UploadProvider.ListExtensionCommon, UploadProvider.MaxSizeCommon, "Uploads/NewsFileData", Server.MapPath("/"));
                            if (!saveResult.status)
                            {
                                ModelState.AddModelError("AttachFileData", checkValidFileResult.message);
                                return Json(result);
                            }
                            model.AttachFileData = saveResult.path;
                        }
                    }
                    else
                    {
                        model.AttachFileData = obj.AttachFileData;
                    }
                    obj = _mapper.Map(model, obj);
                    _NewsService.Update(obj);


                    if (obj.IsPublish == true)
                    {
                        var userIds = _appUserService.FindBy(x => x.Id != CurrentUserId).Select(x => x.Id).ToList();
                        foreach (var userId in userIds)
                        {
                            
                        }
                    }

                }
            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin News", ex);
            }
            return Json(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult searchData(NewsSearchDto form)
        {
            var searchModel = SessionManager.GetValue(searchKey) as NewsSearchDto;

            if (searchModel == null)
            {
                searchModel = new NewsSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.IsPublishFilter = form.IsPublishFilter;
            searchModel.CategoryIdFilter = form.CategoryIdFilter;
            searchModel.TitleFilter = form.TitleFilter;
            searchModel.StatusFilter = form.StatusFilter;
            searchModel.DescriptionFilter = form.DescriptionFilter;
            searchModel.PublishDateFilter = form.PublishDateFilter;
            searchModel.ContentFilter = form.ContentFilter;
            searchModel.ImageThumbFilter = form.ImageThumbFilter;
            searchModel.AttachFileDataFilter = form.AttachFileDataFilter;

            SessionManager.SetValue((searchKey), searchModel);

            var data = _NewsService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            var result = new JsonResultBO(true, "Xóa News thành công");
            try
            {
                var user = _NewsService.GetById(id);
                if (user == null)
                {
                    throw new Exception("Không tìm thấy thông tin để xóa");
                }
                _NewsService.Delete(user);
            }
            catch (Exception ex)
            {
                result.MessageFail("Không thực hiện được");
                _Ilog.Error("Lỗi khi xóa tài khoản id=" + id, ex);
            }
            return Json(result);
        }

        public ActionResult Detail(int id)
        {
            var model = new DetailVM();
            model.objInfo = _NewsService.GetDetail(id);
            return View(model);
        }
        //[PermissionAccess(Code = permissionImport)]
        public FileResult ExportExcel()
        {
            var searchModel = SessionManager.GetValue(searchKey) as NewsSearchDto;
            var data = _NewsService.GetDaTaByPage(searchModel).ListItem;
            var dataExport = _mapper.Map<List<NewsExportDto>>(data);
            var fileExcel = ExportExcelV2Helper.Export<NewsExportDto>(dataExport);
            return File(fileExcel, "application/octet-stream", "News.xlsx");
        }
        //[PermissionAccess(Code = permissionImport)]
        public ActionResult Import()
        {
            var model = new ImportVM();
            model.PathTemplate = Path.Combine(@"/Uploads", WebConfigurationManager.AppSettings["IMPORT_News"]);

            return View(model);
        }

        [HttpPost]
        public ActionResult CheckImport(FormCollection collection, HttpPostedFileBase fileImport)
        {
            JsonResultImportBO<NewsImportDto> result = new JsonResultImportBO<NewsImportDto>(true);
            //Kiểm tra file có tồn tại k?
            if (fileImport == null)
            {
                result.Status = false;
                result.Message = "Không có file đọc dữ liệu";
                return View(result);
            }

            //Lưu file upload để đọc
            var saveFileResult = UploadProvider.SaveFile(fileImport, null, ".xls,.xlsx", null, "TempImportFile", HostingEnvironment.MapPath("/Uploads"));
            if (!saveFileResult.status)
            {
                result.Status = false;
                result.Message = saveFileResult.message;
                return View(result);
            }
            else
            {

                #region Config để import dữ liệu
                var importHelper = new ImportExcelHelper<NewsImportDto>();
                importHelper.PathTemplate = saveFileResult.fullPath;
                //importHelper.StartCol = 2;
                importHelper.StartRow = collection["ROWSTART"].ToIntOrZero();
                importHelper.ConfigColumn = new List<ConfigModule>();
                importHelper.ConfigColumn = ExcelImportExtention.GetConfigCol<NewsImportDto>(collection);
                #endregion
                var rsl = importHelper.ImportCustomRow();
                if (rsl.Status)
                {
                    result.Status = true;
                    result.Message = rsl.Message;

                    result.ListData = rsl.ListTrue;
                    result.ListFalse = rsl.lstFalse;
                }
                else
                {
                    result.Status = false;
                    result.Message = rsl.Message;
                }

            }
            return View(result);
        }


        [HttpPost]
        public JsonResult GetExportError(List<List<string>> lstData)
        {
            ExportExcelHelper<NewsImportDto> exPro = new ExportExcelHelper<NewsImportDto>();
            exPro.PathStore = Path.Combine(HostingEnvironment.MapPath("/Uploads"), "ErrorExport");
            exPro.PathTemplate = Path.Combine(HostingEnvironment.MapPath("/Uploads"), WebConfigurationManager.AppSettings["IMPORT_News"]);
            exPro.StartRow = 5;
            exPro.StartCol = 2;
            exPro.FileName = "ErrorImportNews";
            var result = exPro.ExportText(lstData);
            if (result.Status)
            {
                result.PathStore = Path.Combine(@"/Uploads/ErrorExport", result.FileName);
            }
            return Json(result);
        }

        [HttpPost]
        public JsonResult SaveImportData(List<NewsImportDto> Data)
        {
            var result = new JsonResultBO(true);

            var lstObjSave = new List<News>();
            try
            {
                foreach (var item in Data)
                {
                    var obj = _mapper.Map<News>(item);
                    _NewsService.Create(obj);
                }

            }
            catch (Exception ex)
            {
                result.Status = false;
                result.Message = "Lỗi dữ liệu, không thể import";
                _Ilog.Error("Lỗi Import", ex);
            }

            return Json(result);
        }

    }
}