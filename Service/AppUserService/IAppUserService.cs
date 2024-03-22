﻿using Model.Entities;
using Model.IdentityEntities;
using Model.MongoEntities;
using Service.AppUserService.Dto;
using Service.Common;
using System.Collections.Generic;
using System.Web.Mvc;

namespace Service.AppUserService
{
    public interface IAppUserService : IEntityService<AppUser>
    {
        PageListResultBO<UserDto> GetDaTaByPage(AppUserSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
    }
}
