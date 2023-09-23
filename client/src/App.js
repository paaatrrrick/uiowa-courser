import { useState, useEffect } from 'react';
import './App.css';
import { constants, getUserAuthToken } from './utils/constants';

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await fetch(`${constants.url}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle successful upload
        console.log('File uploaded successfully');
      } else {
        // Handle upload error
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <div className="h1">
        Home
      </div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}

export default App;
