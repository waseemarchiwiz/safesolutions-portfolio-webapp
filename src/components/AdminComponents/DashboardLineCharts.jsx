import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = () => {
  // Sample data - you'd replace this with your actual data
  const data = [
    { month: "Jan", Blogs: 12, Testimonials: 8, Services: 5, Careers: 3 },
    { month: "Feb", Blogs: 19, Testimonials: 12, Services: 6, Careers: 7 },
    { month: "Mar", Blogs: 29, Testimonials: 18, Services: 5, Careers: 9 },
    { month: "Apr", Blogs: 34, Testimonials: 22, Services: 6, Careers: 11 },
    { month: "May", Blogs: 39, Testimonials: 25, Services: 6, Careers: 12 },
    { month: "Jun", Blogs: 42, Testimonials: 28, Services: 6, Careers: 12 },
  ];

  // Custom tooltip for more detailed information
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-200">
          <p className="font-bold text-gray-600 mb-2">{label}</p>
          {payload?.map((entry) => (
            <div
              key={entry.name}
              className="flex items-center justify-between"
              style={{ color: entry.color }}
            >
              <span className="mr-2">{entry.name}:</span>
              <span className="font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white w-[98%] shadow-lg rounded-3xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[30px]">Monthly Performance Trends</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Last 6 Months</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f3f4f6"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            className="text-gray-500"
          />
          <YAxis axisLine={false} tickLine={false} className="text-gray-500" />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={50} iconType="circle" />

          <Line
            type="monotone"
            dataKey="Blogs"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, fill: "white", stroke: "#3b82f6" }}
            activeDot={{
              r: 8,
              strokeWidth: 2,
              fill: "#3b82f6",
              stroke: "white",
            }}
          />
          <Line
            type="monotone"
            dataKey="Testimonials"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, fill: "white", stroke: "#8b5cf6" }}
            activeDot={{
              r: 8,
              strokeWidth: 2,
              fill: "#8b5cf6",
              stroke: "white",
            }}
          />
          <Line
            type="monotone"
            dataKey="Services"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, fill: "white", stroke: "#10b981" }}
            activeDot={{
              r: 8,
              strokeWidth: 2,
              fill: "#10b981",
              stroke: "white",
            }}
          />
          <Line
            type="monotone"
            dataKey="Careers"
            stroke="#f43f5e"
            strokeWidth={3}
            dot={{ r: 6, strokeWidth: 2, fill: "white", stroke: "#f43f5e" }}
            activeDot={{
              r: 8,
              strokeWidth: 2,
              fill: "#f43f5e",
              stroke: "white",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
