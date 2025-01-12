import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <header className="bg-white shadow">
        {/* Add your public header here */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;