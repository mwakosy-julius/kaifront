import { useState } from "react";
import { Home, Search } from "lucide-react";

// Local imports
import viteLogo from "/vite.svg";
import { Input } from "@/components/ui/input";

const DashboardNavbar = () => {
  return (
    <div className="flex items-center">
      <img
        src={viteLogo}
        alt="Vite logo"
        style={{
          height: "5em",
          padding: "1.5em",
        }}
      />
      <SearchBar />
    </div>
  );
};

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-center flex-1">
      <div className="flex items-center gap-4 w-1/2">
        <div className="bg-glacierGrey/20 dark:text-white p-2 rounded-full cursor-pointer">
          <Home />
        </div>
        <div className="w-full relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full p-2 w-full bg-glacierGrey/20 pl-10 dark:text-white border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
