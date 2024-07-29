using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Viaggio.Models;

namespace Viaggio.Data
{
    public class ViaggioContext : DbContext
    {
        public ViaggioContext (DbContextOptions<ViaggioContext> options)
            : base(options)
        {
        }

        public DbSet<Viaggio.Models.Route> Route { get; set; } = default!;

        public DbSet<Viaggio.Models.Point> Point { get; set; } = default!;
    }
}
