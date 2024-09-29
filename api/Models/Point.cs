using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace locamark.Models
{
    public class Point
    {
        public long Id { get; set; }
        public double PointX { get; set; }
        public double PointY { get; set; }
        public string Name { get; set; }
    }
}

