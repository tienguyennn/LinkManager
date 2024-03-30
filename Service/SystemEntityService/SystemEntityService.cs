using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.SystemEntityRepository;
using Service.SystemEntityService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;


using Repository.EnvironmentEntityRepository;



namespace Service.SystemEntityService
{
    public class SystemEntityService : EntityService<SystemEntity>, ISystemEntityService
    {
        IUnitOfWork _unitOfWork;
        ISystemEntityRepository _SystemEntityRepository;
        ILog _loger;
        IMapper _mapper;
        IEnvironmentEntityRepository _EnvironmentEntityRepository;



        public SystemEntityService(IUnitOfWork unitOfWork,
        ISystemEntityRepository SystemEntityRepository,
        ILog loger,
                IEnvironmentEntityRepository EnvironmentEntityRepository,

                IMapper mapper
            )
            : base(unitOfWork, SystemEntityRepository)
        {
            _unitOfWork = unitOfWork;
            _SystemEntityRepository = SystemEntityRepository;
            _loger = loger;
            _mapper = mapper;
            _EnvironmentEntityRepository = EnvironmentEntityRepository;



        }

        public PageListResultBO<SystemEntityDto> GetDaTaByPage(SystemEntitySearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from SystemEntitytbl in _SystemEntityRepository.GetAllAsQueryable()

                        join EnvironmentEntityId_EnvironmentEntitytbl in _EnvironmentEntityRepository.GetAllAsQueryable()
                        on SystemEntitytbl.EnvironmentId equals EnvironmentEntityId_EnvironmentEntitytbl.Id into jEnvironmentEntityId_EnvironmentEntity
                        from EnvironmentEntityId_EnvironmentEntityInfo in jEnvironmentEntityId_EnvironmentEntity.DefaultIfEmpty()


                        select new SystemEntityDto
                        {
                            Id = SystemEntitytbl.Id,
                            CreatedDate = SystemEntitytbl.CreatedDate,
                            CreatedBy = SystemEntitytbl.CreatedBy,
                            CreatedID = SystemEntitytbl.CreatedID,
                            UpdatedDate = SystemEntitytbl.UpdatedDate,
                            UpdatedBy = SystemEntitytbl.UpdatedBy,
                            UpdatedID = SystemEntitytbl.UpdatedID,
                            IsDelete = SystemEntitytbl.IsDelete,
                            DeleteTime = SystemEntitytbl.DeleteTime,
                            DeleteId = SystemEntitytbl.DeleteId,
                            EnvironmentId = SystemEntitytbl.EnvironmentId,
                            Name = SystemEntitytbl.Name,
                            Active = SystemEntitytbl.Active,
                            Description = SystemEntitytbl.Description,
                            ThuTu = SystemEntitytbl.ThuTu,
                            EnvironmentEntity = EnvironmentEntityId_EnvironmentEntityInfo

                        };

            if (searchModel != null)
            {
                if (searchModel.EnvironmentEntityIdFilter.HasValue)
                {
                    query = query.Where(x => x.EnvironmentId == searchModel.EnvironmentEntityIdFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.TenFilter))
                {
                    query = query.Where(x => x.Name.Contains(searchModel.TenFilter));
                }
             
                if (searchModel.ThuTuFilter != null)
                {
                    query = query.Where(x => x.ThuTu == searchModel.ThuTuFilter);
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
            var resultmodel = new PageListResultBO<SystemEntityDto>();
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

        public SystemEntity GetById(long id)
        {
            return _SystemEntityRepository.GetById(id);
        }

        public SystemEntityDto GetDtoById(long id)
        {
            var query = from SystemEntitytbl in _SystemEntityRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        join EnvironmentEntityId_EnvironmentEntitytbl in _EnvironmentEntityRepository.GetAllAsQueryable()
                        on SystemEntitytbl.EnvironmentId equals EnvironmentEntityId_EnvironmentEntitytbl.Id into jEnvironmentEntityId_EnvironmentEntity
                        from EnvironmentEntityId_EnvironmentEntityInfo in jEnvironmentEntityId_EnvironmentEntity.DefaultIfEmpty()


                        select new SystemEntityDto
                        {
                            Id = SystemEntitytbl.Id,
                            CreatedDate = SystemEntitytbl.CreatedDate,
                            CreatedBy = SystemEntitytbl.CreatedBy,
                            CreatedID = SystemEntitytbl.CreatedID,
                            UpdatedDate = SystemEntitytbl.UpdatedDate,
                            UpdatedBy = SystemEntitytbl.UpdatedBy,
                            UpdatedID = SystemEntitytbl.UpdatedID,
                            IsDelete = SystemEntitytbl.IsDelete,
                            DeleteTime = SystemEntitytbl.DeleteTime,
                            DeleteId = SystemEntitytbl.DeleteId,
                            EnvironmentId = SystemEntitytbl.EnvironmentId,
                            Name = SystemEntitytbl.Name,
                            Active = SystemEntitytbl.Active,
                            Description = SystemEntitytbl.Description,
                            ThuTu = SystemEntitytbl.ThuTu,

                        };


            return query.FirstOrDefault();
        }

        public List<SystemEntityDto> GetByIds(List<long> ids)
        {
            var query = (from SystemEntitytbl in _SystemEntityRepository.GetAllAsQueryable()
                        join EnvironmentEntityId_EnvironmentEntitytbl in _EnvironmentEntityRepository.GetAllAsQueryable()
                        on SystemEntitytbl.EnvironmentId equals EnvironmentEntityId_EnvironmentEntitytbl.Id into jEnvironmentEntityId_EnvironmentEntity
                        from EnvironmentEntityId_EnvironmentEntityInfo in jEnvironmentEntityId_EnvironmentEntity.DefaultIfEmpty()
                        where ids.Contains(SystemEntitytbl.Id)
                        select new SystemEntityDto
                        {
                            Id = SystemEntitytbl.Id,
                            CreatedDate = SystemEntitytbl.CreatedDate,
                            CreatedBy = SystemEntitytbl.CreatedBy,
                            CreatedID = SystemEntitytbl.CreatedID,
                            UpdatedDate = SystemEntitytbl.UpdatedDate,
                            UpdatedBy = SystemEntitytbl.UpdatedBy,
                            UpdatedID = SystemEntitytbl.UpdatedID,
                            IsDelete = SystemEntitytbl.IsDelete,
                            DeleteTime = SystemEntitytbl.DeleteTime,
                            DeleteId = SystemEntitytbl.DeleteId,
                            EnvironmentId = SystemEntitytbl.EnvironmentId,
                            Name = SystemEntitytbl.Name,
                            Active = SystemEntitytbl.Active,
                            Description = SystemEntitytbl.Description,
                            ThuTu = SystemEntitytbl.ThuTu,

                        });
            var result = query.ToList();
            return result;
        }
    }
}
