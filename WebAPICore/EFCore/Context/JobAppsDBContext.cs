﻿using EFCore.Models;
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
        public DbSet<JobResume> JobResumes { get; set; }
        public DbSet<AppStatusLog> AppStatusLog { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new JobApplicationConfiguration());
            modelBuilder.ApplyConfiguration(new JobResumeConfiguration());

            modelBuilder.Entity<JobResume>()
             .HasOne<JobApplication>(p => p.JobApplication)
             .WithOne(s => s.JobResume);

            modelBuilder.Entity<AppStatusLog>()
            .HasOne<JobApplication>(s => s.JobApplication)
            .WithMany(g => g.AppStatusLog)
            .HasForeignKey(s => s.JobApplicationId);
        }
    }
}
