// src/components/AdminPage.tsx
import React from "react";

function AdminPage() {
  return (
    <div>
      <h2>Welcome to the Admin Page</h2>
      <p>
        This is the admin dashboard. You can add your admin-specific content
        here.
      </p>
      {/* Example admin-specific content */}
      <div>
        <h3>Admin Features:</h3>
        <ul>
          <li>Manage Users</li>
          <li>Create Reports</li>
          <li>View Analytics</li>
          {/* Add more admin features here */}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
