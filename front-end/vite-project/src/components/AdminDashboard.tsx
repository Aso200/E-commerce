import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/admin/products">Hantera Produkter</Link>
          </li>
          <li>
            <Link to="/admin/orders">Hantera Ordrar</Link>
          </li>
        </ul>
      </nav>
      <div>
        {/* Här kan du inkludera komponenter för att visa översikt och kontroll för både produkter och ordrar */}
        {/* Till exempel, ProductList och OrderList kan inkluderas här */}
      </div>
    </div>
  );
};

export default AdminDashboard;
