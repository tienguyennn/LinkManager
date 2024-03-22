using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.NewsRepository
{
    public interface INewsRepository:IGenericRepository<News>
    {
        News GetById(long id);

    }
   
}
