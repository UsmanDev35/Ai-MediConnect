using MongoDB.Driver;

namespace Backend.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

public MongoDbContext(IConfiguration configuration)
{
    // Try getting from Env first, then fallback to Configuration (appsettings.json)
    var connectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING") 
                           ?? configuration["MongoDbSettings:ConnectionString"];
    
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new Exception("CRITICAL: MONGODB_CONNECTION_STRING is missing!");
    }

    var client = new MongoClient(connectionString);
    // Use the DatabaseName from appsettings.json: "MediConnectDB"
    _database = client.GetDatabase(configuration["MongoDbSettings:DatabaseName"]);
}
        public IMongoCollection<Models.User> Users => _database.GetCollection<Models.User>("Users");
    }
}