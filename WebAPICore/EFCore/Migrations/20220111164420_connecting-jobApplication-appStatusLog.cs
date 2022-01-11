using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore.Migrations
{
    public partial class connectingjobApplicationappStatusLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppStatusLog",
                columns: table => new
                {
                    AppStatusLogId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppStatus = table.Column<int>(nullable: false),
                    AppStatusChangedOn = table.Column<DateTime>(nullable: false),
                    JobApplicationId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppStatusLog", x => x.AppStatusLogId);
                    table.ForeignKey(
                        name: "FK_AppStatusLog_JobApplications_JobApplicationId",
                        column: x => x.JobApplicationId,
                        principalTable: "JobApplications",
                        principalColumn: "JobApplicationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppStatusLog_JobApplicationId",
                table: "AppStatusLog",
                column: "JobApplicationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppStatusLog");
        }
    }
}
