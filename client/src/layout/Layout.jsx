import { useSelector } from "react-redux";
import PublicNavbar from "../components/PublicNavbar";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  const { token } = useSelector((state) => state.admin);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Navbar */}
      {token ? <AdminNavbar /> : <PublicNavbar />}

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
