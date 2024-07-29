using System;
using System.Diagnostics;
using System.Drawing;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Viaggio.Data;
using Viaggio.Models;

namespace Viaggio.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    private readonly ViaggioContext _context;


    public HomeController(ILogger<HomeController> logger, ViaggioContext context)
    {
        _logger = logger;
        _context = context;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    // POST: HomeController/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create([Bind("Id,Lat,Lng,Index,RouteId")] List<Viaggio.Models.Point> points)
    {

        //here if the model is valid, we need to create a route, loop through the list of models, add each point model
        //to the route, also add the routeId and route to the point, and save everything in the database.
        if (ModelState.IsValid) {

            if (points.ElementAt(0) != null)
            {
                Viaggio.Models.Route route = new Viaggio.Models.Route();
                foreach (var point in points)
                {
                    route.Points.Add(point);
                    //_context.Add(point);
                }

                _context.Add(route);
                await _context.SaveChangesAsync();
                return RedirectToAction("Edit", new { id = route.Id.ToString() });
            }
        }
        //ViewData["RouteId"] = new SelectList(_context.Route, "Id", "Id", point.RouteId);
        //return View(point);
        return View("Index");
    }


    // POST: HomeController/Edit
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit([Bind("Id,Lat,Lng,Index,RouteId")] List<Viaggio.Models.Point> points, string routeId)
    {



        if (ModelState.IsValid) {
            var route = await _context.Route.Include(r => r.Points).FirstOrDefaultAsync(m => m.Id == int.Parse(routeId));
            if(route == null) return View("Index");
            List<Models.Point> deletedRoute = new List<Models.Point>();
            foreach (var point in route.Points) {
                deletedRoute.Add(point);
            }
            foreach (var point in deletedRoute) {
                //_context.Point.Remove(point);
                route.Points.Remove(point);
            }
            if (points.ElementAt(0) != null) {
                
                foreach (var point in points)
                {
                    route.Points.Add(point);
                    //_context.Add(point);
                }
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction("Edit", new { id = route.Id.ToString() });
        }
        
        
        return View("Index");
    }


    public async Task<IActionResult> Edit(string id)
    {

        if (id == null || _context.Route == null)
        {
            return NotFound();
        }

        var route = await _context.Route.Include(r => r.Points).FirstOrDefaultAsync(m => m.Id == int.Parse(id));
        if (route == null)
        {
            return NotFound();
        }

        ViewData["RouteId"] = id;


        foreach (var point in route.Points)
        {
            ViewData[point.Index.ToString()] = (Viaggio.Models.Point) point;
        }

        return View("EditRoute");
    }


    
     


}

