using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CommerceJsService.Models;
using SelectPdf;


namespace CommerceJsService
{
    public interface ICommerceJsShopping
    {
        HtmlToPdf GetHtmlToPdfObject();
        string GetPageHeader();
        string GetPageFooter();
        string GetShopperInfoString(ShopperInfo shopperInfo);
    }
}
