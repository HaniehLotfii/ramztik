import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
