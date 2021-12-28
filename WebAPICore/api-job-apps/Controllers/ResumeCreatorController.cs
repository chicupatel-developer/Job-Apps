using EFCore.DBFirst_SQLTOLINQ_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ResumeService;
using ResumeService.Models;
using SelectPdf;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace api_job_apps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeCreatorController : ControllerBase
    {
        private readonly IResumeCreator _resumeCreator;

        public ResumeCreatorController(IResumeCreator resumeCreator)
        {
            _resumeCreator = resumeCreator;
        }

        [HttpPost]
        [Route("createResume")]
        public IActionResult createResume(MyResume myResume)
        {
            // instantiate a html to pdf converter object
            HtmlToPdf converter = _resumeCreator.GetHtmlToPdfObject();        

            // prepare data
            // incoming from angular
            // Personal Info
            PersonalInfo personalInfo = new PersonalInfo();
            personalInfo = myResume.PersonalInfo;

            // Technical Skills List<string>
            List<string> skills = new List<string>();
            skills = myResume.Skills;

            // Work Experience
            List<WorkExperience> workExps = new List<WorkExperience>();
            workExps = myResume.WorkExperience;        

            var content = _resumeCreator.GetPageHeader() +
                            _resumeCreator.GetPersonalInfoString(personalInfo) +
                            _resumeCreator.GetTechnicalSkillsString(skills) +
                            _resumeCreator.GetWorkExperienceString(workExps) +
                            _resumeCreator.GetPageFooter();

            // create pdf and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();
            return File(pdfBytes, "application/pdf");            
        }
    }
}
