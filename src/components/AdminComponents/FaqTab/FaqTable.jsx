import CustomTable from "@/globals/CustomTable";
import React from "react";


export const FaqsTable = () => {
    const headers = ["Question", "Answer"];
    const data = [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
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
  