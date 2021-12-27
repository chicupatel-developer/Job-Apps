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

        /*
        [HttpGet]
        [Route("createResume")]
        public IActionResult createResume()
        {
            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();

            // header settings
            converter.Options.DisplayHeader = true;
            converter.Header.DisplayOnFirstPage = true;
            converter.Header.DisplayOnOddPages = true;
            converter.Header.DisplayOnEvenPages = true;
            converter.Header.Height = 50;

            // footer settings
            converter.Options.DisplayFooter = true;
            converter.Footer.DisplayOnFirstPage = true;
            converter.Footer.DisplayOnOddPages = true;
            converter.Footer.DisplayOnEvenPages = true;
            converter.Footer.Height = 75;

            // left and right side margin
            converter.Options.MarginLeft = 50;
            converter.Options.MarginRight = 50;

            // set converter options
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
            converter.Options.WebPageWidth = 1000;
            converter.Options.WebPageHeight = 1414;

            // prepare data
            // incoming from angular
            // Header
            Header header = new Header()
            {
                EmailAddress = "haha @haha.com",
                FirstName = "Ankit",
                LastName = "Patel",
                PhoneNumber = "1234567890"
            };

            // Core Technical Skills List<string>
            List<string> skills = new List<string>();
            skills.Add("C#");
            skills.Add("MVC"); 
            skills.Add("Web API"); 
            skills.Add("Entity Framework");
            skills.Add("SQL Server, T-Sql, Stored Procedures");
            skills.Add("Web Forms, ASMX Web Service, Ajax, WCF");
            skills.Add("Angular");
            skills.Add("React");
            skills.Add("Redux");
            skills.Add("Node JS, Express");
            skills.Add("JSON, Html, CSS, JavaScript, JQuery");

            // WorkExperience
            List<string> jobDetails = new List<string>();
            jobDetails.Add("User can add / edit / view Department");
            jobDetails.Add("User can remove Department");
            jobDetails.Add("Faculty, Course and Assignment are depending on Department");
            jobDetails.Add("before User can remove Department, system displays all possible dependencies");
            jobDetails.Add("when User execute remove Department action, system safely remove first all possible dependencies and finally remove Department itself");
            jobDetails.Add("after un-successful operation, error message is displayed");

            List<WorkExperience> workExps = new List<WorkExperience>();
            workExps.Add(new WorkExperience()
            {
                EmployerName = "CTD Group Of Companies",
                City = "Winnipeg",
                Province = "MB",
                StartDate = "Aug, 2017",
                EndDate = "May, 2020",
                JobDetails = jobDetails
            });
            workExps.Add(new WorkExperience()
            {
                EmployerName = "Git Hub",
                City = "Winnipeg",
                Province = "MB",
                StartDate = "Feb, 2021",
                EndDate = "Till - Date",
                JobDetails = jobDetails
            });
        
            var content = _resumeCreator.GetPageHeader() + 
                            _resumeCreator.GetHeaderString(header) + 
                            _resumeCreator.GetCoreSkillsString(skills) +
                            _resumeCreator.GetWorkExperienceString(workExps) +
                            _resumeCreator.GetPageFooter();

            // create pdf and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();
            return File(pdfBytes, "application/pdf");
        }
        */

        [HttpPost]
        [Route("createResume")]
        public IActionResult createResume(MyResume myResume)
        {
            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();

            // header settings
            converter.Options.DisplayHeader = true;
            converter.Header.DisplayOnFirstPage = true;
            converter.Header.DisplayOnOddPages = true;
            converter.Header.DisplayOnEvenPages = true;
            converter.Header.Height = 50;

            // footer settings
            converter.Options.DisplayFooter = true;
            converter.Footer.DisplayOnFirstPage = true;
            converter.Footer.DisplayOnOddPages = true;
            converter.Footer.DisplayOnEvenPages = true;
            converter.Footer.Height = 75;

            // left and right side margin
            converter.Options.MarginLeft = 50;
            converter.Options.MarginRight = 50;

            // set converter options
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
            converter.Options.WebPageWidth = 1000;
            converter.Options.WebPageHeight = 1414;

            // prepare data
            // incoming from angular
            // Header
            Header header = new Header();
            header = myResume.PersonalInfo;

            // Core Technical Skills List<string>
            List<string> skills = new List<string>();
            skills = myResume.Skills;

            // WorkExperience
            List<WorkExperience> workExps = new List<WorkExperience>();
            workExps = myResume.WorkExperience;        

            var content = _resumeCreator.GetPageHeader() +
                            _resumeCreator.GetHeaderString(header) +
                            _resumeCreator.GetCoreSkillsString(skills) +
                            _resumeCreator.GetWorkExperienceString(workExps) +
                            _resumeCreator.GetPageFooter();

            // create pdf and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();
            return File(pdfBytes, "application/pdf");            
        }
    }
}
