using Model.IdentityEntities;
using Model.Entities;
using Service.EnvironmentEntityService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.EnvironmentEntityService
{
    public interface IEnvironmentEntityService:IEntityService<EnvironmentEntity>
    {
        PageListResultBO<EnvironmentEntityDto> GetDaTaByPage(EnvironmentEntitySearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        EnvironmentEntity GetById(long id);
        EnvironmentEntityDto GetDtoById(long id);

        List<EnvironmentEntityDto> GetEnvironmentEntitySystemEntity();
    }
}
