import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from '.././Component/Nav.jsx';
import NavBar from '.././Component/NavBar.jsx';
import Footer from '../Component/Footer.jsx';
import Chatbot from '../Component/Chatbot.jsx';
import { toast } from 'react-toastify';


const DataExport = () => {
  const [filterType, setFilterType] = useState("all"); // 'all' or 'single'
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [patientNameOrPhn, setPatientNameOrPhn] = useState("");
  const [recordCount, setRecordCount] = useState(0); // To store record count
  const [lastBackupDate, setLastBackupDate] = useState('');
  const [lastBackupTime, setLastBackupTime] = useState('');

  // Function to fetch the last backup date and time
  const fetchLastBackupDate = async () => {
    try {
      const response = await axios.get('http://localhost:5000/export/last-backup');
      const fullBackupDate = response.data.lastBackupDate;

      // Convert UTC string to local time
      if (fullBackupDate) {
        const dateObj = new Date(fullBackupDate); // Create a Date object from the UTC string

        // Get the local date and time in a specific format
        const date = dateObj.toLocaleDateString(); // Returns the local date as 'MM/DD/YYYY'
        const time = dateObj.toLocaleTimeString(); // Returns the local time as 'HH:MM:SS AM/PM'

        setLastBackupDate(date); // Date part
        setLastBackupTime(time);
      }
    } catch (error) {
      console.error('Error fetching last backup date:', error);
    }
  };

  // Fetch record count based on filters
  const fetchRecordCount = async () => {
    try {
      const fetchResponse = await axios.post("http://localhost:5000/export/export-data", {
        filterType,
        fromDate: (filterType === "all" || filterType === "admission" || filterType === "visit") ? fromDate : null,
        toDate: (filterType === "all" || filterType === "admission" || filterType === "visit") ? toDate : null,
        patientNameOrPhn: filterType === "single" ? patientNameOrPhn : null,
      });

      // Set the record count based on the response
      setRecordCount(fetchResponse.data.count);  // Assuming the backend returns { count: number }
      console.log(fetchResponse.data.count)
    } catch (error) {
      console.error("Error fetching record count:", error);
    }
  };

  // Function to validate if To Date is greater than From Date
  const validateDates = () => {
    if (new Date(toDate) <= new Date(fromDate)) {
      toast.error("To Date must be greater than From Date");
      setRecordCount(0); // Reset record count when the dates are invalid
    } else {
      fetchRecordCount(); // Call the fetch function when dates are valid
    }
  };

  // Trigger validation when dates or filterType change
  useEffect(() => {
    if (fromDate && toDate) {
      validateDates(); // Validate the dates whenever the filter or dates change
    }
    
    fetchLastBackupDate();
  }, [filterType, fromDate, toDate, patientNameOrPhn]);

  const handleExport = async (type) => {
    if(!(fromDate && toDate)){
      toast.error("Please select a date range");
    }
    try {
      const fetchResponse = await axios.post("http://localhost:5000/export/export-data", {
        filterType,
        fromDate: (filterType === "all" || filterType === "admission" || filterType === "visit") ? fromDate : null,
        toDate: (filterType === "all" || filterType === "admission" || filterType === "visit") ? toDate : null,
        patientNameOrPhn: filterType === "single" ? patientNameOrPhn : null,
      });

      const formattedDate = toDate.toString().split('T')[0]; // 'YYYY-MM-DD'
      const data = fetchResponse.data.data;

      if (type === "excel") {
        const response = await axios.post("http://localhost:5000/export/export-excel", { data }, {
          responseType: "blob", // Ensures file is downloaded
        });
        const filename = `PatientData_${formattedDate}.xlsx`;
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } else if (type === "pdf") {
        const response = await axios.post("http://localhost:5000/export/export-pdf", { data }, {
          responseType: "blob", // Ensures file is downloaded
        });
        const filename = `PatientData_${formattedDate}.pdf`;
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  const handleBackup = async () => {
    try {
      // Send a request to the backend to download the database backup
      const response = await axios.get('http://localhost:5000/export/backup-database', {
        responseType: 'blob',  // Expect a binary file response
      });

      // Create a URL for the blob response and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'database-backup.sql'); // Set the default filename
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error during backup:', error);
      alert('Failed to create database backup');
    }
  };

  return (
   <div className="p-10 bg-gray-800 rounded-xl shadow-lg">
  <h2 className="text-2xl font-semibold text-white mb-10 text-center">Export Patient Data & Backup</h2>
  <Nav />
  <NavBar />

  <div className="flex flex-wrap gap-6">

    {/* Export Patient Data Section */}
    <div className="flex-1 bg-gray-700 rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold text-white mb-4">Export Patient Data</h3>

      {/* Filter Type */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Filter Type</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 w-full rounded bg-gray-600 text-white"
        >
          <option value="all">Whole Data</option>
          <option value="admission">Admission Data</option>
          <option value="visit">Visit Data</option>
          <option value="single">Single Patient</option>
        </select>
      </div>

      {/* Date Range or Patient Info */}
      {filterType === "all" || filterType === "admission" || filterType === "visit" ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 w-full rounded bg-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 w-full rounded bg-gray-600 text-white"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Patient Name or Phone</label>
          <input
            type="text"
            placeholder="Enter patient name or phone number"
            value={patientNameOrPhn}
            onChange={(e) => setPatientNameOrPhn(e.target.value)}
            className="p-2 w-full rounded bg-gray-600 text-white"
          />
        </div>
      )}

      {/* Record Count */}
      <div className="mb-4 text-white">
        <p className="text-white">Record Count: {recordCount}</p>
      </div>

      {/* Export Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => handleExport("excel")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Export as Excel
        </button>
        <button
          onClick={() => handleExport("pdf")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Export as PDF
        </button>
      </div>
    </div>

    {/* Vertical Line Separator */}
    <div className="border-l-2 border-gray-500 mx-4 hidden md:block"></div>

    {/* Backup Database Section */}
    <div className="flex-1 bg-gray-700 rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-semibold text-white mb-4">Backup Database Data</h3>

      {/* Backup Details */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Last Backup Date</label>
        <p className="text-white">{lastBackupDate || "No backups found"}</p>
        
        <label className="block text-gray-300 mb-2 mt-4">Last Backup Time</label>
        <p className="text-white">{lastBackupTime || "No backups found"}</p>
      </div>

      {/* Backup Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleBackup}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
        >
          Backup Database
        </button>
      </div>
    </div>

  </div>

  <Footer />
  <Chatbot />
</div>


  );
};

export default DataExport;
