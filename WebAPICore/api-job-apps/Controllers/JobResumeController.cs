using EFCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_job_apps.DTO;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Net.Http.Headers;

namespace api_job_apps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobResumeController : ControllerBase
    {
        // file upload location settings from appsettings.json
        private readonly IConfiguration _configuration;

        private APIResponse _response;
        private readonly IJobResumeRepository _jobResumeRepo;

        public JobResumeController(IConfiguration configuration, IJobResumeRepository jobResumeRepo)
        {
            _jobResumeRepo = jobResumeRepo;
            _configuration = configuration;
        }

        // ok
        // file-upload
        [HttpPost, DisableRequestSizeLimit]
        [Route("upload")]
        public IActionResult Upload([FromForm] ResumeUpload resumeUpload)
        {
            _response = new APIResponse();
            try
            {                
                if(resumeUpload==null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Object Null Error!";
                    return BadRequest(_response);
                }
                if (resumeUpload.JobApplicationId == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Job-Application Object Null Error!";
                    return BadRequest(_response);
                }              

                int jobApplicationId = Int32.Parse(resumeUpload.JobApplicationId);
                // var file = Request.Form.Files[0];
                var file = resumeUpload.ResumeFile;

                string resumeStoragePath = _configuration.GetSection("ResumeUploadLocation").GetSection("Path").Value;

                // unique random number to edit file name
                var guid = Guid.NewGuid();
                var bytes = guid.ToByteArray();
                var rawValue = BitConverter.ToInt64(bytes, 0);
                var inRangeValue = Math.Abs(rawValue) % DateTime.MaxValue.Ticks;

                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), resumeStoragePath);

                // check for 500
                // file = null;

                if (file.Length > 0)
                {
                    var fileName = inRangeValue + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);

                    // file-system store
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    // db store
                    JobResume jobResume = new JobResume()
                    {
                        FileName = fileName,
                        FilePath = pathToSave,
                        JobApplicationId = jobApplicationId
                    };
                    if (_jobResumeRepo.StoreResumeFile(jobResume))
                    {
                        _response.ResponseCode = 0;
                        _response.ResponseMessage = "Resume Upload Success!";
                        return Ok(_response);
                    }
                    else
                    {
                        _response.ResponseCode = -1;
                        _response.ResponseMessage = "Database Error!";
                        return BadRequest(_response);
                    }
                }
                else
                {
                    return BadRequest("Nothing To Upload!");
                }
            }
            catch (FormatException)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Bad Job-Application Object!";
                return BadRequest(_response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Server Error!");
            }
        }

    }
}
