import CustomTable from "@/globals/CustomTable";

export const CareersTable = () => {
    const headers = ["Job Title", "Department", "Location", "Job Type"];
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
  