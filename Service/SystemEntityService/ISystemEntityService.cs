using Model.IdentityEntities;
using Model.Entities;
using Service.SystemEntityService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.SystemEntityService
{
    public interface ISystemEntityService:IEntityService<SystemEntity>
    {
        PageListResultBO<SystemEntityDto> GetDaTaByPage(SystemEntitySearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        SystemEntity GetById(long id);
        SystemEntityDto GetDtoById(long id);
        List<SystemEntityDto> GetByIds(List<long> ids);
    }
}
