import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Modal.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ id, Image }) {
  const [selectedCity, setSelectedCity] = useState('');
  const [imageSrcList, setImageSrcList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [projectName, setprojectName] = useState();
  const [Description, setDescription] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [requiredAmout, setRequiredAmout] = useState();
  const pictureImageTxt = "Choose an image";

  const handleInputChange = (e) => {
    const files = e.target.files;
  
    if (files && files.length > 0) {
      const newImageSrcList = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageSrcList(newImageSrcList);
      // Assuming you want to store an array of files
      setSelectedFiles(files);
  
      // If you want to display the first image
      setImageSrc(files[0]);
  
      // If you want to display multiple images, you may need to loop through the files
      // and render them in your UI
    } else {
      setSelectedFiles(null);
      setImageSrc(null);
    }
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const sendData = (e) => {
    let id = e;
    const formData = new FormData();
    formData.append("projectName", projectName);
    formData.append("amountRequired", requiredAmout);
    formData.append("projectDescription", Description);
    formData.append('projectCategory', selectedCity);
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i])
        formData.append(`image${i + 1}`, selectedFiles[i]);
      }
    }
    // formData.append("image", imageSrc);

    axios
      .post(`https://better-trench-coat-deer.cyclic.app/api/v1/updates/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    handleClose();
    // window.location.reload(true);
  };
  return (
    <div>
      {/* <img src={} alt="" /> */}
      <Button
        style={{ position: "relative", right: "170px" }}
        onClick={handleOpen}
      >
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label htmlFor="" className=" text-black font-bold">
            Project Name :
          </label>
          <input
            onChange={(e) => {
              setprojectName(e.target.value);
            }}
            type="text"
            id="name"
            name="name"
            placeholder="Enter Project Name ."
            class="border border-gray-300 shadow p-3 w-full rounded mb-"
          />

<div  className="my-4" >
<div className="flex" >
        {imageSrcList.map((imageSrc, index) => (
          <label key={index} className="picture" tabIndex="0">
            <span className="picture__image">
              <img src={imageSrc} alt={`Uploaded ${index + 1}`} className="picture__img" />
            </span>
          </label>
        ))}
      </div>
      <input
        type="file"
        name="picture__input"
        id="picture__input"
        onChange={handleInputChange}
        multiple
      />
</div>

          <label for="twitter" class="block mb-2 font-bold text-black">
            Description
          </label>
          {/* <input type="text" id="twitter" name="twitter" placeholder="Put in your fullname." /> */}
          <textarea
            style={{ height: "100px" }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            class="border  border-gray-300 shadow p-3 w-full rounded mb-"
            id=""
            cols="30"
            rows="10"
          ></textarea>

          <div className="flex justify-between">
            <button className="asdasdasdasdasdalojubb1" onClick={handleClose}>
              {" "}
              Close
            </button>
            {/* <Link    to={''} > */}

            <button
              className="asdasdasdasdasdalojubb"
              onClick={() => {
                sendData(id);
              }}
            >
              {" "}
              Save <i class="icon-ok"></i>
            </button>
            {/* </Link> */}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
