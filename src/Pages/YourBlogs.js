import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function YourBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios.get('/api/blogs', { withCredentials: true })
      .then(res => setBlogs(res.data))
      .catch(() => toast.error('Error!! Something has gone worng. Could not fetch blogs.'));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?!')) return;
    try {
      await axios.delete(`/api/blogs/${id}`, { withCredentials: true });
      toast.success('Blog deleted!!');
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    } catch {
      toast.error('Delete failed!!');
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };


  return (
    <div className="max-w-5xl mx-auto mt-10 mb-10 lg:mb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">Your Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {blogs.map(blog => (
          <div key={blog.id} className="p-4 border rounded-lg bg-gray-100 shadow-md shadow-gray-900 border-black">
            <h2 className="text-lg font-semibold truncate">{blog.title}</h2>
            <p className=" text-sm mt-1">Status: <span className={`${blog.status === 'draft' ? 'text-orange-500' : ' text-green-500'}`}>{blog.status}</span></p>
            <h2 className="text-sm mt-1">Created at : {formatDate(blog.created_at)}</h2>
            <h2 className="text-sm mt-1">Updated at : {formatDate(blog.updated_at)}</h2>
            <div className="mt-2 flex space-x-3 justify-end">
              <button
                onClick={() => navigate(`/create?id=${blog.id}`)}
                className="p-3 rounded-full hover:bg-yellow-400 text-white text-lg"
              >
                ✍️
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="p-3 rounded-full hover:bg-red-500 text-white text-lg"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourBlogs;
