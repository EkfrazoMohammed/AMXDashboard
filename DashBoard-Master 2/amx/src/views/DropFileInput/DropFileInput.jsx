import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './DroupFileInput.css';
import JSZip from 'jszip';
const DropFileInput = ({ onFileChange ,onFolderChange}) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  
  const [folderList, setFolderList] = useState([]);

  // Adds a CSS class when a file is dragged over the component
  const onDragEnter = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.add('dragover');
  };
  
  // Removes the CSS class when a file is dragged out of the component
  const onDragLeave = () => {
    wrapperRef.current.classList.remove('dragover');
  };
  
  // Removes the CSS class when a file is dropped onto the component
  const onDrop = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
    console.log(e.data)
    console.log(files)
    const files = e.dataTransfer.files;
    handleFolders(files);
    console.log(files)
  };


 
  // Handles the file drop event
  const handleFiles = (files) => {
    const updatedList = [...fileList];
    for (let i = 0; i < files.length; i++) {
      updatedList.push(files[i]);
    }
    for (let i = 0; i < files.length; i++) {
      console.log(files[i].webkitRelativePath); // Access the relative path for folders
      console.log(files[i].name); // Access the name of each file/folder
    }
    setFileList(updatedList);
    onFileChange(updatedList);
  };

    // Handles the file drop event
    // const handleFolders = (files) => {
    //   const updatedList = [...fileList];
    //   for (let i = 0; i < files.length; i++) {
    //     updatedList.push(files[i]);
    //   }
    //   for (let i = 0; i < files.length; i++) {
    //     console.log(files[i].webkitRelativePath); // Access the relative path for folders
    //     console.log(files[i].name); // Access the name of each file/folder
    //   }
    //   setFolderList(updatedList);
    //   onFileChange(updatedList);
    // };

    // const uploadFolder = async () => {
    //   if (folderList.length === 0) {
    //     toast.error("No folder selected for upload.");
    //     return;
    //   }
  
    //   const zip = new JSZip();
  
    //   for (const folderFile of folderList) {
    //     const fileContent = await readFileAsArrayBuffer(folderFile);
    //     zip.file(folderFile.webkitRelativePath, fileContent);
    //   }
  
    //   const zipBlob = await zip.generateAsync({ type: "blob" });
  
    //   // Here you can use the zipBlob to upload the ZIP file to your server
    //   handleFolderUpload(zipBlob);
  
    //   setFolderList([]); // Clear the folderList after upload
    // };
  
    // const readFileAsArrayBuffer = (file) => {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onload = (event) => resolve(event.target.result);
    //     reader.onerror = (error) => reject(error);
    //     reader.readAsArrayBuffer(file);
    //   });
    // };
  
    // const handleFolderUpload = async (zipBlob) => {
    //   // Implement your actual upload logic here
    //   console.log("Uploading folder...");
    //   console.log("Zip blob:", zipBlob);
    // };
   
    // const handleFolders = async (files) => {
    //   const zip = new JSZip();
    // console.log(files)
    //   // Create a zip file and add each selected file to it
    //   for (const file of files) {
    //     const arrayBuffer = await file.arrayBuffer();
    //     zip.file(file.name, arrayBuffer);
    //   }
    
    //   // Generate the zip data
    //   const zipData = await zip.generateAsync({ type: 'blob' });
      
    //   console.log(zipData)
    //   // Here you can call the onFolderChange callback with the generated ZIP blob
    //   onFolderChange(zipData);
    // };
    // const handleFolders = async (filess) => {
    //   const selectedFolderName = filess[0].webkitRelativePath.split('/')[0]; // Assuming you selected only one folder
    //   let blobUrl; // Define blobUrl here
    
    //   // Filter out files that are not in the selected folder
    //   const folderData = Array.from(filess).filter((file) => {
    //     return file.webkitRelativePath.startsWith(selectedFolderName + '/');
    //   });
    //   console.log(folderData);
    //   const folderName = folderData[0].webkitRelativePath.split('/')[0];
    //   console.log("Selected Folder Name:", folderName);
    //   const zip = new JSZip();
    
    //   try {
    //     // Create a zip file and add each selected file to it
    //     for (const file of folderData) {
    //       const arrayBuffer = await file.arrayBuffer();
    //       zip.file(file.name, arrayBuffer);
    //     }
    
    //     // Generate the zip data
    //     const zipData = await zip.generateAsync({ type: 'blob' });
    
    //     // Create a Blob URL for the zip data
    //     blobUrl = URL.createObjectURL(zipData);
    
    //     // Here you can call the onFolderChange callback with the generated ZIP blob
    //     onFolderChange(zipData, folderName);
    //   } catch (error) {
    //     console.error("Error creating or handling the ZIP data:", error);
    //   } finally {
    //     // Clean up the Blob URL
    //     if (blobUrl) {
    //       URL.revokeObjectURL(blobUrl);
    //     }
    //   }
    // };
    
    
//   const handleFolders = async (filess) => {
//     const selectedFolderName = filess[0].webkitRelativePath.split('/')[0]; // Assuming you selected only one folder

//     // Filter out files that are not in the selected folder
//     const folderData = Array.from(filess).filter(file => {
//       return file.webkitRelativePath.startsWith(selectedFolderName + '/');
//     });
//     console.log(folderData)
//     const folderName = folderData[0].webkitRelativePath.split('/')[0];
//     console.log("Selected Folder Name:", folderName);
//     const zip = new JSZip();

//     // Create a zip file and add each selected file to it
//     for (const file of folderData) {
//       const arrayBuffer = await file.arrayBuffer();
//       zip.file(file.name, arrayBuffer);
//     }

//     // Generate the zip data
//     const zipData = await zip.generateAsync({ type: 'blob' });
//     console.log(zipData)

//     // Create a Blob URL for the zip data
//     const blobUrl = URL.createObjectURL(zipData);

//     console.log(blobUrl)
   
   
//  // Create a temporary link element for downloading
//  const downloadLink = document.createElement('a');
//  downloadLink.href = blobUrl;
//  downloadLink.download = `zip-${folderName}.zip`;

//  // Simulate a click on the link to trigger the download
//  downloadLink.click();
//  console.log(downloadLink)

//  // Clean up the Blob URL and revoke it
//  URL.revokeObjectURL(blobUrl);
// console.log(zipData)
//  // Here you can call the onFolderChange callback if needed
//  if (typeof onFolderChange === 'function') {
//    onFolderChange(zipData,folderName);
//  }
//   };

// const handleFolders = async (filess) => {
//   const selectedFolderName = filess[0].webkitRelativePath.split('/')[0]; // Assuming you selected only one folder

//   // Filter out files that are not in the selected folder
//   const folderData = Array.from(filess).filter((file) => {
//     return file.webkitRelativePath.startsWith(selectedFolderName + '/');
//   });
//   console.log(folderData);
//   const folderName = folderData[0].webkitRelativePath.split('/')[0];
//   console.log('Selected Folder Name:', folderName);
//   const zip = new JSZip();

//   // Create a zip file and add each selected file to it
//   for (const file of folderData) {
//     const arrayBuffer = await file.arrayBuffer();
//     zip.file(file.name, arrayBuffer);
//   }

//   // Generate the zip data
//   const zipData = await zip.generateAsync({ type: 'blob' });
//   console.log(zipData);

//   // Create a temporary link element for downloading
//   const downloadLink = document.createElement('a');
//   downloadLink.href = URL.createObjectURL(zipData); // Use Blob URL here
//   downloadLink.download = `zip-${folderName}.zip`;

//   // Simulate a click on the link to trigger the download
//   downloadLink.click();

//   // Clean up the Blob URL and revoke it
//   URL.revokeObjectURL(downloadLink.href);
//   console.log(zipData);

//   // Here you can call the onFolderChange callback if needed
//   if (typeof onFolderChange === 'function') {
//     onFolderChange(zipData, folderName);
//   }
// };

const handleFolders = async (filess) => {
  const selectedFolderName = filess[0].webkitRelativePath.split('/')[0]; // Assuming you selected only one folder

  // Filter out files that are not in the selected folder
  const folderData = Array.from(filess).filter((file) => {
    return file.webkitRelativePath.startsWith(selectedFolderName + '/');
  });
  console.log(folderData);
  const folderName = folderData[0].webkitRelativePath.split('/')[0];
  console.log('Selected Folder Name:', folderName);
  const zip = new JSZip();

  // Create a zip file and add each selected file to it
  for (const file of folderData) {
    const arrayBuffer = await file.arrayBuffer();
    zip.file(file.name, arrayBuffer);
  }

  // Generate the zip data
  const zipData = await zip.generateAsync({ type: 'blob' });
  console.log(zipData);

  // Create a File object from the Blob data
  const zipFile = new File([zipData], `${folderName}.zip`, { type: 'application/zip' });

  
//   // Create a temporary link element for downloading
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(zipData); // Use Blob URL here
  downloadLink.download = `zip-${folderName}.zip`;

//   // Simulate a click on the link to trigger the download
  downloadLink.click();

  // Here you can call the onFolderChange callback with the created File object
  if (typeof onFolderChange === 'function') {
    onFolderChange(zipFile, folderName);
  }
};

  // Removes a file from the list
 
 
  const fileRemove = (file) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <ToastContainer />
      <div style={{display:"flex",gap:"1rem",margin:"0 auto"}}>
        {/* <div> */}
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            size="2xl"
            style={{ color: '#3670ce' }}
          />
          <p>Drag & Drop your files here</p>
        </div>
       
     
        <input type="file" name="file" multiple onChange={(e) => handleFiles(e.target.files)} />
      </div>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            size="2xl"
            style={{ color: '#3670ce' }}
          />
          <p>Drag & Drop your Folder here</p>
        </div>
        <input 
         type="file"
        webkitdirectory="true"
        mozdirectory="true"
        directory="true"
        multiple
         onChange={(e) => handleFolders(e.target.files)} />
     
       </div>
      </div>
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <p style={{ color: 'white' }} className="drop-file-preview__title">
            Ready to upload
          </p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={URL.createObjectURL(item)}
                alt=""
                className="drop-file-preview__item__image"
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                {/* <p>{item.size}B</p> */}
                <p>{(item.size/1024).toFixed(2)}KB</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  onFolderChange: PropTypes.func.isRequired,
};

export default DropFileInput;
