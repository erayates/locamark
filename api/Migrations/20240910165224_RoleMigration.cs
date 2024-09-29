using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace locamark.Migrations
{
    /// <inheritdoc />
    public partial class RoleMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "11f1100b-b5e1-44d8-83f8-44fa6964acd3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "385a7a14-4a75-4e23-88f3-e4a0408dd4cd");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "ce50f9fe-2a5e-4704-9a48-bae908dbe1e3", null, "Admin", "ADMIN" },
                    { "e4db190f-d735-4ea8-908b-ec09229dda3b", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ce50f9fe-2a5e-4704-9a48-bae908dbe1e3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e4db190f-d735-4ea8-908b-ec09229dda3b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "11f1100b-b5e1-44d8-83f8-44fa6964acd3", null, "user", "USER" },
                    { "385a7a14-4a75-4e23-88f3-e4a0408dd4cd", null, "admin", "ADMIN" }
                });
        }
    }
}
