using Microsoft.AspNetCore.Mvc;
using PaymentService.Models;

namespace PaymentService.Controllers;

[ApiController]
[Route("api/payments")]
public class PaymentController : ControllerBase
{
    private readonly PaymentDbContext _context;

    public PaymentController(PaymentDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<Payment>> ProcessPayment(Payment payment)
    {
        payment.Status = "Completed"; // Mock payment processing
        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();
        return Ok(payment);
    }
}
