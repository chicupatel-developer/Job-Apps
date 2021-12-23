using ResumeService.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ResumeService
{
    public class ResumeCreator : IResumeCreator
    { 
        public string GetPageHeader()
        {
            string pageHeader = @"<html>
                                 <head> 
                                    <style>
                                        body {
                                        }
                                       
                                        .headerDiv{
                                            text-align: center;
                                            vertical-align: middle; 
                                            margin-top: 70px;
                                            margin-bottom: 30px;
                                        }
                                        .flNameDiv{                                               
                                            font-size: 50px;   
                                            margin-bottom: 20px;
                                        }
                                        .nameDiv{                                               
                                            font-size: 30px;      
                                        }
                                        .anyContent{
                                            padding-left: 50px;
                                            padding-top: 30px;
                                        }
                                        .sectionHeader{
                                            font-size: 30;   
                                            margin-bottom: 10px;
                                        }
                                        .skillsContent{
                                            font-size: 20; 
                                            padding-top:30px;
                                            padding-left:30px;
                                        }
                                       tr.spaceUnder>td {
                                            padding-bottom: 1em;
                                        }
                                    </style>
                                 </head>
                             <body>";
            return pageHeader;
        }
        public string GetPageFooter()
        {
            string pageFooter = @"   </body>
                                   </html>
                                ";
            return pageFooter;
              
        }     
        public string GetHeaderString(Header header)
        {
            string headerString = null;

            headerString = @"
                                <div class='headerDiv'>
                                    <div class='nameDiv'>" + 
                                        "<div class='flNameDiv'>" +
                                            header.FirstName + header.LastName +
                                        "</div>" +
                                        "Email: " + header.EmailAddress + 
                                        @"<br />" +
                                        "Phone: "+header.PhoneNumber + 
                                    @"</div>  
                                </div>
                                <hr />
                            ";

            return headerString;
        }


        /*
        public string GetCoreSkillsString(List<string> skills)
        {
            StringBuilder skillsString = new StringBuilder();
            skillsString.Append(@"<div class='anyContent'>
                                    <u class='sectionHeader'>Technical Skills: </u>
                                    <br />
                                    <ul>"
                                );

            foreach (var skill in skills)
            {
                skillsString.Append(@"<li class='skillsContent'>" + skill+@"</li>");
            }

            skillsString.Append(@"</ul></div>");
            return skillsString.ToString();
        }
        */
        public string GetCoreSkillsString(List<string> skills)
        {
            StringBuilder skillsString = new StringBuilder();
            skillsString.Append(@"<div class='anyContent'>
                                    <u class='sectionHeader'>Technical Skills: </u>
                                    <br />
                                    <table class='skillsContent'>"
                                );

            foreach (var skill in skills)
            {
                skillsString.Append(@"<tr class='spaceUnder'><td>" + skill + @"</td></tr>");
            }

            skillsString.Append(@"</table></div>");
            return skillsString.ToString();
        }
    }
}
