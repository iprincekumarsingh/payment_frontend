import React, { useState } from "react";
import axios from "../api/axios";

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setFile(e.target.files[0]);

    console.log(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new window.FormData();
    formData.append("file", file);

    try {
      await axios.post("auth/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadComponent;
