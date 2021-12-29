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


            // Education
            List<Education> educations = new List<Education>();
            educations.Add(new Education()
            {
                 DegreeName="Master of E-Commerce",
                  StartDate = "Oct, 1999",
                   EndDate = "Mar, 2002",
                    UniversityName = "S.P.University",
                     Country = "India",
                     Major = "Computer Programming & Business Management"
            });
            educations.Add(new Education()
            {
                DegreeName = "Bachelor of Engineering",
                StartDate = "Jun, 1993",
                EndDate = "Jul, 1997",
                UniversityName = "S.P.University",
                Country = "India"
            });

            var content = _resumeCreator.GetPageHeader() +
                            _resumeCreator.GetPersonalInfoString(personalInfo) +
                            _resumeCreator.GetTechnicalSkillsString(skills) +
                            _resumeCreator.GetWorkExperienceString(workExps) +
                            _resumeCreator.GetEducationString(educations) +
                            _resumeCreator.GetPageFooter();

            // create pdf and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();
            return File(pdfBytes, "application/pdf");            
        }
    }
}
