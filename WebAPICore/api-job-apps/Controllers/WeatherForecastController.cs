using EFCore.DBFirst_SQLTOLINQ_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
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


        /// <summary>
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
        private UWContext uwContext = new UWContext();
        [HttpGet]
        [Route("getUutGrpByDebitCredit_GL_Number")]
        public IEnumerable<LeftJoin_Uut_Uuga> GetUutGrpByDebitCredit_GL_Number()
        {
            List<UutGrpByDebitCredit_GL_Number> datas = new List<UutGrpByDebitCredit_GL_Number>();
            List<UutGrpByDebitCredit_GL_Number> grpByGL_Number_Datas = new List<UutGrpByDebitCredit_GL_Number>();
            List<LeftJoin_Uut_Uuga> joinDatas = new List<LeftJoin_Uut_Uuga>();

            // 1))
            // group by DebitGlNumber
            // SQL
            /*
            	select UUT.Debit_GL_Number as GL_Number, Sum(UUT.Debit_Amount) as Debit_Amount, 0 as Credit_Amount
	            from UUT
	            group by UUT.Debit_GL_Number
            */
            var grpByDebitGlNumber = uwContext.Uut.GroupBy(c => c.DebitGlNumber).
                  Select(g => new
                  {
                      GL_number = g.Key,
                      Debit_Amount = g.Sum(s => s.DebitAmount),
                      Credit_Amount = 0
                  });
            foreach(var f in grpByDebitGlNumber)
            {
                datas.Add(new UutGrpByDebitCredit_GL_Number()
                {
                     GL_Number = f.GL_number,
                      Debit_Amount = (int)f.Debit_Amount,
                       Credit_Amount = f.Credit_Amount
                });
            }

            // 2))
            // group by CreditGlNumber
            // SQL
            /*
            	select UUT.Credit_GL_Number as GL_Number, 0 as Debit_Amount, Sum(UUT.Credit_Amount) as Credit_Amount
	            from UUT
	            group by UUT.Credit_GL_Number 
            */
            var grpByCreditGlNumber = uwContext.Uut.GroupBy(c => c.CreditGlNumber).
                Select(g => new
                {
                    GL_number = g.Key,
                    Debit_Amount = 0,
                    Credit_Amount = g.Sum(s => s.CreditAmount)
                });
            foreach (var f in grpByCreditGlNumber)
            {
                datas.Add(new UutGrpByDebitCredit_GL_Number()
                {
                    GL_Number = f.GL_number,
                    Debit_Amount = f.Debit_Amount,
                    Credit_Amount = (int)f.Credit_Amount
                });
            }


            // 3))
            // [[group by GL_Number, Sum<Debit_Amount>, Sum<Credit_Amount>]] for,,, <outer-query>
            var grpByGL_Number = datas.GroupBy(c => c.GL_Number).
                Select(g => new
                {
                      GL_number = g.Key,
                      Debit_Amount = g.Sum(s => s.Debit_Amount),
                      Credit_Amount = g.Sum(s => s.Credit_Amount)
                });
            foreach (var f in grpByGL_Number)
            {
                grpByGL_Number_Datas.Add(new UutGrpByDebitCredit_GL_Number()
                {
                    GL_Number = f.GL_number,
                    Debit_Amount = f.Debit_Amount,
                    Credit_Amount = f.Credit_Amount
                });
            }


            // 4))
            // join and order by
            var result = from UUT in grpByGL_Number_Datas
                         join UUGA in uwContext.Uuga.ToList() 
                         on UUT.GL_Number.Replace("-", string.Empty) equals UUGA.ChrtAcctNo.ToString()
                         orderby UUT.GL_Number
                         select new
                         {
                             GL_Number = UUT.GL_Number,
                             Debit_Amount = UUT.Debit_Amount,
                             Credit_Amount = UUT.Credit_Amount,
                             Net_Amount = UUT.Debit_Amount - UUT.Credit_Amount,
                             Chrt_Acct_Desc = UUGA.ChrtAcctDesc
                         };
            foreach (var f in result)
            {
                joinDatas.Add(new LeftJoin_Uut_Uuga()
                {
                    GL_Number = f.GL_Number,
                    Chrt_Acct_Desc = f.Chrt_Acct_Desc,
                    Debit_Amount = f.Debit_Amount,
                    Credit_Amount = f.Credit_Amount,
                    Net_Amount = f.Net_Amount
                });
            }

            return joinDatas;          
        } 

    }
    // uwContext
    public class UutGrpByDebitCredit_GL_Number
    {
        public string GL_Number { get; set; }
        public int Debit_Amount { get; set; }
        public int Credit_Amount { get; set; }
    }
    // uwContext
    public class LeftJoin_Uut_Uuga
    {
        public string GL_Number { get; set; }
        public int Debit_Amount { get; set; }
        public int Credit_Amount { get; set; }
        public int Net_Amount { get; set; }
        public string Chrt_Acct_Desc { get; set; }
    }
  
}
