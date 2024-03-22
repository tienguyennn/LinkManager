using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Common;
using Service.Constant;

namespace Service.NewsService.Dto
{
    public class NewsDto : News
    {
        public string NameLoai => ConstantExtension.GetName<NewsTypeConstant>(Status);
    }
}