using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.SystemEntityRepository
{
    public class SystemEntityRepository : GenericRepository<SystemEntity>, ISystemEntityRepository
    {
        public SystemEntityRepository(DbContext context)
            : base(context)
        {

        }
        public SystemEntity GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
