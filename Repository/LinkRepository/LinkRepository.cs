using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.LinkRepository
{
    public class LinkRepository : GenericRepository<Link>, ILinkRepository
    {
        public LinkRepository(DbContext context)
            : base(context)
        {

        }
        public Link GetById(long id)
        {
            return FindBy(x => x.Id == id).FirstOrDefault();
        }
        
    }
}
