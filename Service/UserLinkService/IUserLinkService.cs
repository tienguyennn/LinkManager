using Model.IdentityEntities;
using Model.Entities;
using Service.UserLinkService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.UserLinkService
{
    public interface IUserLinkService:IEntityService<UserLink>
    {
        PageListResultBO<UserLinkDto> GetDaTaByPage(UserLinkSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        UserLink GetById(long id);
        UserLinkDto GetDtoById(long id);
        List<UserLinkDto> GetByIds(List<long> ids);
    }
}
