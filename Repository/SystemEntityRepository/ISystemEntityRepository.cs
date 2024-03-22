using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.SystemEntityRepository
{
    public interface ISystemEntityRepository:IGenericRepository<SystemEntity>
    {
        SystemEntity GetById(long id);

    }
   
}
