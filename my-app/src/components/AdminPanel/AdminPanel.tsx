import "./AdminPanel.scss";
import AdminHeader from "./AdminHeader/AdminHeader";
import { Outlet } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="admin" style={{ gridColumn: "1/13" }}>
      <AdminHeader />
      <h1>Административная панель</h1>
      <Outlet />
    </div>
  );
}

export default AdminPanel;
