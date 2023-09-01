/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import axios from "axios";

import storage from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import drone from "../assets/img/drone.webp";
import { ToastContainer, toast } from "react-toastify";
import avatarimage from "../assets/img/anime3.png";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { Tooltip } from 'reactstrap';
import backImage from "../views/assets/images/fileimagesLogo/backImage.png";
function UserProfile() {

  
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [disableButton, setDisableButton] = useState(false);
  const userIdO = localStorage.getItem("user_id");

  const userNameO = localStorage.getItem("user_name").replace(/"/g, "");
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const [newPhoto, setNewPhoto] = useState(null);
  // const local_profile_photo = localStorage.getItem('profile_photo');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(true);

  const handleFileDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      console.log(imagePreview)
    };
    reader.readAsDataURL(selectedFile);
  };

  


  const goBack = () => {
    window.history.back();
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  // const handleUploadPhoto = (selectedFile) => {
  //   // Create a reference to the storage location where you want to store the photo.
  //   const storageRef = ref(storage, "user_photos/" + selectedFile.name);

  //   // Upload the photo to Firebase Storage using the ref.
  //   const uploadTask = uploadBytesResumable(storageRef, selectedFile);

  //   // Listen for state changes, errors, and completion of the upload.
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // You can track the progress of the upload here if needed.
  //       // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       // console.log("Upload is " + progress + "% done");
  //     },
  //     (error) => {
  //       // Handle any errors that occur during the upload.
  //       console.error("Error uploading the photo:", error);
  //     },
  //     () => {
  //       // The upload is complete.
  //       // Get the download URL for the photo and update the state with it.
  //       getDownloadURL(uploadTask.snapshot.ref)
  //         .then((downloadURL) => {
  //           console.log("Photo uploaded. Download URL:", downloadURL);
  //           setUser({
  //             ...user,
  //             photo: downloadURL,
  //           });
  //           setDisableButton(false);
  //           // Now you can use the downloadURL to store it in your data or display the photo on the page.
  //         })
  //         .catch((error) => {
  //           console.error("Error getting download URL:", error);
  //         });
  //     }
  //   );
  // };
  React.useEffect(() => {
    // Save the 'photo' state into 'local_profile_photo' in localStorage
    setNewPhoto(localStorage.getItem("profile_photo"));
  }, [newPhoto]);

  const [user, setUser] = useState({
    user_id: userIdO,
    user_name: "",
    mail: "",
    photo:""
    
  });
  // const handleFileChange = (e) => {
  //     setDisableButton(true);
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   console.log(file)
  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //       console.log(imagePreview)

  //     };
  //     reader.readAsDataURL(selectedFile);
  //     console.log(reader.readAsDataURL)
  //     setData({
  //       ...data,
  //       photo: selectedFile,
  //     });
  //   } else {
  //     setImagePreview(null);
  //   }
  // };
  const handleFileChange = (e) => {
    setDisableButton(true);
    const selectedFile = e.target.files[0];
    console.log(selectedFile)
    setFile(selectedFile);
    console.log(file)

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log("imagepreview==>",reader.result)
      };
      reader.readAsDataURL(selectedFile);
      console.log(reader.readAsDataURL)
      setUser({
        ...user,
        photo: selectedFile, // or photo: null
      });
      setDisableButton(false);
      // reader.readAsDataURL(selectedFile);
      // // If a file is selected, call handleUploadPhoto to upload the photo
      // handleUploadPhoto(selectedFile);
    } else {
      // If no file is selected, set the photo in the state to an empty string or null
      setUser({
        ...user,
        photo: "", // or photo: null
      });
      setImagePreview(null);
    }
  };
  const handleUploadPhoto = async () => {
    if (!file) {
      // No file selected, return or display an error message
      return;
    }
  
    const formData = new FormData();
    formData.append('user_id', userIdO);
    formData.append('photo', file);
  
    try {
      const response = await axios.put(
        `https://fibregrid.amxdrones.com/dronecount/updateuser/${userIdO}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: amxtokenO,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Photo updated successfully:', response.data);
        setNewPhoto(response.data.photo_url);
        toast.success('Profile photo updated successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          icon: <img src={drone} />,
        });
      } else {
        throw new Error('Failed to update profile photo.');
        toast.error('Failed to update profile photo!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          icon: <img src={drone} />,
        });
      }
    } catch (error) {
      console.error('Error updating profile photo:', error);
      toast.error('Failed to update profile photo!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <img src={drone} />,
      });
    }
  };
  

  console.log(user)

  const [errors, setErrors] = useState({
    user_name: false,
    mail: false,
    password: false,
  });
  const changeUserHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });
  const [passworderrors, setPassworderrors] = useState({
    old_password: false,
    new_password: false,
  });
  const changePasswordHandler = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
    setPassworderrors({ ...passworderrors, [e.target.name]: false });
  };
  const config = {
    headers: {
      Authorization: amxtokenO,
    },
  };

  const config1 = {
    params: {
      user_id: userIdO,
    },
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: amxtokenO,
    },
  };

  const UpdateUser = async (e) => {
    e.preventDefault();
    if (!user.user_name || !user.mail) {
      setErrors({
        user_name: !user.user_name,
        mail: !user.mail,
      });
      return;
    }
    try {
      let data1 = await axios
        .put(
          `https://fibregrid.amxdrones.com/dronecount/updateuser/${userIdO}/`,
          user,
          config
        )
        .then((res) => {
          const data2 = res.data;
         alert(res.data.photo_url)

          // window.location.reload();
// Call handleUploadPhoto to update profile photo
handleUploadPhoto();
          // console.log(user.user_name);

          toast.success("User Profile updated successfully !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: <img src={drone} />,
          });
          localStorage.setItem("user_name", user.user_name);
          localStorage.setItem("profile_photo", user.photo);
          setTimeout(() => {
            window.location.reload();
          }, 3000);

          // window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to Update Profile !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: <img src={drone} />,
          });
        });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Profile !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: <img src={drone} />,
      });
    }
  };
  const handleUpdateProfile = async () => {
    if (!file && (!user.user_name || !user.mail)) {
      // No file selected and missing required user information, return or display an error message
      return;
    }
  
    const formData = new FormData();
  
    // Append user information fields to the FormData
    formData.append('user_id', userIdO);
    formData.append('user_name', user.user_name);
    formData.append('mail', user.mail);
  
    if (file) {
      // If a file is selected, append it to the FormData
      formData.append('photo', file);
    }
  
    try {
      const response = await axios.put(
        `https://fibregrid.amxdrones.com/dronecount/updateuser/${userIdO}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: amxtokenO,
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Profile updated successfully:', response.data);
  
        if (file) {
          // If a file was uploaded, update the new photo in state and localStorage
          setNewPhoto(response.data.photo_url);
          localStorage.setItem('profile_photo', response.data.photo_url);
          setTimeout(()=>{

            window.location.reload();
          },3000)
          
        }
  
        toast.success('Profile updated successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          icon: <img src={drone} />,
        });
  
        // ... (other actions or reload if needed)
      } else {
        throw new Error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        icon: <img src={drone} />,
      });
    }
  };
  
  const UpdatePassword = async (e) => {
    e.preventDefault();
    if (!password.old_password || !password.new_password) {
      setPassworderrors({
        old_password: !password.old_password,
        new_password: !password.new_password,
      });
      return;
    }
    try {
      let data2 = await axios
        .put(
          `https://fibregrid.amxdrones.com/dronecount/updateuserpassword/${userIdO}/`,
          password,
          config
        )
        .then((res) => {
          const data2 = res.data;
          console.log(res.data);
          toast.success("Password updated successfully !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            icon: <img src={drone} />,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.Error == "Invalid old password") {
            toast.error("Invalid old password!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} />,
            });
          } else {
            toast.error("error !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              icon: <img src={drone} />,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
     
      <div className="content">
      <br />
       <div className="row">
        
                  <div 
              
              id="TooltipExample"
                    onClick={goBack}
                    style={{ cursor: "pointer" ,margin:"0 1rem"}}
                  >
                    <img src={backImage} alt="" height={25} />
                   
                  </div>
                  <Tooltip
      
            autohide={true}
            flip={true}
            
            isOpen={tooltipOpen}
            target="TooltipExample"
            toggle={toggle}
            placement="top"
          >
          <div>Go Back</div>
          
          </Tooltip>
                 
                  </div>
                  <br /><Row>
          <Col md="8">
            <Card className="second-order">
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* <Row>
          <Col className="pr-md-1" md="5">
            <FormGroup>
              <label>Company (disabled)</label>
              <Input
                defaultValue="Creative Code Inc."
                disabled
                placeholder="Company"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="px-md-1" md="3">
            <FormGroup>
              <label>Username</label>
              <Input
                defaultValue="michael23"
                placeholder="Username"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col className="pl-md-1" md="4">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">
                Email address
              </label>
              <Input placeholder="mike@email.com" type="email" />
            </FormGroup>
          </Col>
        </Row> */}
                  <p>Edit Username and Email</p>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Col className="pr-md-1" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> User Name:{" "}
                      </span>

                      <input
                        onChange={changeUserHandler}
                        name="user_name"
                        type="text"
                        className="form-control"
                        placeholder="Enter User Name"
                        required
                      />
                      {errors.user_name && (
                        <span className="error-message">
                          User Name is required
                        </span>
                      )}
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> User Email:{" "}
                      </span>

                      <input
                        onChange={changeUserHandler}
                        name="mail"
                        type="email"
                        className="form-control"
                        placeholder="Enter User Email"
                        required
                      />
                      {errors.mail && (
                        <span className="error-message">Email is required</span>
                      )}
                    </Col>

                    <Col className="pl-md-1" md="3">
                      <span className="form-labels">
                  Company Name:{" "}
                      </span>

                      <input
                        onChange={changeUserHandler}
                        name="company_name"
                        type="text"
                        className="form-control"
                        placeholder="Enter Company Name"
                       
                      />
                      {errors.mail && (
                        <span className="error-message">Email is required</span>
                      )}
                    </Col>
                    <Col className="pr-md-1" md="3">
                      <div style={{ padding: "0px 8px" }}>
                        {imagePreview ? ( // Render the image preview only when a photo is selected
                          <div
                            className="image-preview"
                            style={{
                              border: "2px dashed #ccc",
                              borderRadius: "50%",
                              width: "50px",
                              height: "50px",
                              margin: "0 auto",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            className="image-preview"
                            style={{
                              border: "2px dashed #ccc",
                              borderRadius: "50%",
                              width: "50px",
                              height: "50px",
                              margin: "0 auto",
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            <p
                              style={{ textAlign: "center", marginTop: "70px" }}
                            >
                              Upload Photo
                            </p>
                          </div>
                        )}
                        <div className="file-input-container">
                          <label
                            htmlFor="photo"
                            className="file-input-label"
                          >
                            <button
                              type="button"
                              className="btn btn-secondary   mb-4 "
                              onClick={() =>
                                document.getElementById("photo").click()
                              }
                            >
                              {file ? "Change" : "Upload"}
                            </button>
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            id="photo"
                            name="photo"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div>

                      </div>
                    </Col>
                    <Col className="pl-md-1 buttonGroupContainer1" md="3">
                      {disableButton ? (
                        <Button
                          color="primary"
                          type="submit"
                          onClick={handleUpdateProfile}
                          disabled
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          type="submit"
                          onClick={handleUpdateProfile}
                        >
                          Save
                        </Button>
                      )}
                     
                    </Col>
                  </Row>
                  <Row></Row>

                  <p>Change Passwords</p>
                  <Row>
                    <Col className="pr-md-1" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> Old Password:{" "}
                      </span>

                      <input
                        onChange={changePasswordHandler}
                        name="old_password"
                        type="text"
                        className="form-control"
                        placeholder="Enter Old Password"
                        required
                      />
                      {passworderrors.old_password && (
                        <span className="error-message">
                          Old Password is required
                        </span>
                      )}
                    </Col>
                    <Col className="pl-md-1" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> New Password:{" "}
                      </span>

                      <input
                        onChange={changePasswordHandler}
                        name="new_password"
                        type="text"
                        className="form-control"
                        placeholder="Enter New Password"
                        // required
                      />
                      {passworderrors.new_password && (
                        <span className="error-message">
                          New Password is required
                        </span>
                      )}
                    </Col>

                    <Col className="pl-md-1 buttonGroupContainer" md="2">
                      <Button
                        color="primary"
                        type="submit"
                        onClick={UpdatePassword}
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
         

                 
                </Form>
              </CardBody>
             
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user first-order">
              <CardBody>
                <CardText />
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    {/* <img
            alt="..."
            className="avatar"
            src={require("assets/img/anime3.png")}
          /> */}
                    {/* {
          
          photo==null?<>
          
          <img alt="..." src={require("assets/img/anime3.png")} className="avatar"/>
          </>:<>
          <img alt="..." src={photo} className="avatar"/>
          </>
          
        } */}
                    {newPhoto === null ||
                    newPhoto === undefined ||
                    newPhoto === "undefined" ||
                    newPhoto === "" ? (
                      <>
                        <img alt="..." src={avatarimage} className="avatar" />
                      </>
                    ) : (
                      <>
                        <img alt="..." src={newPhoto} className="avatar" />
                      </>
                    )}

                    {/* {
!photo ? (
<>
<img alt="..." src={avatarimage}  className="avatar"/>
</>
) : (
  
<>
<img alt="..." src={photo}  className="avatar"/>
</>
)
} */}
                    <h5 className="title">User ID : {userIdO}</h5>
                    <h5 className="title">User Name : {userNameO}</h5>
                  </a>
                  {/* <p className="description">user ID</p>
        <p className="description">user Email</p> */}
                </div>
                {/* <div className="card-description">
        Do not be scared of the truth because we need to restart the
        human foundation in truth And I love you like Kanye loves
        Kanye I love Rick Owens’ bed design but the back is...
      </div> */}
              </CardBody>
              {/* <CardFooter>
      <div className="button-container">
        <Button className="btn-icon btn-round" color="facebook">
          <i className="fab fa-facebook" />
        </Button>
        <Button className="btn-icon btn-round" color="twitter">
          <i className="fab fa-twitter" />
        </Button>
        <Button className="btn-icon btn-round" color="google">
          <i className="fab fa-google-plus" />
        </Button>
      </div>
    </CardFooter> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
