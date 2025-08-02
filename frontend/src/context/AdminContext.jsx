import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

   useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const login = (data) => {
     setAdmin(data.user);
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("admin", JSON.stringify(data.user)); // ✅ Save user info
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin"); // ✅ Remove stored user
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};



