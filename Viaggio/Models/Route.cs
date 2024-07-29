using System;
namespace Viaggio.Models
{
    public class Route
    {
        public int Id { get; set; }
        public String Title { get; set; } = "";
        //public List<Point> Points { get; } = new();
        public ICollection<Viaggio.Models.Point> Points { get; } = new List<Point>();
        //public ICollection<Point> Points { get; } //might have to initialize to something to avoid cyclic dependency that cannot be fulfilled
    }
    
}

