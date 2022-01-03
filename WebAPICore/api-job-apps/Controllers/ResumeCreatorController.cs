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
        [HttpPost]
        [Route("createAndDownloadResume")]
        public IActionResult CreateAndDownloadResume(MyResume myResume)
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
            educations = myResume.Education;

            var content = _resumeCreator.GetPageHeader() +
                            _resumeCreator.GetPersonalInfoString(personalInfo) +
                            _resumeCreator.GetTechnicalSkillsString(skills) +
                            _resumeCreator.GetWorkExperienceString(workExps) +
                            _resumeCreator.GetEducationString(educations) +
                            _resumeCreator.GetPageFooter();

            // create pdf as byte[] and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();    
            return File(pdfBytes, "application/pdf");            
        }
       
        // create pdf resume as byte[] 
        // and attach it as email attachment, but do not store .pdf file on server
        [HttpPost]
        [Route("createAndEmailResume")]
        public async Task<string> createAndEmailResume(MyResume myResume)
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
            educations = myResume.Education;                    

            var content = _resumeCreator.GetPageHeader() +
                            _resumeCreator.GetPersonalInfoString(personalInfo) +
                            _resumeCreator.GetTechnicalSkillsString(skills) +
                            _resumeCreator.GetWorkExperienceString(workExps) +
                            _resumeCreator.GetEducationString(educations) +
                            _resumeCreator.GetPageFooter();

            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();

            // convert byte[] to memory-stream
            MemoryStream stream = new MemoryStream(pdfBytes);
            // create .pdf and attach it as email attachment, but do not store .pdf file on server
            // var message = new Message(new string[] { myResume.EmailMyResumeTo }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
            var message = new Message(new string[] { "chicupatel202122@gmail.com" }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
            await _emailSender.SendEmailAsync(message);

            return "Resume sent in your Email-Attachment! Please check your Email!";
        }
    }
}
