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
                                            padding-left: 10px;
                                            padding-top: 10px;
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
                                            padding-bottom: 10px;
                                        }
                                        table, th, td {
                                          padding-right: 30px;
                                        }
                                        .wexpContent{
                                            font-size: 20; 
                                            padding-top:20px;
                                            padding-left:30px;
                                        }   
                                        .wexpDiv{
                                            padding-bottom:10px;
                                            padding-top:10px;
                                            font-size: 25;
                                        }
                                        .jobResLi{
                                            margin-bottom: 7px;
                                        }
                                        .jobResUi{
                                            padding-bottom: 30px;
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
            int counter = 1;
            foreach (var skill in skills)
            {
                if (counter == 1)
                {
                    counter = 2;
                    skillsString.Append(@"<tr class='spaceUnder'><td><b>- </b>" + skill + @"</td>");
                }
                else
                {
                    counter = 1;
                    skillsString.Append(@"<td><b>- </b>" + skill + @"</td></tr>");
                }
            }
            skillsString.Append(@"</table></div>");
            return skillsString.ToString();
        }
  
    
        public string GetWorkExperienceString(List<WorkExperience> workExperiences)
        {
            StringBuilder woExpString = new StringBuilder();

            woExpString.Append(@"<div class='anyContent'>
                                    <u class='sectionHeader'>Work Experience: </u>
                                    <br />
                                    <div class='wexpContent'>
                                        <div class='wexpDiv'>"
                                );

            foreach(var workExperience in workExperiences)
            {
                woExpString.Append(@"<b>Client: " + workExperience.EmployerName + "  -  " + workExperience.City + ", " + workExperience.Province + "</b></div>");
                woExpString.Append(@"<span>");
                woExpString.Append(@"Duration: " + workExperience.StartDate + " - " + workExperience.EndDate + "</span>");
                woExpString.Append(@"<br /><div class='wexpDiv'>");
                woExpString.Append(@"Job Responsibilities: <ul class='jobResUi'>");

                foreach (var jobRes in workExperience.JobDetails)
                {
                    woExpString.Append("<li class='jobResLi'>" + jobRes + "</li>");
                }
                woExpString.Append("</ul>");
            }

           
            woExpString.Append("</div></div></div>");

            return woExpString.ToString();
        }
    }
}
