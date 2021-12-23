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

        [HttpGet]
        [Route("createResume")]
        public IActionResult createResume()
        {
            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();

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


            var content = _resumeCreator.GetPageHeader() + 
                            _resumeCreator.GetHeaderString(header) + 
                            _resumeCreator.GetCoreSkillsString(skills) +
                            _resumeCreator.GetPageFooter();

            // create pdf and display @ browser
            var pdf = converter.ConvertHtmlString(content);
            var pdfBytes = pdf.Save();
            return File(pdfBytes, "application/pdf");
        }
    }
}
