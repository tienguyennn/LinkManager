using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.UserLinkRepository;
using Service.UserLinkService.Dto;
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





namespace Service.UserLinkService
{
    public class UserLinkService : EntityService<UserLink>, IUserLinkService
    {
        IUnitOfWork _unitOfWork;
        IUserLinkRepository _UserLinkRepository;
        private readonly ISystemEntityRepository _systemEntityRepository;
        private readonly IEnvironmentEntityRepository _EnvironmentEntityRepository;
        ILog _loger;
        IMapper _mapper;



        public UserLinkService(IUnitOfWork unitOfWork,
        IUserLinkRepository UserLinkRepository,
        ISystemEntityRepository systemEntityRepository,
        IEnvironmentEntityRepository EnvironmentEntityRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, UserLinkRepository)
        {
            _unitOfWork = unitOfWork;
            _UserLinkRepository = UserLinkRepository;
            this._systemEntityRepository = systemEntityRepository;
            this._EnvironmentEntityRepository = EnvironmentEntityRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<UserLinkDto> GetDaTaByPage(UserLinkSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from UserLinktbl in _UserLinkRepository.GetAllAsQueryable()
                        select new UserLinkDto
                        {
                            Id = UserLinktbl.Id,
                            CreatedDate = UserLinktbl.CreatedDate,
                            CreatedBy = UserLinktbl.CreatedBy,
                            CreatedID = UserLinktbl.CreatedID,
                            UpdatedDate = UserLinktbl.UpdatedDate,
                            UpdatedBy = UserLinktbl.UpdatedBy,
                            UpdatedID = UserLinktbl.UpdatedID,
                            IsDelete = UserLinktbl.IsDelete,
                            DeleteTime = UserLinktbl.DeleteTime,
                            DeleteId = UserLinktbl.DeleteId,
                            UserId = UserLinktbl.UserId,
                            LinkId = UserLinktbl.LinkId,
                        };

            if (searchModel != null)
            {

             

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
            var resultmodel = new PageListResultBO<UserLinkDto>();
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

        public UserLink GetById(long id)
        {
            return _UserLinkRepository.GetById(id);
        }

        public UserLinkDto GetDtoById(long id)
        {
            var query = from UserLinktbl in _UserLinkRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        select new UserLinkDto
                        {
                            Id = UserLinktbl.Id,
                            CreatedDate = UserLinktbl.CreatedDate,
                            CreatedBy = UserLinktbl.CreatedBy,
                            CreatedID = UserLinktbl.CreatedID,
                            UpdatedDate = UserLinktbl.UpdatedDate,
                            UpdatedBy = UserLinktbl.UpdatedBy,
                            UpdatedID = UserLinktbl.UpdatedID,
                            IsDelete = UserLinktbl.IsDelete,
                            DeleteTime = UserLinktbl.DeleteTime,
                            DeleteId = UserLinktbl.DeleteId,
                            UserId = UserLinktbl.UserId,
                            LinkId = UserLinktbl.LinkId,
                        };


            return query.FirstOrDefault();
        }

        public List<UserLinkDto> GetByIds(List<long> ids)
        {
            var query = (from UserLinktbl in _UserLinkRepository.GetAllAsQueryable()
                         where ids.Contains(UserLinktbl.Id)
                         select new UserLinkDto
                         {
                             Id = UserLinktbl.Id,
                             CreatedDate = UserLinktbl.CreatedDate,
                             CreatedBy = UserLinktbl.CreatedBy,
                             CreatedID = UserLinktbl.CreatedID,
                             UpdatedDate = UserLinktbl.UpdatedDate,
                             UpdatedBy = UserLinktbl.UpdatedBy,
                             UpdatedID = UserLinktbl.UpdatedID,
                             IsDelete = UserLinktbl.IsDelete,
                             DeleteTime = UserLinktbl.DeleteTime,
                             DeleteId = UserLinktbl.DeleteId,
                         
                         });
            var result = query.ToList();
            return result;
        }

    }
}
