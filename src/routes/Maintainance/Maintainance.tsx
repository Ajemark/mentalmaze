import { useState } from 'react';

const Maintainance = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(true);

  useEffect(() => {
    // Simulating fetching maintenance status from an API
    const fetchMaintenanceStatus = async () => {
      try {
        // Replace this with actual API call to get maintenance status
        const response = await fetch('https://api.example.com/maintenance-status');
        const data = await response.json();
        setMaintenanceMode(data.isMaintenanceMode);
      } catch (error) {
        console.error('Error fetching maintenance status:', error);
      }
    };

    fetchMaintenanceStatus();
  }, []);

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
