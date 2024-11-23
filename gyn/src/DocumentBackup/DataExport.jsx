
import React, { useState } from "react";
import axios from "axios";
import Nav from '.././Component/Nav.jsx';
import NavBar from '.././Component/NavBar.jsx';

const DataExport = () => {
  const [filterType, setFilterType] = useState("all"); // 'all' or 'single'
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [patientNameOrPhn, setPatientNameOrPhn] = useState("");

  const handleExport = async (type) => {
    try {
      // Fetch filtered data from the backend
      const fetchResponse = await axios.post("http://localhost:8081/export-data", {
        filterType,
        fromDate: filterType === "all" ? fromDate : null,
        toDate: filterType === "all" ? toDate : null,
        patientNameOrPhn: filterType === "single" ? patientNameOrPhn : null,
      });
      const formattedDate = toDate.toString().split('T')[0]; // 'YYYY-MM-DD'
      const data = fetchResponse.data.data;

      if (type === "excel") {
        // Export as Excel
        const response = await axios.post("http://localhost:8081/export-excel", { data }, {
          responseType: "blob", // Ensures file is downloaded
        });
        
        const filename = `PatientData_${formattedDate}.xlsx`;
        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      } else if (type === "pdf") {
        // Export as PDF
        const response = await axios.post("http://localhost:8081/export-pdf", { data }, {
          responseType: "blob", // Ensures file is downloaded
        });
        const filenam = `PatientData_${formattedDate}.pdf`;
        const blob = new Blob([response.data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filenam;
        link.click();
      }
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Export Patient Data</h2>
      <Nav />
      <NavBar />

      {/* Filter Type */}
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Filter Type</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 w-full rounded bg-gray-700 text-white"
        >
          <option value="all">Whole Data</option>
          <option value="single">Single Patient</option>
        </select>
      </div>

      {filterType === "all" ? (
        // Date Range for Whole Data
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 w-full rounded bg-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 w-full rounded bg-gray-700 text-white"
            />
          </div>
        </div>
      ) : (
        // Patient Name or Phone Number for Single Patient
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Patient Name or Phone</label>
          <input
            type="text"
            placeholder="Enter patient name or phone number"
            value={patientNameOrPhn}
            onChange={(e) => setPatientNameOrPhn(e.target.value)}
            className="p-2 w-full rounded bg-gray-700 text-white"
          />
        </div>
      )}

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
  );
};

export default DataExport;