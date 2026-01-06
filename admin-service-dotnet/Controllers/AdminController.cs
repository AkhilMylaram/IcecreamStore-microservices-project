using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Npgsql;
using Microsoft.Extensions.Configuration;

namespace AdminService.Controllers
{
    [ApiController]
    [Route("/api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AdminController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet("/stats")]
        public IActionResult GetStats()
        {
            var usersCount = 0;
            var ordersCount = 0;
            var paymentsCount = 0;

            // Users (auth -> postgres)
            try
            {
                using var pg = new NpgsqlConnection(_config.GetValue<string>("ConnectionStrings:Postgres"));
                usersCount = pg.ExecuteScalar<int>("SELECT COUNT(*) FROM auth_schema.users");
            }
            catch { }

            // Orders (order_db -> postgres)
            try
            {
                using var pg2 = new NpgsqlConnection(_config.GetValue<string>("ConnectionStrings:OrderPostgres"));
                ordersCount = pg2.ExecuteScalar<int>("SELECT COUNT(*) FROM order_schema.orders");
            }
            catch { }

            // Payments (mysql)
            try
            {
                using var my = new MySqlConnection(_config.GetValue<string>("ConnectionStrings:MySql"));
                paymentsCount = my.ExecuteScalar<int>("SELECT COUNT(*) FROM payments");
            }
            catch { }

            return Ok(new { users = usersCount, orders = ordersCount, payments = paymentsCount });
        }

        [HttpGet("/orders")]
        public IActionResult GetOrders()
        {
            try
            {
                using var pg2 = new NpgsqlConnection(_config.GetValue<string>("ConnectionStrings:OrderPostgres"));
                var rows = pg2.Query("SELECT id, user_email as userEmail, total_amount as totalAmount, status, created_at as createdAt FROM order_schema.orders ORDER BY created_at DESC LIMIT 50");
                return Ok(rows);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("/payments")]
        public IActionResult GetPayments()
        {
            try
            {
                using var my = new MySqlConnection(_config.GetValue<string>("ConnectionStrings:MySql"));
                var rows = my.Query("SELECT payment_id as paymentId, order_id as orderId, user_id as userId, payment_status as paymentStatus, transaction_ref as transactionRef, created_at as createdAt FROM payments ORDER BY created_at DESC LIMIT 50");
                return Ok(rows);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}