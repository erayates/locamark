namespace locamark.Interfaces
{
    public interface IUnitOfWork
    {
        IGenericRepository<T> Repository<T>() where T : class;
        void SaveChanges();
        Task SaveChangesAsync();
    }
}
