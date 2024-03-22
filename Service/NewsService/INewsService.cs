using Model.IdentityEntities;
using Model.Entities;
using Service.NewsService.Dto;
using Service.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.NewsService
{
    public interface INewsService : IEntityService<News>
    {
        PageListResultBO<NewsDto> GetDaTaByPage(NewsSearchDto searchModel, int pageIndex = 1, int pageSize = 20);
        News GetById(long id);
        List<NewsDto> GetListData(string type, int max );
        NewsDto GetDetail(long Id);
    }
}
