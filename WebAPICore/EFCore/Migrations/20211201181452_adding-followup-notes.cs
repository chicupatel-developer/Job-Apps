using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore.Migrations
{
    public partial class addingfollowupnotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppStatus",
                table: "JobApplications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FollowUpNotes",
                table: "JobApplications",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppStatus",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "FollowUpNotes",
                table: "JobApplications");
        }
    }
}
