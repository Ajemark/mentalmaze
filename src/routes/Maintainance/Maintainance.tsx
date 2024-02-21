import { useState } from 'react';

const Maintainance = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(true)

  return (
    <div>
      {/* Conditionally render the MaintenanceComponent based on maintenanceMode */}
      {maintenanceMode ? (
        <div className="flex items-center justify-center h-screen">
          <img src='/underMaintenance.svg' className="w-full h-full object-cover" />
        </div>
      ) : (
        // Your main content goes here
        <h1>Welcome to Your App!</h1>
      )}
    </div>
  );
};

export default Maintainance;
