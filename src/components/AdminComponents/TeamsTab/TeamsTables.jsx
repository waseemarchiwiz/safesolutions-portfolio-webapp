import React from "react";
import { toast } from "react-toastify";
import CustomTable from "@/globals/CustomTable";
import EditTeamModal from "./EditTeamModal";
import apiInstance from "../../../../api-config";

export const TeamsTable = () => {
  const [teamsData, setTeamsData] = React.useState([]);
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const userToken = localStorage.getItem("apiusertoken");

  const fetchData = async () => {
    try {
      const response = await apiInstance.get("/get/team", {
        headers: {
          user_access_token: userToken,
        },
      });
      if (response?.data?.succes) {
        setTeamsData(response?.data?.Teams);
      } else {
        toast.error("Failed to fetch teams");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch teams");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    setSelectedTeam(row);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (row) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the team member "${row.name}"?`
    );
    if (!isConfirmed) return;

    try {
      await apiInstance.delete(`/delete/team/${row?.id}`, {
        headers: { user_access_token: userToken },
      });
      setTeamsData((prevTeams) =>
        prevTeams.filter((team) => team.id !== row.id)
      );
      toast.success("Team member deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete team member");
    }
  };

  const headers = [
    "ID",
    "Image",
    "Name",
    "Role",
    "Github",
    "LinkedIn",
    "Twitter",
  ];
  const data = teamsData.map((team) => ({
    id: team.id,
    Image: (
      <img
        src={`https://safesolution-portfolio-backend-h6a6esaxema6g4hm.eastus-01.azurewebsites.net/${team.image}`}
        alt={team.name}
        width={80}
        className="rounded-[50%]"
      />
    ),
    name: team.name,
    role: team.role,
    githubUrl: team.github,
    linkedin: team.linkedin,
    twitter: team.twitter,
  }));

  return (
    <>
      <CustomTable
        headers={headers}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={5}
      />
      {isEditModalOpen && (
        <EditTeamModal
          team={selectedTeam}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={fetchData}
        />
      )}
    </>
  );
};
