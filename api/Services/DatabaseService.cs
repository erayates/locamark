using Npgsql;

namespace locamark.Services
{
    public class DatabaseService
    {
        private readonly IConfiguration _configuration;
        private readonly string _connString;

        public DatabaseService(IConfiguration configuration)
        {
            _configuration = configuration;
            _connString = configuration.GetConnectionString("PostgreSqlConnection");
        }

        public NpgsqlConnection GetConnection()
        {
            return new NpgsqlConnection(_connString);   
        }

    }
}
