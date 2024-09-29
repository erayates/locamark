
using locamark.Models;
using Microsoft.AspNetCore.Mvc;

namespace locamark.Interfaces
{
    public interface IPointRepository : IGenericRepository<Point>
    {
        Task<IEnumerable<Point>> GetPointByNameAsync(string name);

    }
}
