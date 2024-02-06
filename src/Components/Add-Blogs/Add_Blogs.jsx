import { React, useState , useEffect } from "react";
import axios from 'axios';

const Add_Blog = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [imageSrcList, setImageSrcList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [amountRequired, setAmountRequired] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [village, setVillage] = useState("");
  const [cityData, setCityData] = useState([]);

  const handleInputChange = (e) => {
    const files = e.target.files;
  
    if (files && files.length > 0) {
      const newImageSrcList = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageSrcList(newImageSrcList);

      setSelectedFiles(files);
      setImageSrc(files[0]);
    } else {
      setImageSrcList([]);
      setSelectedFiles(null);
      setImageSrc(null);
    }
  };

  const handleAddProject = async () => {
    setValidationErrors({});

    if (!projectName ||  !projectDescription || !imageSrc) {
      setValidationErrors({ message: 'Please fill in all fields' });
      return;
    }

    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('projectDescription', projectDescription);

    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append(`image${i + 1}`, selectedFiles[i]);
      }
    }
    try {
      const response = await axios.post('https://better-trench-coat-deer.cyclic.app/api/v1/AddProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Added Successfully")
      setProjectName('');
      setProjectDescription('');
      setImageSrcList([]);
      console.log(response);
    } catch (error) {
      console.error('Error uploading data:', error);
      setValidationErrors({ message: 'Error uploading data. Please try again later.' });
    }
  };

  return (
    <div  className="container mx-auto">
      <h1  style={{"color" :"#202020"}} className="text-4xl text-center font-bold mb-8">Add Blog</h1>

      {validationErrors.message && (
        <div className="text-red-500 mb-4">{validationErrors.message}</div>
      )}

      <div className="mb-8">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
          Blog Title
        </label>
        <input
          className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="projectName"
          type="text"
          placeholder="Write Blog Title....."
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <label htmlFor="message" className="font-bold block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Blog Image
      </label>
      <div className="flex flex-wrap items-center mb-8">
        {imageSrcList.map((imageSrc, index) => (
          <div key={index} className="w-1/4 p-2">
            <img src={imageSrc} alt={`Uploaded ${index + 1}`} className="max-w-full h-auto" />
          </div>
        ))}
      </div>
      <input
        type="file"
        name="picture__input"
        id="picture__input"
        onChange={handleInputChange}
        multiple
      />

      <label htmlFor="message" className="font-bold block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Blog Content
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write Blogs here..."
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
      ></textarea>

      <button
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddProject}
      >
        Add Blog
      </button>
    </div>
  );
};

export default Add_Blog;
