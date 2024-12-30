import CustomTable from "@/globals/CustomTable";
import apiInstance from "../../../../api-config";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { toast } from "react-hot-toast";

export const ServicesTable = () => {
  const headers = ["ID", "Image", "Title", "Key Points", "Description"];
  const [servicesData, setServicesData] = useState([]);

  const userToken = localStorage.getItem("apiusertoken");

  const fetchServicesData = async () => {
    try {
      const response = await apiInstance.get("/get/service", {
        headers: {
          user_access_token: userToken,
        },
      });
      console.log(response?.data?.services, "services get");
      setServicesData(response?.data?.services);
    } catch (error) {
      console.error("Fetch services error:", error);
      // toast.error("Failed to fetch services");
    }
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  const parseKeyPoints = (keyPoint) => {
    try {
      if (Array.isArray(keyPoint)) {
        return keyPoint;
      }
      if (
        keyPoint &&
        typeof keyPoint === "string" &&
        keyPoint.startsWith("[") &&
        keyPoint.endsWith("]")
      ) {
        return JSON.parse(keyPoint);
      }
      if (keyPoint && typeof keyPoint === "string") {
        return keyPoint.split(",").map((point) => point.trim());
      }
      return [];
    } catch (error) {
      console.error("Error parsing key points:", error);
      return [];
    }
  };

  const data = servicesData.map((row) => {
    return {
      id: row.id,
      image: (
        <img
          src={row.image}
          alt={row.title}
          className="h-12 w-12 object-cover rounded"
        />
      ),
      title: row.title,
      key_points: parseKeyPoints(row.key_point).map((point) => `#${point}`),
      description: row.description,
    };
  });

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

export default ServicesTable;
