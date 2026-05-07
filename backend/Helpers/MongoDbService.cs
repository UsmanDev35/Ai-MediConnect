using MongoDB.Driver;
using Backend.Models;

namespace Backend.Data
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration configuration)
        {
            var connectionString = 
                Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING") 
                ?? configuration["MongoDbSettings:ConnectionString"]
                ?? "mongodb://localhost:27017";

            var databaseName = 
                configuration["MongoDbSettings:DatabaseName"]
                ?? "MediConnectDB";

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        // Generic method 
        public IMongoCollection<T> GetCollection<T>(string collectionName)
        {
            return _database.GetCollection<T>(collectionName);
        }

        // Direct collections
        public IMongoCollection<User> Users => 
            _database.GetCollection<User>("Users");
    }
}