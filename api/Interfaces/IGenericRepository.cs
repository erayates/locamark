// IGenericRepository.cs
public interface IGenericRepository<T> where T : class
{
    Task<List<T>> GetAllAsync();
    void Delete(T entity);
    Task AddAsync(T entity);
    Task<T> GetByIdAsync(long id);
    void Update(T entity);
}
