import CustomTable from '@/globals/CustomTable';
import {React} from 'react';

export const TeamsTable = () => {
    const headers = ["Name", "Role", "Github Url"];
    const data = [
      {
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
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
  