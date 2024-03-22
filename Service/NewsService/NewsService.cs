using log4net;
using Model.IdentityEntities;
using Model.Entities;
using Repository;
using Repository.NewsRepository;
using Service.NewsService.Dto;
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



namespace Service.NewsService
{
    public class NewsService : EntityService<News>, INewsService
    {
        IUnitOfWork _unitOfWork;
        INewsRepository _NewsRepository;
        ILog _loger;
        IMapper _mapper;


        public NewsService(IUnitOfWork unitOfWork,
        INewsRepository NewsRepository,
        ILog loger,
                IMapper mapper
            )
            : base(unitOfWork, NewsRepository)
        {
            _unitOfWork = unitOfWork;
            _NewsRepository = NewsRepository;
            _loger = loger;
            _mapper = mapper;


        }


        public PageListResultBO<NewsDto> GetDaTaByPage(NewsSearchDto searchModel, int pageIndex = 1, int pageSize = 20)
        {
            var query = from Newstbl in _NewsRepository.GetAllAsQueryable()

                        select new NewsDto
                        {
                            IsPublish = Newstbl.IsPublish,
                            CategoryId = Newstbl.CategoryId,
                            Title = Newstbl.Title,
                            Status = Newstbl.Status,
                            Description = Newstbl.Description,
                            PublishDate = Newstbl.PublishDate,
                            Content = Newstbl.Content,
                            ImageThumb = Newstbl.ImageThumb,
                            AttachFileData = Newstbl.AttachFileData,
                            IsDelete = Newstbl.IsDelete,
                            CreatedBy = Newstbl.CreatedBy,
                            UpdatedBy = Newstbl.UpdatedBy,
                            CreatedID = Newstbl.CreatedID,
                            UpdatedID = Newstbl.UpdatedID,
                            DeleteId = Newstbl.DeleteId,
                            Id = Newstbl.Id,
                            CreatedDate = Newstbl.CreatedDate,
                            UpdatedDate = Newstbl.UpdatedDate,
                            DeleteTime = Newstbl.DeleteTime

                        };

            if (searchModel != null)
            {
                if (searchModel.IsPublishFilter != null)
                {
                    query = query.Where(x => x.IsPublish == searchModel.IsPublishFilter);
                }
                if (searchModel.CategoryIdFilter != null)
                {
                    query = query.Where(x => x.CategoryId == searchModel.CategoryIdFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.TitleFilter))
                {
                    query = query.Where(x => x.Title.Contains(searchModel.TitleFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.StatusFilter))
                {
                    query = query.Where(x => x.Status.Contains(searchModel.StatusFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.DescriptionFilter))
                {
                    query = query.Where(x => x.Description.Contains(searchModel.DescriptionFilter));
                }
                if (searchModel.PublishDateFilter != null)
                {
                    query = query.Where(x => x.PublishDate == searchModel.PublishDateFilter);
                }
                if (!string.IsNullOrEmpty(searchModel.ContentFilter))
                {
                    query = query.Where(x => x.Content.Contains(searchModel.ContentFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.ImageThumbFilter))
                {
                    query = query.Where(x => x.ImageThumb.Contains(searchModel.ImageThumbFilter));
                }
                if (!string.IsNullOrEmpty(searchModel.AttachFileDataFilter))
                {
                    query = query.Where(x => x.AttachFileData.Contains(searchModel.AttachFileDataFilter));
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
            var resultmodel = new PageListResultBO<NewsDto>();
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

        public List<NewsDto> GetListTinTuc()
        {
            var query = (from Newstbl in _NewsRepository.GetAllAsQueryable().Where(x => x.IsPublish == true)

                         select new NewsDto
                         {
                             IsPublish = Newstbl.IsPublish,
                             CategoryId = Newstbl.CategoryId,
                             Title = Newstbl.Title,
                             Status = Newstbl.Status,
                             Description = Newstbl.Description,
                             PublishDate = Newstbl.PublishDate,
                             Content = Newstbl.Content,
                             ImageThumb = Newstbl.ImageThumb,
                             AttachFileData = Newstbl.AttachFileData,
                             IsDelete = Newstbl.IsDelete,
                             CreatedBy = Newstbl.CreatedBy,
                             UpdatedBy = Newstbl.UpdatedBy,
                             CreatedID = Newstbl.CreatedID,
                             UpdatedID = Newstbl.UpdatedID,
                             DeleteId = Newstbl.DeleteId,
                             Id = Newstbl.Id,
                             CreatedDate = Newstbl.CreatedDate,
                             UpdatedDate = Newstbl.UpdatedDate,
                             DeleteTime = Newstbl.DeleteTime

                         }).OrderBy(x => x.CreatedDate).ToList();

            return query;
        }



        public NewsDto GetDetail(long Id)
        {
            var query = (from Newstbl in _NewsRepository.GetAllAsQueryable().Where(x => x.Id == Id)

                         select new NewsDto
                         {
                             IsPublish = Newstbl.IsPublish,
                             CategoryId = Newstbl.CategoryId,
                             Title = Newstbl.Title,
                             Status = Newstbl.Status,
                             Description = Newstbl.Description,
                             PublishDate = Newstbl.PublishDate,
                             Content = Newstbl.Content,
                             ImageThumb = Newstbl.ImageThumb,
                             AttachFileData = Newstbl.AttachFileData,
                             IsDelete = Newstbl.IsDelete,
                             CreatedBy = Newstbl.CreatedBy,
                             UpdatedBy = Newstbl.UpdatedBy,
                             CreatedID = Newstbl.CreatedID,
                             UpdatedID = Newstbl.UpdatedID,
                             DeleteId = Newstbl.DeleteId,
                             Id = Newstbl.Id,
                             CreatedDate = Newstbl.CreatedDate,
                             UpdatedDate = Newstbl.UpdatedDate,
                             DeleteTime = Newstbl.DeleteTime,

                         }).OrderBy(x => x.CreatedDate).FirstOrDefault();


            return query;
        }

        public News GetById(long id)
        {
            return _NewsRepository.GetById(id);
        }

        public List<NewsDto> GetListData(string type, int max)
        {
            var query = from Newstbl in _NewsRepository.GetAllAsQueryable()
                        where Newstbl.Status == type && Newstbl.IsPublish == true
                        select new NewsDto
                        {
                            IsPublish = Newstbl.IsPublish,
                            CategoryId = Newstbl.CategoryId,
                            Title = Newstbl.Title,
                            Status = Newstbl.Status,
                            Description = Newstbl.Description,
                            PublishDate = Newstbl.PublishDate,
                            Content = Newstbl.Content,
                            ImageThumb = Newstbl.ImageThumb,
                            AttachFileData = Newstbl.AttachFileData,
                            IsDelete = Newstbl.IsDelete,
                            CreatedBy = Newstbl.CreatedBy,
                            UpdatedBy = Newstbl.UpdatedBy,
                            CreatedID = Newstbl.CreatedID,
                            UpdatedID = Newstbl.UpdatedID,
                            DeleteId = Newstbl.DeleteId,
                            Id = Newstbl.Id,
                            CreatedDate = Newstbl.CreatedDate,
                            UpdatedDate = Newstbl.UpdatedDate,
                            DeleteTime = Newstbl.DeleteTime
                        };

            return query.OrderByDescending(x => x.UpdatedDate).Take(max).ToList();
        }
    }
}
