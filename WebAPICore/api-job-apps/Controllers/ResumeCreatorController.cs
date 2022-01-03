using EFCore.DBFirst_SQLTOLINQ_Models;
using EmailService;
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
        private readonly IEmailSender _emailSender;

        public ResumeCreatorController(IResumeCreator resumeCreator,IEmailSender emailSender)
        {
            _resumeCreator = resumeCreator;
            _emailSender = emailSender;
        }

        // create pdf resume as byte[] and display @ browser
        // and attach it as email attachment, but do not store .pdf file on server
        [HttpPost]
        [Route("createResume")]
        public async Task<IActionResult> createResume(MyResume myResume)
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

            // create pdf as byte[] and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();

            // convert byte[] to memory-stream
            MemoryStream stream = new MemoryStream(pdfBytes);
            // create .pdf and attach it as email attachment, but do not store .pdf file on server
            var message = new Message(new string[] { "chicupatel202122@gmail.com" }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
            await _emailSender.SendEmailAsync(message);

            // display resume as byte[] / .pdf @ browser
            return File(pdfBytes, "application/pdf");            
        }     
    }
}
