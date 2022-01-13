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
using Services.DTO;

namespace api_job_apps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        // file upload location settings from appsettings.json
        private readonly IConfiguration _configuration;

        private APIResponse _response;
        private readonly IJobApplicationRepository _jobAppRepo;

        public JobApplicationController(IConfiguration configuration, IJobApplicationRepository jobAppRepo)
        {
            _jobAppRepo = jobAppRepo;
            _configuration = configuration;
        }


        [HttpPost]
        [Route("addJobApplication")]
        public IActionResult AddJobApplication(JobApplication jobAppData)
        {
            _response = new APIResponse();
            try
            {
                // check for null
                // jobAppData = null;
                if (jobAppData == null)
                {
                    return BadRequest();
                }

                // check for exception
                // throw new Exception();

                // check for ModelState
                // ModelState.AddModelError("error", "ModelState Check!");
                // ModelState.AddModelError("error", "Another ModelState Check!");
                // ModelState.AddModelError("error", "One More Another ModelState Check!");
                                
                if (ModelState.IsValid)
                {
                    _jobAppRepo.AddJobApp(jobAppData);
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Job Applied Successfully !";
                    return Ok(_response);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error !";
                // _response.ResponseMessage = ex.Message.ToString();
                return Ok(_response);
            }
        }

        [HttpGet]
        [Route("getAllJobApps")]
        public IActionResult GetAllJobApps()
        {
            var allJobApps = _jobAppRepo.GetAllJobApps();
            return Ok(allJobApps);
        }

        [HttpGet]
        [Route("getAppStatusTypes")]
        public IActionResult GetAppStatusTypes()
        {
            var appStatusTypes = _jobAppRepo.GetAppStatusTypes();
            return Ok(appStatusTypes);
        }

        [HttpPost]
        [Route("editJobApplication")]
        public IActionResult EditJobApplication(JobApplicationEditVM jobAppData)
        {
            _response = new APIResponse();
            try
            {         
                // check for null
                // jobAppData = null;
                if (jobAppData == null)
                {
                    return BadRequest();
                }

                // check for exception
                // throw new Exception();

                // check for ModelState
                // ModelState.AddModelError("error", "ModelState Check!");
                // ModelState.AddModelError("error", "Another ModelState Check!");
                // ModelState.AddModelError("error", "One More Another ModelState Check!");
                                
                if (ModelState.IsValid)
                {
                    if (_jobAppRepo.EditJobApp(jobAppData) != null)
                    {
                        _response.ResponseCode = 0;
                        _response.ResponseMessage = "Job Edited Successfully !";
                        return Ok(_response);
                    }
                    else
                    {
                        _response.ResponseCode = -1;
                        _response.ResponseMessage = "Data Not Found @ Server !";
                        return Ok(_response);
                    }                
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error !";
                // _response.ResponseMessage = ex.Message.ToString();
                return Ok(_response);
            }
        }


        [HttpGet]
        [Route("viewJobApp/{jobAppId}")]
        public IActionResult ViewJobApp(int jobAppId)
        {
            try
            {
                var jobApp = _jobAppRepo.ViewJobApp(jobAppId);
                return Ok(jobApp);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Service Not Available!");
            }          
        }

        [HttpPost]
        [Route("deleteJobApplication")]
        public IActionResult DeleteJobApplication(JobApplication jobAppData)
        {
            _response = new APIResponse();
            try
            {
                // check for null
                // jobAppData = null;

                // check for exception
                // throw new Exception();

                if (jobAppData == null)
                {
                    return BadRequest("Bad Request!");
                }

                if(_jobAppRepo.DeleteJobApp(jobAppData)) {
                    _response.ResponseCode = 0;
                    _response.ResponseMessage = "Delete Success!";
                    return Ok(_response);
                }
                else
                    return StatusCode(StatusCodes.Status500InternalServerError, "Server Error!");
            }
            catch (Exception ex)
            {             
                return BadRequest("Bad Request!");
            }
        }

        [HttpGet]
        [Route("tractJobAppStatus/{jobAppId}")]
        public IActionResult TractJobAppStatus(int jobAppId)
        {
            try
            {
                // throw new Exception();

                var appStatusLog = _jobAppRepo.TractJobAppStatus(jobAppId);
                return Ok(appStatusLog);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Error !");
            }
        }
    }
}
