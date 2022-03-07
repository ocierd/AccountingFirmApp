using AFA.Data.DataAccess.Context;
using AFA.Data.DataAccess.Repository;
using AFA.Data.DataAccess.Repository.Interfaces;
using AFA.UI.WebApi.AppStart;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAccountingFirmDataContext("name=ConnectionStrings:AccountingFirmDb");

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors(p =>
{
    p.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
});


app.Run();
