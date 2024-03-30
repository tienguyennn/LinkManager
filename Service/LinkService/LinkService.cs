using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.LinkRepository;
using Service.LinkService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;
using Service.Constant;
using Service.SystemEntityService;
using Repository.SystemEntityRepository;
using Repository.EnvironmentEntityRepository;
using Repository.UserLinkRepository;





namespace Service.LinkService
{
    public class LinkService : EntityService<Link>, ILinkService
    {
        IUnitOfWork _unitOfWork;
        ILinkRepository _LinkRepository;
        private readonly ISystemEntityRepository _systemEntityRepository;
        private readonly IEnvironmentEntityRepository _EnvironmentEntityRepository;
        private readonly IUserLinkRepository _userLinkRepository;
        ILog _loger;
        IMapper _mapper;



        public LinkService(IUnitOfWork unitOfWork,
        ILinkRepository LinkRepository,
        ISystemEntityRepository systemEntityRepository,
        IEnvironmentEntityRepository EnvironmentEntityRepository,
        IUserLinkRepository userLinkRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, LinkRepository)
        {
            _unitOfWork = unitOfWork;
            _LinkRepository = LinkRepository;
            this._systemEntityRepository = systemEntityRepository;
            this._EnvironmentEntityRepository = EnvironmentEntityRepository;
            this._userLinkRepository = userLinkRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<LinkDto> GetDaTaByPage(LinkSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from Linktbl in _LinkRepository.GetAllAsQueryable()
                        join system in _systemEntityRepository.GetAllAsQueryable()
                        on Linktbl.SystemId equals system.Id
                        join environment in _EnvironmentEntityRepository.GetAllAsQueryable()
                        on system.EnvironmentId equals environment.Id
                        select new LinkDto
                        {
                            Id = Linktbl.Id,
                            CreatedDate = Linktbl.CreatedDate,
                            CreatedBy = Linktbl.CreatedBy,
                            CreatedID = Linktbl.CreatedID,
                            UpdatedDate = Linktbl.UpdatedDate,
                            UpdatedBy = Linktbl.UpdatedBy,
                            UpdatedID = Linktbl.UpdatedID,
                            IsDelete = Linktbl.IsDelete,
                            DeleteTime = Linktbl.DeleteTime,
                            DeleteId = Linktbl.DeleteId,
                            Active = Linktbl.Active,
                            Href = Linktbl.Href,
                            SystemId = Linktbl.SystemId,
                            Name = Linktbl.Name,
                            SystemEntity = system,
                            EnvironmentEntity = environment,
                            Description = Linktbl.Description,
                            Ip = Linktbl.Ip,
                        };

            if (searchModel != null)
            {

                if (searchModel.EnvironmentId.HasValue)
                {
                    query = query.Where(x => x.SystemId == searchModel.EnvironmentId);
                }
                if (!string.IsNullOrEmpty(searchModel.Name))
                {
                    query = query.Where(x => x.Name.ToLower().Contains(searchModel.Name));
                }
                if (!string.IsNullOrEmpty(searchModel.Href))
                {
                    query = query.Where(x => x.Href.ToLower().Contains(searchModel.Href));
                }
                if (searchModel.Active.HasValue)
                {
                    query = query.Where(x => x.Active == searchModel.Active);
                }

                if (!string.IsNullOrEmpty(searchModel.sortQuery))
                {
                    query = query.OrderBy(searchModel.sortQuery);
                }
                else
                {
                    query = query.OrderByDescending(x => x.Id);
                }
            }
            else
            {
                query = query.OrderByDescending(x => x.Id);
            }
            var resultmodel = new PageListResultBO<LinkDto>();
            if (pageSize == -1)
            {
                var dataPageList = query.ToList();
                resultmodel.Count = dataPageList.Count;
                resultmodel.TotalPage = 1;
                resultmodel.ListItem = dataPageList;
            }
            else
            {
                var dataPageList = query.ToPagedList(pageIndex, pageSize);
                resultmodel.Count = dataPageList.TotalItemCount;
                resultmodel.TotalPage = dataPageList.PageCount;
                resultmodel.ListItem = dataPageList.ToList();
            }
            return resultmodel;
        }

        public Link GetById(long id)
        {
            return _LinkRepository.GetById(id);
        }

        public LinkDto GetDtoById(long id)
        {
            var query = from Linktbl in _LinkRepository.GetAllAsQueryable().Where(x => x.Id == id)



                        select new LinkDto
                        {
                            Id = Linktbl.Id,
                            CreatedDate = Linktbl.CreatedDate,
                            CreatedBy = Linktbl.CreatedBy,
                            CreatedID = Linktbl.CreatedID,
                            UpdatedDate = Linktbl.UpdatedDate,
                            UpdatedBy = Linktbl.UpdatedBy,
                            UpdatedID = Linktbl.UpdatedID,
                            IsDelete = Linktbl.IsDelete,
                            DeleteTime = Linktbl.DeleteTime,
                            DeleteId = Linktbl.DeleteId,
                            Active = Linktbl.Active,
                            Href = Linktbl.Href,
                            SystemId = Linktbl.SystemId,
                            Name = Linktbl.Name,
                            Description = Linktbl.Description
                        };


            return query.FirstOrDefault();
        }

        public List<LinkDto> GetByIds(List<long> ids)
        {
            var query = (from Linktbl in _LinkRepository.GetAllAsQueryable()
                         where ids.Contains(Linktbl.Id)
                         select new LinkDto
                         {
                             Id = Linktbl.Id,
                             CreatedDate = Linktbl.CreatedDate,
                             CreatedBy = Linktbl.CreatedBy,
                             CreatedID = Linktbl.CreatedID,
                             UpdatedDate = Linktbl.UpdatedDate,
                             UpdatedBy = Linktbl.UpdatedBy,
                             UpdatedID = Linktbl.UpdatedID,
                             IsDelete = Linktbl.IsDelete,
                             DeleteTime = Linktbl.DeleteTime,
                             DeleteId = Linktbl.DeleteId,
                             Active = Linktbl.Active,
                             Href = Linktbl.Href,
                             SystemId = Linktbl.SystemId,
                             Name = Linktbl.Name,
                         });
            var result = query.ToList();
            return result;
        }

        public List<EnvironmentEntityData> GetData(long? userId)
        {
            var result = new List<EnvironmentEntityData>();
            var envs = _EnvironmentEntityRepository.GetAllAsQueryable().Where(x => x.Active).OrderBy(x => x.Order).ToList();
            var systems = _systemEntityRepository.GetAllAsQueryable().Where(x => x.Active).OrderBy(x => x.ThuTu).ToList();
            var links = _LinkRepository.GetAllAsQueryable().Where(x => x.Active).ToList();
            var userLinks = _userLinkRepository.FindBy(x => x.UserId == userId).Select(x => x.LinkId).ToList();
            foreach (var env in envs)
            {
                var item = new EnvironmentEntityData()
                {
                    SystemEntityDatas = new List<SystemEntityData>(),
                    Environment = env,
                };
                foreach (var system in systems.Where(x => x.EnvironmentId == env.Id))
                {
                    var itemSystem = new SystemEntityData()
                    {
                        SystemEntity = system,
                        Links = links.Where(x => userLinks.Contains(x.Id) && x.SystemId == system.Id).Select(x => new LinkDto()
                        {
                            Name = x.Name,
                            Href = x.Href,
                            Active = x.Active,
                            Description = x.Description,
                            Ip = x.Ip,
                            Id = x.Id,
                        }).ToList()
                    };
                    if (itemSystem.Links.Any())
                    {
                        item.SystemEntityDatas.Add(itemSystem);
                    }
                }
                result.Add(item);
            }
            return result;
        }

        public List<EnvironmentEntityData> GetConfig(long? userId)
        {
            var result = new List<EnvironmentEntityData>();
            var envs = _EnvironmentEntityRepository.GetAllAsQueryable().OrderBy(x => x.Order).ToList();
            var systems = _systemEntityRepository.GetAllAsQueryable().OrderBy(x => x.ThuTu).ToList();
            var links = _LinkRepository.GetAllAsQueryable().ToList();
            var userLinks = _userLinkRepository.Where(x => x.UserId == userId).Select(x => x.LinkId).ToList();
            foreach (var env in envs)
            {
                var item = new EnvironmentEntityData()
                {
                    SystemEntityDatas = new List<SystemEntityData>(),
                    Environment = env,
                };
                foreach (var system in systems.Where(x => x.EnvironmentId == env.Id))
                {
                    var itemSystem = new SystemEntityData()
                    {
                        SystemEntity = system,
                        Links = links.Where(x => x.SystemId == system.Id).Select(x => new LinkDto()
                        {
                            Name = x.Name,
                            Href = x.Href,
                            Active = x.Active,
                            Description = x.Description,
                            Ip = x.Ip,
                            Id = x.Id,
                            Checked = userLinks.Contains(x.Id)
                        }).ToList()
                    };
                    item.SystemEntityDatas.Add(itemSystem);
                }

                result.Add(item);
            }
            return result;
        }
    }
}
