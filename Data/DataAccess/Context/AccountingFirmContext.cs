using AFA.Shared.Entities.POCO;
using Microsoft.EntityFrameworkCore;

namespace AFA.Data.DataAccess.Context;
public class AccountingFirmContext : DbContext
{

    public DbSet<Employee> Employees { get; set; }
    public DbSet<Gender> Genders { get; set; }
    public DbSet<CivilStatus> CivilStatus { get; set; }
    public DbSet<Position> Positions { get; set; }

    public AccountingFirmContext(DbContextOptions options)
    : base(options) { }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder
        .Entity<Gender>()
        .ToTable("Gender")
        .HasKey(g => g.GenderId);

        modelBuilder.Entity<CivilStatus>()
        .ToTable("CivilStatus")
        .HasKey(c => c.CivilStatusId);

        modelBuilder.Entity<Position>()
        .ToTable("Position")
        .HasKey(p => p.PositionId);


        modelBuilder.Entity<Employee>(entity =>
        {
            entity.ToTable("Employee")
            .HasKey(e => e.EmployeeId);

            entity
            .HasOne<Gender>(g => g.Gender)
            .WithOne()
            .HasForeignKey<Employee>(e => e.GenderId);

            entity
            .HasOne<CivilStatus>(e => e.CivilStatus)
            .WithOne()
            .HasForeignKey<Employee>(e => e.CivilStatusId);

            entity
            .HasOne<Position>(e => e.Position)
            .WithOne()
            .HasForeignKey<Employee>(e => e.PositionId);
        });





        // alternately this is built-in to EF Core 2.2
        //modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
