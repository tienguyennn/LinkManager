using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.EnvironmentEntityRepository
{
    public interface IEnvironmentEntityRepository:IGenericRepository<EnvironmentEntity>
    {
        EnvironmentEntity GetById(long id);

    }
   
}
