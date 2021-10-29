import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div className="grid grid-rows-layout layout min-h-screen p-4 bg-gradient-to-br from-green-400 to-blue-500">
      <header className="flex justify-between">
        <div className="branding">Social Media App</div>
        <nav className="flex">
          <Link href="/login">
            <a className="mx-1">Login</a>
          </Link>
          <Link href="/signup">
            <a className="mx-1">SignUp</a>
          </Link>
          <Link href="/">
            <a className="mx-1">Home</a>
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer>footer</footer>
    </div>
  );
};

export default Layout;
