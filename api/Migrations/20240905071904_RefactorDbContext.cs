using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace locamark.Migrations
{
    /// <inheritdoc />
    public partial class RefactorDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Geometries_AspNetUsers_ApplicationUserId",
                table: "Geometries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Geometries",
                table: "Geometries");

            migrationBuilder.DropIndex(
                name: "IX_Geometries_ApplicationUserId",
                table: "Geometries");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "288c8d35-6dec-4c97-87c7-08a38c6788be");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f269c151-fc6b-4f64-9485-62611a74ec03");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Geometries");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Geometries",
                table: "Geometries",
                column: "Id");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "98a0f6a0-f12d-491a-a72b-11fa5c6d939b", null, "admin", "ADMIN" },
                    { "c7380784-c427-4674-84e4-9f289f0da828", null, "user", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Geometries_AppUserId",
                table: "Geometries",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Geometries",
                table: "Geometries");

            migrationBuilder.DropIndex(
                name: "IX_Geometries_AppUserId",
                table: "Geometries");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_Geometries",
                table: "Geometries",
                column: "AppUserId");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "288c8d35-6dec-4c97-87c7-08a38c6788be", null, "user", "USER" },
                    { "f269c151-fc6b-4f64-9485-62611a74ec03", null, "admin", "ADMIN" }
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
    }
}
