using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.LinkRepository
{
    public interface ILinkRepository:IGenericRepository<Link>
    {
        Link GetById(long id);

    }
   
}
