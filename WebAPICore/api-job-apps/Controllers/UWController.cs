using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_job_apps.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UWController : ControllerBase
    {
        private readonly IUWRepository _uwRepo;

        public UWController(IUWRepository uwRepo)
        {
            _uwRepo = uwRepo;
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

    }
}
