using locamark.Models;

namespace locamark.Interfaces
{
    public interface IPointService
    {
            Task<Point> AddPointAsync(Point point);
            Task<Point> GetPointByIdAsync(long id);
            Task<IEnumerable<Point>> GetAllPointsAsync();
            Task<IEnumerable<Point>> GetPointsByNameAsync(string name);
            Task<Point> UpdatePointAsync(long id, Point updatedPoint);
            Task DeletePointAsync(long id);
    }
}
