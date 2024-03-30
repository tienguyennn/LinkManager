using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.EnvironmentEntityRepository;
using Service.EnvironmentEntityService.Dto;
using Service.Common;
using System.Linq.Dynamic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PagedList;
using AutoMapper;
namespace Service.EnvironmentEntityService
{
    public class EnvironmentEntityService : EntityService<EnvironmentEntity>, IEnvironmentEntityService
    {
        IUnitOfWork _unitOfWork;
        IEnvironmentEntityRepository _EnvironmentEntityRepository;
        ILog _loger;
        IMapper _mapper;



        public EnvironmentEntityService(IUnitOfWork unitOfWork,
        IEnvironmentEntityRepository EnvironmentEntityRepository,
        ILog loger,

                IMapper mapper
            )
            : base(unitOfWork, EnvironmentEntityRepository)
        {
            _unitOfWork = unitOfWork;
            _EnvironmentEntityRepository = EnvironmentEntityRepository;
            _loger = loger;
            _mapper = mapper;



        }

        public PageListResultBO<EnvironmentEntityDto> GetDaTaByPage(EnvironmentEntitySearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from EnvironmentEntitytbl in _EnvironmentEntityRepository.GetAllAsQueryable()

                        select new EnvironmentEntityDto
                        {
                            Id = EnvironmentEntitytbl.Id,
                            CreatedDate = EnvironmentEntitytbl.CreatedDate,
                            CreatedBy = EnvironmentEntitytbl.CreatedBy,
                            CreatedID = EnvironmentEntitytbl.CreatedID,
                            UpdatedDate = EnvironmentEntitytbl.UpdatedDate,
                            UpdatedBy = EnvironmentEntitytbl.UpdatedBy,
                            UpdatedID = EnvironmentEntitytbl.UpdatedID,
                            IsDelete = EnvironmentEntitytbl.IsDelete,
                            DeleteTime = EnvironmentEntitytbl.DeleteTime,
                            DeleteId = EnvironmentEntitytbl.DeleteId,
                            Name = EnvironmentEntitytbl.Name,
                            Code = EnvironmentEntitytbl.Code,
                            Order = EnvironmentEntitytbl.Order,
                            Description = EnvironmentEntitytbl.Description,
                            Active = EnvironmentEntitytbl.Active,

                        };

            if (searchModel != null)
            {
                if (!string.IsNullOrEmpty(searchModel.TenEnvironmentEntityFilter))
                {
                    query = query.Where(x => x.Name.Contains(searchModel.TenEnvironmentEntityFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.MaEnvironmentEntityFilter))
                {
                    query = query.Where(x => x.Code.Contains(searchModel.MaEnvironmentEntityFilter));
                }
                if (searchModel.ThuTuFilter != null)
                {
                    query = query.Where(x => x.Order == searchModel.ThuTuFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.GhiChuFilter))
                {
                    query = query.Where(x => x.Description.Contains(searchModel.GhiChuFilter));
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
            var resultmodel = new PageListResultBO<EnvironmentEntityDto>();
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

        public EnvironmentEntity GetById(long id)
        {
            return _EnvironmentEntityRepository.GetById(id);
        }

        public EnvironmentEntityDto GetDtoById(long id)
        {
            var query = from EnvironmentEntitytbl in _EnvironmentEntityRepository.GetAllAsQueryable().Where(x => x.Id == id)

                        select new EnvironmentEntityDto
                        {
                            Id = EnvironmentEntitytbl.Id,
                            CreatedDate = EnvironmentEntitytbl.CreatedDate,
                            CreatedBy = EnvironmentEntitytbl.CreatedBy,
                            CreatedID = EnvironmentEntitytbl.CreatedID,
                            UpdatedDate = EnvironmentEntitytbl.UpdatedDate,
                            UpdatedBy = EnvironmentEntitytbl.UpdatedBy,
                            UpdatedID = EnvironmentEntitytbl.UpdatedID,
                            IsDelete = EnvironmentEntitytbl.IsDelete,
                            DeleteTime = EnvironmentEntitytbl.DeleteTime,
                            DeleteId = EnvironmentEntitytbl.DeleteId,
                            Name = EnvironmentEntitytbl.Name,
                            Code = EnvironmentEntitytbl.Code,
                            Order = EnvironmentEntitytbl.Order,
                            Description = EnvironmentEntitytbl.Description

                        };


            return query.FirstOrDefault();
        }

        public List<EnvironmentEntityDto> GetEnvironmentEntitySystemEntity()
        {
            var result = (from EnvironmentEntitytbl in _EnvironmentEntityRepository.GetAllAsQueryable()
                          select new EnvironmentEntityDto
                          {
                              Id = EnvironmentEntitytbl.Id,
                              CreatedDate = EnvironmentEntitytbl.CreatedDate,
                              CreatedBy = EnvironmentEntitytbl.CreatedBy,
                              CreatedID = EnvironmentEntitytbl.CreatedID,
                              UpdatedDate = EnvironmentEntitytbl.UpdatedDate,
                              UpdatedBy = EnvironmentEntitytbl.UpdatedBy,
                              UpdatedID = EnvironmentEntitytbl.UpdatedID,
                              IsDelete = EnvironmentEntitytbl.IsDelete,
                              DeleteTime = EnvironmentEntitytbl.DeleteTime,
                              DeleteId = EnvironmentEntitytbl.DeleteId,
                              Name = EnvironmentEntitytbl.Name,
                              Code = EnvironmentEntitytbl.Code,
                              Order = EnvironmentEntitytbl.Order,
                              Description = EnvironmentEntitytbl.Description

                          }).ToList();
            foreach (var item in result)
            {
            }
            return result;
        }
    }
}
