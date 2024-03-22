using Model.IdentityEntities;
using Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
namespace Service.NewsService.Dto
{
    public class NewsImportDto
    {
		[DisplayName("Phát hành")]
public bool? IsPublish { get; set; }
		[DisplayName("")]
public long? CategoryId { get; set; }
		[Required]
[DisplayName("tiêu đề")]
public string Title { get; set; }
		[DisplayName("")]
public string Status { get; set; }
		[DisplayName("Mô tả")]
public string Description { get; set; }
		[DisplayName("")]
public DateTime? PublishDate { get; set; }
		[DisplayName("")]
public string Content { get; set; }
		[DisplayName("Ảnh đại diện")]
public string ImageThumb { get; set; }
		[DisplayName("")]
public string AttachFileData { get; set; }

    }
}