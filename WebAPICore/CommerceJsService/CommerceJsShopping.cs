using CommerceJsService.Models;
using SelectPdf;
using System;
using System.Collections.Generic;
using System.Text;

namespace CommerceJsService
{
    public class CommerceJsShopping : ICommerceJsShopping
    {
        public HtmlToPdf GetHtmlToPdfObject()
        {
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

            return converter;
        }


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

        public string GetShopperInfoString(ShopperInfo shopperInfo)
        {
            string shopperInfoString = null;

            shopperInfoString = @"
                                <div class='headerDiv'>
                                    <div>" +
                                        "<div>" +
                                            shopperInfo.FirstName + "&nbsp;" + shopperInfo.LastName +
                                        "</div>" +
                                        "Email: " + shopperInfo.Email +
                                    @"</div>  
                                </div>
                                <hr />
                            ";

            return shopperInfoString;
        }
    }
}
