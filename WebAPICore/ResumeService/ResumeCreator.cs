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
        public Header GetHeader()
        {
            Header header = new Header()
            {
                 EmailAddress = "haha @haha.com",
                  FirstName = "Ankit",
                   LastName = "Patel",
                    PhoneNumber = "1234567890"
            };
            return header;
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
    }
}
