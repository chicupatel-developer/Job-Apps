using EFCore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace EFCore.Context
{
    public class JobAppsDBContext : DbContext
    {
        public JobAppsDBContext(DbContextOptions<JobAppsDBContext> options) : base(options)
        {
        }

        public DbSet<JobApplication> JobApplications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new JobApplicationConfiguration());
        }
    }
}
