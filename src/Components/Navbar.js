import { Link, useLocation } from 'react-router-dom';

function Navbar () {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path ? 'font-semibold text-white underline underline-offset-2' : '';

  return (
    <nav className="w-[50vw] lg:w-[30vw] md:w-fit mx-auto rounded-lg bg-gradient-to-r from-yellow-500 via-30% via-orange-500 to-80% to-red-500 text-gray-100 shadow-md shadow-gray-950 p-0.5">
      <div className='flex flex-col items-center justify-center bg-gray-900 w-full h-full rounded-lg py-1 px-3'>
        <h1 className="text-xl lg:text-2xl tracking-widest md:text-xl font-black uppercase bg-gradient-to-r from-yellow-500 via-30% via-orange-500 to-80% to-red-500 inline-block text-transparent bg-clip-text">Blog Place</h1>
        <div className="flex space-x-4 text-lg">
          <Link to="/blogs" className={`${isActive('/blogs')} hover:underline hover:underline-offset-4 `}>
            Blogs
          </Link>
          <Link to="/create" className={`${isActive('/create')} hover:underline hover:underline-offset-4 `}>
            Create
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
