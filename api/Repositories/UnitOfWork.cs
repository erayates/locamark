using locamark.Data;
using locamark.Interfaces;

namespace locamark.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDatabaseContext _context;

        private bool disposed = false;


        // ApplicationDatabaseContext nesnesini alır ve _context alanına atar. Bu, veritabanı bağlamını sınıfın diğer bölümlerinde kullanabilmeyi sağlar.
        public UnitOfWork(ApplicationDatabaseContext context)
        {
            _context = context;
        }

        // Belirli bir türde bir repository almak için kullanılır --> PointRepository,service
        public IGenericRepository<T> Repository<T>() where T : class
        {
            return new GenericRepository<T>(_context);
        }

        // Asenkron olarak veritabanında yapılan değişiklikleri kaydeder.
        
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        // Senkron olarak veritabanında yapılan değişiklikleri kaydeder.
        public void SaveChanges()
        {
            _context.SaveChanges();
        }


        // Bellek sızıntılarını önlemek için kullanılır. Nesne bellekten temizlenir.
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}


