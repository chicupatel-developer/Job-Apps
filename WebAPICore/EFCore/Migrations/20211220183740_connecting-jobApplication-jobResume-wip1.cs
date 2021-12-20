using Microsoft.EntityFrameworkCore.Migrations;

namespace EFCore.Migrations
{
    public partial class connectingjobApplicationjobResumewip1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "JobApplicationId",
                table: "JobResumes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_JobResumes_JobApplicationId",
                table: "JobResumes",
                column: "JobApplicationId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_JobResumes_JobApplications_JobApplicationId",
                table: "JobResumes",
                column: "JobApplicationId",
                principalTable: "JobApplications",
                principalColumn: "JobApplicationId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobResumes_JobApplications_JobApplicationId",
                table: "JobResumes");

            migrationBuilder.DropIndex(
                name: "IX_JobResumes_JobApplicationId",
                table: "JobResumes");

            migrationBuilder.DropColumn(
                name: "JobApplicationId",
                table: "JobResumes");

            migrationBuilder.AddColumn<int>(
                name: "JobResumeId",
                table: "JobApplications",
                type: "int",
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
    }
}
