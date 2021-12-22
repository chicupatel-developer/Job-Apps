using EFCore.DBFirst_SQLTOLINQ_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SelectPdf;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace api_job_apps.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }


        [HttpGet]
        [Route("htmltopdf")]
        public IActionResult HtmlToPdf()
        {
            // prepare data for resume
            UserProfile user = new UserProfile();        

            // instantiate a html to pdf converter object
            HtmlToPdf converter = new HtmlToPdf();

            // set converter options
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
            converter.Options.WebPageWidth = 1000;
            converter.Options.WebPageHeight = 1414;
            var content = @"<html>
                             <head> 
                                <style>
                                    body {
    
}

.nameDiv{
            text-align: center;
            vertical-align: middle;
            padding: 5px;
            border: 1px solid blueviolet;
            border-radius: 10px;
            background-color: lightseagreen;
            color:black;
            font-size: x-large;  
            width: 300px;
}
                                </style>
                             </head>
                             <body>
                                <div class='nameDiv'>
                                    Ankit Patel
                                </div>
                             </body>
                            </html>
                            ";

            // var pdf = converter.ConvertUrl("https://www.roundthecode.com/");           
            // var pdf = converter.ConvertHtmlString(content);
            
            var pdf = converter.ConvertHtmlString(user.GetResume());
            
            var pdfBytes = pdf.Save();
            return File(pdfBytes, "application/pdf");
        }
    }  

    class UserProfile
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string GetResume()
        {
            FirstName = "Ankit";
            LastName = "Patel";

            string content = @"<html>
                             <head> 
                                <style>
                                    body {   
                                    }
                                    .nameDiv{
                                                text-align: center;
                                                vertical-align: middle;
                                                padding: 5px;
                                                border: 1px solid blueviolet;
                                                border-radius: 10px;
                                                background-color: lightseagreen;
                                                color:black;
                                                font-size: x-large;  
                                                width: 300px;
                                    }
                                </style>
                             </head>
                             <body>
                                <div class='nameDiv'>"+
                                    FirstName + LastName + 
                                    @"                                    
                                </div>
                             </body>
                            </html>
                            ";

            return content;
        }
    }
}
