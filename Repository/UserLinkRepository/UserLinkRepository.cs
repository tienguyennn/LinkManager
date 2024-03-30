using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.UserLinkRepository
{
    public class UserLinkRepository : GenericRepository<UserLink>, IUserLinkRepository
    {
        public UserLinkRepository(DbContext context)
            : base(context)
        {

        }
        public UserLink GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
