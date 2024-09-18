import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside style={{ width: "250px", background: "#f4f4f4", height: "100vh" }}>
        <nav>
          <ul>
            <li>
              <Link href="/sidebar/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/sidebar/profile">Profile</Link>
            </li>
            {/* Add more links here */}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
};

export default Layout;
