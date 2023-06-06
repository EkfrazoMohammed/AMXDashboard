import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './DroupFileInput.css';

// import { ImageConfig } from '../../config/ImageConfig'; 
// import uploadImg from '../../../src/assets/cloud-upload-regular-240.png';

// import uploadImg from '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/assets/cloud-upload-regular-240.png'
import { ImageConfig } from './config/ImageConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DropFileInput = props => {

    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = async (e) => {
        const newFile = e.target.files[0];
        
        if (newFile) {
            const updatedList = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
        // setFileList(newFile);
        // props.onFileChange(newFile);
    }


    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    }

    
    return (
        <>
                          <ToastContainer />

            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    {/* <img src={uploadImg} alt="" /> */}
                    <FontAwesomeIcon icon={faCloudArrowUp} size="2xl" style={{color: "#3670ce",}} />
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" name="file" onChange={onFileDrop}/>
            </div>
            {
                fileList.length > 0 ? (
                    <div className="drop-file-preview">
                        <p style={{color:'white'}} className="drop-file-preview__title">
                            Ready to upload
                            
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                                    <div className="drop-file-preview__item__info">
                                        <p >{item.name}</p>
                                        <p>{item.size}B</p>
                                    </div>
                                    <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;