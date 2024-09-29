using locamark.Interfaces;
using locamark.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace locamark.Services
{
    public class PointService : IPointService
    {
        private readonly IUnitOfWork _unitOfWork;

        // PointService sınıfı, IUnitOfWork arayüzü üzerinden UnitOfWork nesnesini alır ve bu sayede veritabanı işlemlerini merkezi bir yerden yönetir.
        public PointService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        public async Task<Point> AddPointAsync(Point point)
        {
            var repository = _unitOfWork.Repository<Point>();
            await repository.AddAsync(point);
            await _unitOfWork.SaveChangesAsync();
            return point;
        }

        public async Task<Point> GetPointByIdAsync(long id)
        {
            var repository = _unitOfWork.Repository<Point>();
            var point = await repository.GetByIdAsync(id);
            return point;
        }

        public async Task<IEnumerable<Point>> GetAllPointsAsync()
        {
            var repository = _unitOfWork.Repository<Point>();
            return await repository.GetAllAsync();
        }


        public async Task<Point> UpdatePointAsync(long id, Point updatedPoint)
        {
            var repository = _unitOfWork.Repository<Point>();
            var point = await repository.GetByIdAsync(id);

            repository.Update(point);

            point.Name = updatedPoint.Name;
            point.PointX = updatedPoint.PointX;
            point.PointY = updatedPoint.PointY;

            await _unitOfWork.SaveChangesAsync();
            return point;
        }

        public async Task DeletePointAsync(long id)
        {
            var repository = _unitOfWork.Repository<Point>();
            var point = await repository.GetByIdAsync(id);
            repository.Delete(point);
            await _unitOfWork.SaveChangesAsync();
        }

        public Task<IEnumerable<Point>> GetPointsByNameAsync(string name)
        {
            throw new NotImplementedException();
        }
    }
}
