import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <main className="px-4 md:px-20 py-2 ">{children}</main>
    </div>
  );
};

export default Layout;
