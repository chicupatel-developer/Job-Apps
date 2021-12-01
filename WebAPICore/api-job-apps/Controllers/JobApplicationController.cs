﻿using EFCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api_job_apps.DTO;


namespace api_job_apps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobApplicationController : ControllerBase
    {
        private APIResponse _response;
        private readonly IJobApplicationRepository _jobAppRepo;

        public JobApplicationController(IJobApplicationRepository jobAppRepo)
        {
            _jobAppRepo = jobAppRepo;
        }


        [HttpPost]
        [Route("addJobApplication")]
        public IActionResult AddJobApplication(JobApplication jobAppData)
        {
            _response = new APIResponse();
            try
            {
                // check for null
                // jobApplication = null;
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

                jobAppData.AppliedOn = DateTime.Now;
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
                // _response.ResponseMessage = "Server Error !";
                _response.ResponseMessage = ex.Message.ToString();
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
    }
}
