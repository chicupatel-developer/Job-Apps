using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore.Migrations
{
    public partial class connectingjobApplicationjobResume : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JobResumeId",
                table: "JobApplications",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_JobResumeId",
                table: "JobApplications",
                column: "JobResumeId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplications_JobResumes_JobResumeId",
                table: "JobApplications",
                column: "JobResumeId",
                principalTable: "JobResumes",
                principalColumn: "JobResumeId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobApplications_JobResumes_JobResumeId",
                table: "JobApplications");

            migrationBuilder.DropIndex(
                name: "IX_JobApplications_JobResumeId",
                table: "JobApplications");

            migrationBuilder.DropColumn(
                name: "JobResumeId",
                table: "JobApplications");
        }
    }
}
