using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.EnvironmentEntityRepository
{
    public class EnvironmentEntityRepository : GenericRepository<EnvironmentEntity>, IEnvironmentEntityRepository
    {
        public EnvironmentEntityRepository(DbContext context)
            : base(context)
        {

        }
        public EnvironmentEntity GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
