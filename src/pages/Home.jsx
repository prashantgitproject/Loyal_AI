import React, { useState } from "react";
import { useVisionMutation } from "../redux/api/api";
import { useAsyncMutation } from "../hooks/hooks";

function VisionUploader() {
  const [uploadedFile, setUploadedFile] = useState(null);

  const [uploadToVision, isLoading, data] = useAsyncMutation(useVisionMutation);

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!uploadedFile) {
      alert("Please select a file first.");
      return;
    }
    

    const formData = new FormData();
    formData.append("file", uploadedFile);

    await uploadToVision("Uploading and processing image...", formData);
  };

  return (
    <div>
      <h1>Google Vision API Uploader</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Process</button>
      {data?.result && data?.result.map((label) => <p key={label.description}>{label.description} + {label.score}</p>)}
    </div>
  );
}

export default VisionUploader;
