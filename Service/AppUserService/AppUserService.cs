using AutoMapper;
using Model.Entities;
using Model.IdentityEntities;

using Repository;
using Repository.AppUserRepository;

using log4net;
using PagedList;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Web.Mvc;
using static Service.Common.Constant;
using System.Data.Entity;
using Model;
using System.Data.Entity.Core.Objects;
using Service.AppUserService.Dto;
using Service.Common;

namespace Service.AppUserService
{
    public class AppUserService : EntityService<AppUser>, IAppUserService
    {
        IUnitOfWork _unitOfWork;
        IAppUserRepository _appUserRepository;
     
        ILog _loger;
        IMapper _mapper;

        readonly string CODE_VAITRO_CHUYENVIEN = VAITRO_CONSTANT.CHUYENVIEN;


        public AppUserService(IUnitOfWork unitOfWork, IAppUserRepository appUserRepository, ILog loger,
          
            IMapper mapper
          )
            : base(unitOfWork, appUserRepository)
        {
       
            _unitOfWork = unitOfWork;
            _appUserRepository = appUserRepository;
            _loger = loger;
            _mapper = mapper;
        }

        public PageListResultBO<UserDto> GetDaTaByPage(AppUserSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from user in _appUserRepository.GetAllAsQueryable()
                        select new UserDto
                        {
                            ProvinceManagement = user.ProvinceManagement,
                            UserName = user.UserName,
                            FullName = user.FullName,
                            Id = user.Id,
                            AccessFailedCount = user.AccessFailedCount,
                            Address = user.Address,
                            Avatar = user.Avatar,
                            BirthDay = user.BirthDay,
                            IsLock = user.Block == true || (user.LockoutEndDateUtc != null && user.LockoutEndDateUtc > DateTime.Now),
                            Email = user.Email,
                            EmailConfirmed = user.EmailConfirmed,
                            Gender = user.Gender,
                            LockoutEnabled = user.LockoutEnabled,
                            LockoutEndDateUtc = user.LockoutEndDateUtc,
                            PhoneNumber = user.PhoneNumber,
                            PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                            TypeAccount = user.TypeAccount,
                            TypeOrganization = user.TypeOrganization,
                            OrganizationId = user.OrganizationId,
                            IsSendMail = user.IsSendMail,
                            ErrorMessage = user.ErrorMessage,
                            DonViId = user.DonViId,
                            IsSingleSignOn = user.IsSingleSignOn,
                        };

            if (searchModel != null)
            {
                if (searchModel.IsUserSSO == true)
                {
                    query = query.Where(x => x.IsSingleSignOn == true);
                }

                if (searchModel.DonViIdFilter.HasValue)
                {
                    query = query.Where(x => x.DonViId == searchModel.DonViIdFilter.Value);
                }
                if (!string.IsNullOrEmpty(searchModel.UserNameFilter))
                {
                    searchModel.UserNameFilter = searchModel.UserNameFilter.Trim().ToLower();
                    query = query.Where(x => x.UserName.Trim().ToLower().Contains(searchModel.UserNameFilter));
                }

                if (!string.IsNullOrEmpty(searchModel.FullNameFilter))
                {
                    searchModel.FullNameFilter = searchModel.FullNameFilter.Trim().ToLower();
                    query = query.Where(x => x.FullName.Trim().ToLower().Contains(searchModel.FullNameFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.EmailFilter))
                {
                    searchModel.EmailFilter = searchModel.EmailFilter.Trim().ToLower();
                    query = query.Where(x => x.Email.Trim().ToLower().Contains(searchModel.EmailFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.AddressFilter))
                {
                    searchModel.AddressFilter = searchModel.AddressFilter.Trim().ToLower();
                    query = query.Where(x => x.Address.Trim().ToLower().Contains(searchModel.AddressFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.sortQuery))
                {
                    query = query.OrderBy(searchModel.sortQuery);
                }
                else
                {
                    query = query.OrderByDescending(x => x.Id);
                }
            }
            else
            {
                query = query.OrderBy(x => x.FullName);
            }
            var resultmodel = new PageListResultBO<UserDto>();


            if (pageSize == -1)
            {
                var dataPageList = query.ToList();
                resultmodel.Count = dataPageList.Count;
                resultmodel.TotalPage = 1;
                resultmodel.ListItem = dataPageList;
            }
            else
            {
                var dataPageList = query.ToPagedList(pageIndex, pageSize);
                resultmodel.Count = dataPageList.TotalItemCount;
                resultmodel.TotalPage = dataPageList.PageCount;
                resultmodel.ListItem = dataPageList.ToList();
            }
            var CurrentDateTime = DateTime.Now;
            return resultmodel;
        }

    }
}
