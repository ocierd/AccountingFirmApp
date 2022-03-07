using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository;
using AFA.Data.DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AFA.UI.WebApi.AppStart
{
    public static class StartUpData
    {
        public static void AddAccountingFirmDataContext(this IServiceCollection services, string connectionString)
        {
            services.AddDbContext<AccountingFirmContext>(options => options.UseSqlServer(connectionString));
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();
        }
    }
}