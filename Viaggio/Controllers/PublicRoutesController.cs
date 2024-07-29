using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace Viaggio.Controllers
{
    public class PublicRoutesController : Controller
    {
        // 
        // GET: /PublicRoutes/
        public IActionResult Index()
        {
            return View();
        }
        // 
        // GET: /PublicRoutes/Route/ 
        public IActionResult Route(string name="", int numTimes = 1)
        {

            ViewData["Message"] = "Hello " + name;
            ViewData["NumTimes"] = numTimes;
            return View();
            //return {string} HtmlEncoder.Default.Encode($"Hello {name}, ID: {ID}"); 
        }


        [HttpPost]
        public String Route(int Index)
        {
            return HtmlEncoder.Default.Encode($"Hello {Index}");

        }



    }
}