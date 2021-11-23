using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore.Migrations
{
    public partial class initdbcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "JobApplications",
                columns: table => new
                {
                    JobApplicationId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(nullable: true),
                    AgencyName = table.Column<string>(nullable: true),
                    WebURL = table.Column<string>(nullable: true),
                    ContactPersonName = table.Column<string>(maxLength: 100, nullable: false),
                    ContactEmail = table.Column<string>(nullable: false),
                    PhoneNumber = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: false),
                    Province = table.Column<string>(nullable: false),
                    AppliedOn = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.JobApplicationId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobApplications");
        }
    }
}
