import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';
import { motion } from "framer-motion";
import CustomButton from '../globals/CustomButton';
 
const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const jobOpenings = [
    {
      title: 'Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'We are looking for a talented software engineer to join our team and build innovative solutions.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Create user-centric design experiences that delight our customers and drive product innovation.'
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Drive our brand strategy and create compelling marketing campaigns across multiple channels.'
    },
    {
      title: 'Customer Support Representative',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Provide exceptional customer support and help our users have the best possible experience.'
    }
  ];

  const departments = [...new Set(jobOpenings.map(job => job.department))];

  const filteredJobs = jobOpenings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment === '' || job.department === selectedDepartment)
  );

  return (
    <div>
      
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://www.cedar.com/wp-content/uploads/2022/06/About-Us-Images-052022-05.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
        }}
      >
        <motion.div
          className="container mx-auto px-6 py-16 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4 text-indigo-500 mt-40">
          Join Our <span className="text-white">Team</span>
          </h1>
          <p className="text-white   text-lg mt-10">
          Join our team and be part of an inspiring journey. Explore opportunities to grow, learn, and make an impact.
          </p>
        </motion.div>
      </div>
    <div className="min-h-screen bg-gray-50 dark:bg-[#18181b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Join Our Team</h1> */}
          <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto">
            We're building something amazing and we want you to be part of it. Explore our open positions and start your career journey with us.
          </p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search job titles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-black  rounded-lg shadow">
            <p className="text-xl text-gray-600 dark:text-white">No jobs found matching your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-black p-6  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white  mb-2">{job.title}</h2>
                <div className="space-y-2 mb-4 text-gray-600 dark:text-white">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-white" />
                    <span>{job.location}</span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-white mb-4">{job.description}</p>
                {/* <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Apply Now
                </button> */}
                <CustomButton  label='Apply Now' />

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
 
    </div>
  );
};

export default Careers;