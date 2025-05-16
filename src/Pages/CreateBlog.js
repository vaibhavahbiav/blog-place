import { useEffect, useState, useCallback, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import debounce from 'lodash.debounce';

function CreateBlog() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const blogId = searchParams.get('id');

  const [blog, setBlog] = useState({ title: '', content: '', tags: '' });
  const lastSaved = useRef({ title: '', content: '', tags: '' });


  // editing a blog
  useEffect(() => {
    if (blogId) {
      axios.get(`/api/blogs/${blogId}`, { withCredentials: true })
        .then(res => setBlog({
          title: res.data.title,
          content: res.data.content,
          tags: res.data.tags.join(', ')
        }))
        .catch(() => console.error('Error loading blog'));
    }
  }, [blogId]);

  const handleChange = (field, value) => {
    setBlog(prev => ({ ...prev, [field]: value }));
  };

  // debouncing and auto saving
  const debouncedSave = useCallback(
    debounce(() => {
      saveDraft();
    }, 5000),
    [blog]
  );

  const goto = useNavigate();
  const [hasPublished, setHasPublished] = useState(false);

  useEffect(() => {
    debouncedSave();
    return debouncedSave.cancel;
  }, [blog.title, blog.content, blog.tags]);

  const handlePublish = async () => {
  try {
    const payload = {
      ...blog,
      tags: blog.tags.split(',').map(t => t.trim()),
      status: 'published',
    };

    const endpoint = blogId
      ? `/api/blogs/publish?id=${blogId}`
      : '/api/blogs/publish';

    await axios.post(endpoint, payload, { withCredentials: true });
    toast.success('Blog Published');

    setHasPublished(true);
    setTimeout(() => {
      goto('/blogs');
    }, 1000);
  } catch (err) {
    toast.error('Publish failed');
  }
};


  const saveDraft = async () => {
    const trimmedTags = blog.tags.split(',').map(t => t.trim());
    const current = {
      title: blog.title.trim(),
      content: blog.content.trim(),
      tags: trimmedTags.join(','),
    };

    const last = lastSaved.current;

    if (
      current.title === last.title &&
      current.content === last.content &&
      current.tags === last.tags
    ) {
      return; // skips auto saves...  if no change
    }

    try {
      const payload = { ...blog, tags: trimmedTags };
      const endpoint = blogId ? `/api/blogs/save-draft?id=${blogId}` : '/api/blogs/save-draft';
      await axios.post(endpoint, payload, { withCredentials: true });
      toast('Saved!!');

      lastSaved.current = current;
    } catch (err) {
      toast.error('Auto-save failed!!');
    }
  };


  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 mb-10 lg:mb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">{blogId ? 'Edit Blog' : 'Create Blog'}</h1>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col items-start space-y-2'>
          <label className='text-gray-100 text-xl font-semibold' htmlFor="title">Title</label>
          <input
            className="w-full p-2 border rounded-lg text-sm md:text-base"
            placeholder="enter title..."
            value={blog.title}
            onChange={e => handleChange('title', e.target.value)}
          />
        </div>
        <div className='flex flex-col items-start space-y-2'>
          <label className='text-gray-100 text-xl font-semibold' htmlFor="content">Content</label>
          <ReactQuill
            value={blog.content}
            onChange={(val) => handleChange('content', val)}
            className="bg-white w-full rounded-lg overflow-clip "
          />
        </div>
        <div className='flex flex-col items-start space-y-2'>
          <label className='text-gray-100 text-xl font-semibold' htmlFor="tags">Tags</label>
          <input
            className="w-full p-2 border rounded-lg text-sm md:text-base"
            placeholder="enter tags (use comma to separate)..."
            value={blog.tags}
            onChange={e => handleChange('tags', e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button onClick={saveDraft} className="bg-orange-400 text-white p-2 rounded-lg w-24 shadow-md shadow-gray-900 border-2 border-white hover:bg-orange-500 hover:underline hover:underline-offset-2 hover:transition-colors">Save Draft</button>
          <button onClick={handlePublish} className="bg-green-500 text-white p-2 rounded-lg w-24 shadow-md shadow-gray-900 border-2 border-white hover:bg-green-600 hover:underline hover:underline-offset-32 hover:transition-colors">Publish</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
