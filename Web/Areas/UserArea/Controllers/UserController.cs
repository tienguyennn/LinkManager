using AutoMapper;
using CommonHelper;
using CommonHelper.Excel;
using CommonHelper.String;
using CommonHelper.Upload;
using Model.Entities;
using Model.IdentityEntities;
using Service.AppUserService;
using Service.AppUserService.Dto;
using Service.Common;
using Web.Areas.UserArea.Models;
using Web.Common;
using Web.Filters;
using log4net;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Web.Mvc;
using Web.Common;
using Model;
using OfficeOpenXml.Style;
using OfficeOpenXml;
using org.apache.cxf.jaxrs.model;
using System.Web.ApplicationServices;

namespace Web.Areas.UserArea.Controllers
{
    public class UserController : BaseController
    {
        readonly IAppUserService _appUserService;
   
        readonly ILog _Ilog;
        readonly IMapper _mapper;
        const string permissionIndex = "QLTaiKhoan";



        string searchUserKey = "SearchUser";
        string searchUserActiveKey = "SearchUserActive";
        string searchUserAccess = "searchUserAccess";
        public UserController(IAppUserService appUserService, ILog Ilog,
 
            IMapper mapper
            )

        {
          
            _appUserService = appUserService;
            _Ilog = Ilog;
            _mapper = mapper;
        }
        // GET: UserArea/User
        public ActionResult Index(int vaitroid = 0)
        {
   
                SessionManager.SetValue(searchUserKey, null);
                var viewModel = new UserListViewModel()
                {
                    ListUser = _appUserService.GetDaTaByPage(null)

                };
                return View(viewModel);

        }

        [HttpPost]
        public JsonResult GetData(int indexPage, string sortQuery, int pageSize)
        {
            var searchModel = SessionManager.GetValue(searchUserKey) as AppUserSearchDto;
            if (searchModel == null)
            {
                searchModel = new AppUserSearchDto();
            }
            if (!string.IsNullOrEmpty(sortQuery))
            {
                searchModel.sortQuery = sortQuery;
            }
            if (pageSize > 0)
            {
                searchModel.pageSize = pageSize;
            }
            SessionManager.SetValue(searchUserKey, searchModel);
            var data = _appUserService.GetDaTaByPage(searchModel, indexPage, pageSize);
            return Json(data);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult SearchData(AppUserSearchDto model, FormCollection form)
        {
            var searchModel = SessionManager.GetValue(searchUserKey) as AppUserSearchDto;
            if (searchModel == null)
            {
                searchModel = new AppUserSearchDto();
                searchModel.pageSize = 20;
            }
            searchModel.IsUserSSO = form["IsUserSSO"] != "false";
            searchModel.UserNameFilter = model.UserNameFilter;
            searchModel.AddressFilter = model.AddressFilter;
            searchModel.EmailFilter = model.EmailFilter;
            searchModel.FullNameFilter = model.FullNameFilter;
            searchModel.DepartmentIdFilter = model.DepartmentIdFilter;
            searchModel.IsCongTacVienFilter = model.IsCongTacVienFilter;
            searchModel.IsTruongPhongFilter = model.IsTruongPhongFilter;
            searchModel.DonViIdFilter = model.DonViIdFilter;
            searchModel.VaiTroIdFilter = form["VaiTroIdFilter"].ToListInt(',');
            SessionManager.SetValue(searchUserKey, searchModel);

            var data = _appUserService.GetDaTaByPage(searchModel, 1, searchModel.pageSize);
            return Json(data);
        }


        public PartialViewResult Create(int vaitroid = 0)
        {
            ViewBag.vaitroid = vaitroid;
            var myModel = new CreateVM();

            return PartialView("_CreatePartial", myModel);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Create(CreateVM model, FormCollection form)
        {
            var result = new JsonResultBO(true, "Tạo tài khoản thành công");
            try
            {
                if (!ModelState.IsValid)
                {
                    result.Status = false;
                    result.Message = ModelState.GetErrors();
                    return Json(result);
                }

                var user = new AppUser();
                user.UserName = model.UserName;
                user.FullName = model.FullName;
                user.PhoneNumber = model.PhoneNumber;
                user.BirthDay = model.BirthDay;
                user.Address = model.Address;
                user.Gender = model.Gender;
                user.Email = model.Email;
                user.DonViId = model.DonviId;
                user.Avatar = "images/avatars/profile-pic.jpg";
                user.IdChucVuNhanMail = model.VaiTroMacDinh;
                user.TypeOrganization = model.TypeOrganization;
                user.IsSingleSignOn = false;
                var UserManager = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();

                //Kiểm tra thông tin tài khoản
                var resultUser = UserManager.CreateAsync(user, "12345678").Result;
                if (!resultUser.Succeeded)
                {
    
                }
                _appUserService.Save(user);
            }
            catch (Exception ex)
            {
                result.MessageFail(ex.Message);
                _Ilog.Error("Lỗi tạo mới tài khoản", ex);
            }
            return Json(result);
        }


        public ActionResult MyProfile()
        {
            var model = new DetailVM();
            model.users = _appUserService.GetById((long)CurrentUserId);
            string departmentName = "Chưa cập nhật";
            string job = "Chưa cập nhật";
            ViewBag.departmentName = departmentName;
            ViewBag.job = job;
            return View(model);
        }

        public PartialViewResult Edit(long id, int vaitroid = 0)
        {
            ViewBag.vaitroid = vaitroid;
            var user = _appUserService.GetById(id);
            if (user == null)
            {
                throw new HttpException(404, "Không tìm thấy thông tin");
            }
            var myModel = new EditVM()
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                BirthDay = user.BirthDay,
                Gender = user.Gender,
                Address = user.Address,
                VaiTroMacDinh = user.IdChucVuNhanMail,
                DonViId = user.DonViId,
                TypeOrganization = user.TypeOrganization,
                UserName = user.UserName,
            };
            var viewModel = _mapper.Map(user, myModel);
            return PartialView("_EditPartial", viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult Edit(EditVM model, HttpPostedFileBase Avatar)
        {
            var result = new JsonResultBO(true);
            try
            {
                if (!ModelState.IsValid)
                {

                    result.Status = false;
                    result.Message = ModelState.GetErrors();
                    return Json(result);
                }
                if (ModelState.IsValid)
                {
                    if (Avatar != null && Avatar.ContentLength > 0)
                    {
                        var resultUpload = UploadProvider.SaveFile(Avatar, null, ".jpg,.png", null, "assets/Avatar/", HostingEnvironment.MapPath("/"));

                        if (resultUpload.status == true)
                        {
                            model.Avatar = resultUpload.path;
                        }
                    }
                }

                var isTenNguoiDungExisted = _appUserService.FindBy(x => x.UserName == model.UserName && x.Id != model.Id).Any();
                if (isTenNguoiDungExisted)
                {
                    result.Status = false;
                    result.Message = "Tên người dùng đã tồn tại";
                    return Json(result);
                }
                var user = _appUserService.GetById(model.Id);
                if (user == null)
                {
                    result.Status = false;
                    result.Message = StringUtilities.GetNullObjectMessage("người dùng");
                    return Json(result);
                }

                user.IdChucVuNhanMail = model.VaiTroMacDinh;
                user.DonViId = model.DonViId;
                user.IsSingleSignOn = false;
                user = _mapper.Map(model, user);
                _appUserService.Update(user);

                result.Message = StringUtilities.GetEditMessage("người dùng", 1);
            }
            catch (Exception ex)
            {

                result.Status = false;
                result.Message = "Không cập nhật được";
                _Ilog.Error("Lỗi cập nhật thông tin User", ex);
                /*if (ex is DbEntityValidationException)
                {
                    var err = (DbEntityValidationException)ex;
                    foreach (var eve in err.EntityValidationErrors)
                    {
                        System.Diagnostics.Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                            eve.Entry.Entity.GetType().Name, eve.Entry.State);
                        foreach (var ve in eve.ValidationErrors)
                        {
                            System.Diagnostics.Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                                ve.PropertyName, ve.ErrorMessage);
                        }
                    }
                }*/
            }
            return Json(result);
        }
    }
}