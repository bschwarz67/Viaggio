using System;
using System.Reflection.Metadata;

namespace Viaggio.Models
{
	public class Point
	{
		public int Id { get; set; }
		public decimal Lat { get; set; }
		public decimal Lng { get; set; }
        public int Index { get; set; }
        public int? RouteId { get; set; }
        public Viaggio.Models.Route? Route { get; set; }


        //these properties can be nullable
        //public int? RouteId { get; set; } // Optional foreign key property
        //public Route? Route { get; set; } // Optional reference navigation to principal
    }
}

