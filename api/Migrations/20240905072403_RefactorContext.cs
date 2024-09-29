using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace locamark.Migrations
{
    /// <inheritdoc />
    public partial class RefactorContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "98a0f6a0-f12d-491a-a72b-11fa5c6d939b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c7380784-c427-4674-84e4-9f289f0da828");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Geometries",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "11f1100b-b5e1-44d8-83f8-44fa6964acd3", null, "user", "USER" },
                    { "385a7a14-4a75-4e23-88f3-e4a0408dd4cd", null, "admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Geometries_ApplicationUserId",
                table: "Geometries",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Geometries_AspNetUsers_ApplicationUserId",
                table: "Geometries",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Geometries_AspNetUsers_ApplicationUserId",
                table: "Geometries");

            migrationBuilder.DropIndex(
                name: "IX_Geometries_ApplicationUserId",
                table: "Geometries");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "11f1100b-b5e1-44d8-83f8-44fa6964acd3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "385a7a14-4a75-4e23-88f3-e4a0408dd4cd");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Geometries");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "98a0f6a0-f12d-491a-a72b-11fa5c6d939b", null, "admin", "ADMIN" },
                    { "c7380784-c427-4674-84e4-9f289f0da828", null, "user", "USER" }
                });
        }
    }
}
