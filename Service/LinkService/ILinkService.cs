using Model.IdentityEntities;
using Model.Entities;
using Service.LinkService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.LinkService
{
    public interface ILinkService:IEntityService<Link>
    {
        PageListResultBO<LinkDto> GetDaTaByPage(LinkSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        Link GetById(long id);
        LinkDto GetDtoById(long id);
        List<LinkDto> GetByIds(List<long> ids);
        List<EnvironmentEntityData> GetData(long? userId);
        List<EnvironmentEntityData> GetConfig(long? userId);
    }
}
