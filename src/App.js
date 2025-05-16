import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import YourBlogs from './Pages/YourBlogs';
import CreateBlog from './Pages/CreateBlog.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar.js';

function App() {
  return (
    <div className='bg-gray-800 w-screen h-screen'>
      <Router>
        <div className="text-black">
          <ToastContainer position="top-center" autoClose={1000} closeButton="true" />
          <div className='pt-5 md:pt-10'>
            <Navbar />
          </div>
          <main className="py-4 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Navigate to="/blogs" />} />
              <Route path="/blogs" element={<YourBlogs />} />
              <Route path="/create" element={<CreateBlog />} />
            </Routes>
          </main>
        </div>
      </Router>
      <p className='mt-5 text-center font-semibold text-white pb-2 '>made by <span className='text-yellow-400'>Vaibhav</span> with internet of course.</p>
    </div>
  );
}

export default App;
