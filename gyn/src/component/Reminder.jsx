// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom v6

// const BackupReminder = () => {
//   const [showReminder, setShowReminder] = useState(false);
//   const navigate = useNavigate(); // useNavigate hook replaces useHistory in v6

//   // Check if today is Friday (5 = Friday)
//   useEffect(() => {
//     const today = new Date();
//     if (today.getDay() === 5) { // 5 is Friday
//       setShowReminder(true);
//     }
//   }, []);

//   const handleGoToDataExport = () => {
//     navigate('/data_export');
//   };

//   // const handleWeekExport = async () => {
//   //   const today = new Date();
//   //   const lastWeek = new Date(today);
//   //   lastWeek.setDate(today.getDate() - 7); // Subtract 7 days to get the date from one week ago

//   //   // Format dates to ISO string format (or any other required format)
//   //   const fromDate = lastWeek.toISOString().split('T')[0]; // Get just the date part (YYYY-MM-DD)
//   //   const toDate = today.toISOString().split('T')[0]; // Get just the date part (YYYY-MM-DD)

//   //   try {
//   //     // Send request to backend with the calculated date range
//   //     const fetchResponse = await axios.post("http://localhost:8081/export-dataa", {
//   //       fromDate: fromDate,
//   //       toDate: toDate,
//   //     });

//   //     const data = fetchResponse.data.data;
      
//   //     // Check if data exists (non-empty array)
//   //     if (data.length === 0) {
//   //       toast.error("No data to export");
//   //     } else {
//   //       const response = await axios.post("http://localhost:8081/export-excel", { data }, {
//   //         responseType: "blob", // Ensures file is downloaded
//   //       });

//   //       const blob = new Blob([response.data]);
//   //       const link = document.createElement("a");
//   //       link.href = window.URL.createObjectURL(blob);
//   //       link.download = "PatientData.xlsx";
//   //       link.click();

//   //       // Hide the reminder after successful export
//   //       setShowReminder(false); // Turn off the reminder
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during backup export:", error);
//   //     toast.error("Failed to export backup data.");
//   //   }
//   // };

//   return (
//     <div>
//       {/* Show the reminder only if it's Friday */}
//       {showReminder && (
//         <div className="fixed top-16 left-0 right-0 bg-red-800 p-1 text-center text-white font-bold z-50">
//           <div className="flex justify-between items-center">
//             {/* Reminder Text */}
//             <p className="mb-0">Reminder: It's Friday! Please backup the data.</p>

//             <button
//               onClick={handleGoToDataExport}
//               className="bg-blue-700 p-1 rounded ml-20"
//             >
//               Go to Data Export
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BackupReminder;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BackupReminder = () => {
  const [showReminder, setShowReminder] = useState(false);
  const navigate = useNavigate();

  // Check if today is Friday (5 = Friday)
  useEffect(() => {
    const today = new Date();
    if (today.getDay() === 5) { // 5 is Friday
      setShowReminder(true);
    }
  }, []);

  const handleCloseReminder = () => {
    setShowReminder(false);
  };

  const handleGoToDataExport = () => {
    navigate('/data_export');
  };

  return (
    <div>
  {/* Show the reminder only if it's Friday */}
  {showReminder && (
    <div className="fixed top-14 left-0 right-0 bg-red-800 p-2 text-center font-bold z-50 rounded-lg">
      <div className="flex justify-between items-center">
        {/* Reminder Text */}
        <p className="ml-12 mb-0 text-m text-white">Reminder: It's Friday! Please backup the data.</p>

        <div className="flex items-center">
          {/* Go to Data Export Button */}
          <button
            onClick={handleGoToDataExport}
            className="text-m bg-blue-700 p-1 rounded ml-4"
          >
            Go to Data Export
          </button>

          {/* Close Button */}
          <button
            onClick={handleCloseReminder}
            className="text-white text-xl ml-4 w-8 h-8 flex items-center justify-center bg-black hover:bg-gray-700 rounded-full"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default BackupReminder;

