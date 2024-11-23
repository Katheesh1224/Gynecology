import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom v6
import axios from 'axios';
import { toast } from 'react-toastify';

const BackupReminder = () => {
  const [showReminder, setShowReminder] = useState(false);
  const navigate = useNavigate(); // useNavigate hook replaces useHistory in v6
//   const originalDate = Date;
// global.Date = class extends Date {
//   constructor(date) {
//     if (date) {
//       super(date);
//     } else {
//       super('2024-11-23'); // Manually set to any Friday you want (format: YYYY-MM-DD)
//     }
//   }
// };


  useEffect(() => {
    const today = new Date();
    if (today.getDay() === 6) { 
      setShowReminder(true);
    }
  }, []);

  const handleGoToDataExport = () => {
    navigate('/data_export');
  };

  const handleWeekExport = async () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7); // Subtract 7 days to get the date from one week ago

    // Format dates to ISO string format (or any other required format)
    const fromDate = lastWeek.toISOString().split('T')[0]; // Get just the date part (YYYY-MM-DD)
    const toDate = today.toISOString().split('T')[0]; // Get just the date part (YYYY-MM-DD)

    try {
      // Send request to backend with the calculated date range
      const fetchResponse = await axios.post("http://localhost:8081/export-dataa", {
        fromDate: fromDate,
        toDate: toDate,
      });

      const data = fetchResponse.data.data;
      
      // Check if data exists (non-empty array)
      if (data.length === 0) {
        toast.error("No data to export");
      } else {
        const response = await axios.post("http://localhost:8081/export-excel", { data }, {
          responseType: "blob", // Ensures file is downloaded
        });
        const formattedDate = today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      const filename = `PatientData_${formattedDate}.xlsx`;

        const blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        setShowReminder(false); 
      }
    } catch (error) {
      console.error("Error during backup export:", error);
      toast.error("Failed to export backup data.");
    }
  };

  return (
    <div>
      {/* Show the reminder only if it's Friday */}
      {showReminder && (
        <div className="fixed top-16 left-0 right-0 bg-red-800 p-1 text-center text-white font-bold z-50">
          <div className="flex justify-between items-center">
            {/* Reminder Text */}
            <p className="mb-0">Reminder: It's Friday! Please backup the data.</p>

            {/* Button positioned at the right corner on the same line */}
            <button
              onClick={handleWeekExport}
              className="bg-blue-700 p-2 rounded ml-80"
            >
              Backup for this week
            </button>
            <button
              onClick={handleGoToDataExport}
              className="bg-blue-700 p-2 rounded ml-1"
            >
              Go to Data Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupReminder;
