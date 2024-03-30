using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.UserLinkRepository
{
    public interface IUserLinkRepository:IGenericRepository<UserLink>
    {
        UserLink GetById(long id);

    }
   
}
