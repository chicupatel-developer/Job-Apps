using EmailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace api_job_apps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UWController : ControllerBase
    {
        private readonly IUWRepository _uwRepo;
        private readonly IEmailSender _emailSender;

        public UWController(IUWRepository uwRepo, IEmailSender emailSender)
        {
            _uwRepo = uwRepo;
            _emailSender = emailSender;
        }

        /// <summary>
        /// 
        /// SQL JOIN -TO- LINQ JOIN
        /// </summary>
        /// Scaffold-DbContext "Server=CHICAAMBICA\SQLExpress;Database=UWContext;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir DBFirst_SQLTOLINQ_Models
        /*        
            select T1.GL_Number,UUGA.Chrt_Acct_Desc, 
            sum(T1.Debit_Amount) as Debit_Amount,
            sum(T1.Credit_Amount) as Credit_Amount,
            sum(T1.Debit_Amount)-sum(T1.Credit_Amount) as Net_Amount
            from 
            (
	            select UUT.Debit_GL_Number as GL_Number, Sum(UUT.Debit_Amount) as Debit_Amount, 0 as Credit_Amount
	            from UUT
	            group by UUT.Debit_GL_Number
	            Union All
	            select UUT.Credit_GL_Number as GL_Number, 0 as Debit_Amount, Sum(UUT.Credit_Amount) as Credit_Amount
	            from UUT
	            group by UUT.Credit_GL_Number ) as T1

            left join UUGA
            on UUGA.Chrt_Acct_No = REPLACE(T1.GL_Number,'-','')

            group by T1.GL_Number, UUGA.Chrt_Acct_Desc
            order by T1.GL_Number
        */
        [HttpGet]
        [Route("getUUTGrp_DebitCredit_GL_Number")]
        public IActionResult GetUutGrpByDebitCredit_GL_Number()
        {
            var data = _uwRepo.GetUutGrpByDebitCredit_GL_Number();
            return Ok(data);
        }


        // user can create csv file from List<UWUser> object and
        // download that csv file as <universityUsers.csv> in browser
        [HttpGet]
        [Route("getUWUsersAsCSV")]
        public IActionResult GetUWUsersAsCSV()
        {
            var builder = new StringBuilder();
            builder.AppendLine("UserId,FirstName,LastName");
            var users = _uwRepo.GetUniversity_Users();
            foreach (var user in users)
            {
                builder.AppendLine($"{user.UserId},{user.FirstName},{user.LastName}");
            }

            return File(Encoding.UTF8.GetBytes(builder.ToString()), "text/csv", "universityUsers.csv");
        }


        // sending email with attachment file .csv
        // runtime create .csv file from c# object and
        // do not store .csv file on server
        [HttpGet]
        [Route("sendEmailWithCSVAttachment")]
        public async Task<string> SendEmailWithCSVAttachmentAsync()
        {
            // c# object creation
            var builder = new StringBuilder();
            builder.AppendLine("UserId,FirstName,LastName");
            var users = _uwRepo.GetUniversity_Users();
            foreach (var user in users)
            {
                builder.AppendLine($"{user.UserId},{user.FirstName},{user.LastName}");
            }
            // string into memory-stream
            MemoryStream usersStream = _emailSender.GenerateStreamFromString(builder.ToString());


            // null = file from server, in this case it is null because we don't create and store file on server
            // usersStream = memory-stream, in this case we will convert momery-stream into byte[] and attach as email-attachment @ _emailSender.SendEmailAsync(message) [process]
            var message = new Message(new string[] { "chicupatel202122@gmail.com" }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, usersStream);
            await _emailSender.SendEmailAsync(message);

            return "Email sent with attachment-file!";
        }

    }
}
