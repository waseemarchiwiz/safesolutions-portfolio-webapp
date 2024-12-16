import CustomTable from "@/globals/CustomTable";

export const BlogsTable = () => {
  // Implement the taconst headers = ["Name", "Email", "Role", "Joined At"];
  const headers = ["Title", "Category", "Tags", "Content"];
  const data = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      joinedAt: "2022-05-15",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      joinedAt: "2022-07-20",
    },
    // ... more data
  ];
  const handleEdit = (row) => {
    console.log("Edit", row);
  };
  const handleDelete = (row) => {
    console.log("Delete", row);
  };
  return (
    <CustomTable
      headers={headers}
      data={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
      itemsPerPage={5}
    />
  );
};
