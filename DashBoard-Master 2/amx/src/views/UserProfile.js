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

import { Tooltip } from "reactstrap";
import backImage from "../views/assets/images/fileimagesLogo/backImage.png";
function UserProfile() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const [disableButton, setDisableButton] = useState(false);
  const userIdO = localStorage.getItem("user_id");

  const userNameO = localStorage.getItem("user_name").replace(/"/g, "");

  const companyNameO = localStorage.getItem("company_name").replace(/"/g, "");
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
      console.log(imagePreview);
    };
    reader.readAsDataURL(selectedFile);
  };

  const goBack = () => {
    window.history.back();
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  React.useEffect(() => {
    setNewPhoto(localStorage.getItem("profile_photo"));
  }, [newPhoto]);

  const [user, setUser] = useState({
    user_id: userIdO,
    user_name: "",
    mail: "",
    photo: "",
    company_name: "",
  });

  // console.log(user);

  const [errors, setErrors] = useState({
    user_name: false,
    mail: false,
    company_name: false,
    password: false,
  });
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // const isAlphaNumeric = (str) => {
  //   const alphaNumericPattern = /^[a-zA-Z0-9]*$/;
  //   return alphaNumericPattern.test(str);

  // };

  const isAlphaNumeric = (str) => {
    const alphaNumericWithSpecialPattern = /^[^\s]+$/;
    return alphaNumericWithSpecialPattern.test(str);
  };

  const changeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: false });

    if (name === "user_name" || name === "company_name") {
      const alphaNumericWithSpecialPattern = /^[^\s]+$/;

      setErrors({
        ...errors,

        // [name]: value.trim() === '', // Check if the value is empty or contains non-alphanumeric characters

        [name]:
          !alphaNumericWithSpecialPattern.test(value) || value.trim() === "", // Check if the value is empty or contains non-alphanumeric characters
      });
    } else if (name === "mail") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors({
        ...errors,
        [name]: !emailPattern.test(value) || value.trim() === "",
      });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
  });
  const [passworderrors, setPassworderrors] = useState({
    old_password: false,
    new_password: false,
  });
  // const changePasswordHandler = (e) => {
  //   setPassword({ ...password, [e.target.name]: e.target.value });
  //   setPassworderrors({ ...passworderrors, [e.target.name]: false });
  // };

  const changePasswordHandler = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    setPassworderrors({ ...passworderrors, [e.target.name]: false });
    if (name === "old_password" || name === "new_password") {
      const alphaNumericWithSpecialPattern = /^[^\s]+$/;

      setPassworderrors({
        ...errors,

        // [name]: value.trim() === '', // Check if the value is empty or contains non-alphanumeric characters

        [name]:
          !alphaNumericWithSpecialPattern.test(value) || value.trim() === "", // Check if the value is empty or contains non-alphanumeric characters
      });
    } else {
      setPassworderrors({ ...errors, [name]: false });
    }
  };
  const config = {
    headers: {
      Authorization: amxtokenO,
    },
  };

  const config1 = {
    // params: {
    //   user_id: userIdO,
    // },
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: amxtokenO,
    },
  };
  const handleFileChange = (e) => {
    setDisableButton(true);
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    console.log(file);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        console.log("imagepreview==>", reader.result);
      };
      reader.readAsDataURL(selectedFile);
      console.log(reader.readAsDataURL);
      setUser({
        ...user,
        photo: selectedFile, // or photo: null
      });
      setDisableButton(false);
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
    formData.append("user_id", userIdO);
    formData.append("photo", file);

    try {
      const response = await axios.put(
        `https://fibregrid.amxdrones.com/dronecount/updateuser/${userIdO}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: amxtokenO,
          },
        }
      );

      if (response.status === 200) {
        console.log("Photo updated successfully:", response.data);
        setNewPhoto(response.data.photo_url);
        toast.success("Profile photo updated successfully!", {
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
        throw new Error("Failed to update profile photo.");
        toast.error("Failed to update profile photo!", {
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
    } catch (error) {
      console.error("Error updating profile photo:", error);
      toast.error("Failed to update profile photo!", {
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
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user.user_name || !user.mail || !user.company_name) {
      setErrors({
        user_name: !user.user_name,
        mail: !user.mail,
        company_name: !user.company_name,
      });
      return;
    }

    // Trim the values to remove leading and trailing spaces
    const trimmedUserName = user.user_name.trim();

    const trimmedmail = user.mail.trim();
    const trimmedCompanyName = user.company_name.trim();

    if (!trimmedUserName || !trimmedmail || !trimmedCompanyName) {
      setErrors({
        user_name: !trimmedUserName,
        mail: !trimmedmail,
        company_name: !trimmedCompanyName,
      });
      return;
    }
    // Check if user_name contains non-alphanumeric characters (including spaces)
    // Check if user_name starts with a white space or special character
    if (/^\s/.test(user.user_name)) {
      // Check if user_name starts with white space
      setErrors({
        user_name: !user.user_name,
      });
      toast.error("User Name cannot start with a white space", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    // Check if user_name starts with a white space or special character
    if (/^\s/.test(user.mail)) {
      // Check if user_name starts with white space
      setErrors({
        mail: !user.mail,
      });
      toast.error("Mail cannot start with a white space", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    // Check if user_name starts with a white space or special character
    if (/^\s/.test(user.company_name)) {
      // Check if user_name starts with white space
      setErrors({
        company_name: !user.company_name,
      });
      toast.error("Company Name cannot start with a white space", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    if (!isValidEmail(user.mail)) {
      toast.error("Invalid email format", {
        // Display an error toast
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const formData = new FormData();

    // Append user information fields to the FormData
    formData.append("user_id", userIdO);
    formData.append("user_name", user.user_name);
    formData.append("mail", user.mail);
    formData.append("company_name", user.company_name);
    if (file) {
      // If a file is selected, append it to the FormData
      formData.append("photo", file);
    }

    console.log(formData);
    try {
      const response = await axios.put(
        `https://fibregrid.amxdrones.com/dronecount/updateuser/${userIdO}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: amxtokenO,
          },
        }
      );
      console.log(response);
      if (response.data.Error === "Username already exists") {
        toast.error("Username already exists");
      } else if (response.data.message === "User data updated successfully") {
        console.log("Profile updated successfully:", response.data);

        if (file) {
          // If a file was uploaded, update the new photo in state and localStorage
          setNewPhoto(response.data.photo_url);
          localStorage.setItem("profile_photo", response.data.photo_url);
        }

        localStorage.setItem("user_name", user.user_name);
        localStorage.setItem("company_name", user.company_name);

        toast.success("Profile updated successfully!", {
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
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile!", {
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

  const UpdatePassword = async (e) => {
    e.preventDefault();
    if (!password.old_password || !password.new_password) {
      setPassworderrors({
        old_password: !password.old_password,
        new_password: !password.new_password,
      });
      return;
    }
    // Trim the values to remove leading and trailing spaces
    // const trimmedoldpassword = password.old_password.trim();

    // const trimmednewpassword = password.new_password.trim();

    // if (trimmedoldpassword || !trimmednewpassword) {
    //   setPassworderrors({
    //     old_password: !trimmedoldpassword,
    //     new_password: !trimmednewpassword,
    //   });
    //   return;
    // }

    if (/^\s/.test(password.old_password)) {
      // Check if user_name starts with white space
      setPassworderrors({
        old_password: !password.old_password,
      });
      toast.error("Old password cannot start with a white space", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }
    if (/^\s/.test(password.new_password)) {
      // Check if user_name starts with white space
      setPassworderrors({
        new_password: !password.new_password,
      });
      toast.error("New Password cannot start with a white space", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
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
          setTimeout(() => {
            window.location.reload();
          }, 3000);
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
            style={{ cursor: "pointer", margin: "0 1rem" }}
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
        <br />
        <Row>
          <Col md="8">
            <Card className="second-order">
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <p>Edit User and Company name:</p>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flexStart",
                      alignItems: "center",
                    }}
                  >
                    <Col className="pr-md-1 mb-3" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span>New User Name:{" "}
                      </span>

                      <input
                        style={{ padding: ".5rem .2rem" }}
                        onChange={changeUserHandler}
                        name="user_name"
                        type="text"
                        className="form-control"
                        placeholder="  New User Name"
                        required
                      />
                      {errors.user_name && (
                        <span className="error-message">
                          {/* User Name is required */}

                          {user.user_name.trim() === ""
                            ? "User Name is required"
                            : "User Name should not start with space"}
                        </span>
                      )}
                    </Col>
                    <Col className="pr-md-1 mb-3" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> Confirm
                        Email:{" "}
                      </span>

                      <input
                        style={{ padding: ".5rem .2rem" }}
                        onChange={changeUserHandler}
                        name="mail"
                        type="email"
                        className="form-control"
                        placeholder="  Confirm Email"
                        required
                      />
                      {/* {errors.mail && (
                        <span className="error-message">Email is required</span>
                      )} */}

                      {errors.mail && (
                        <span className="error-message">
                          {user.mail.trim() === ""
                            ? "Email is required"
                            : "Please enter valid email"}
                          {/* {isValidEmail(user.mail)?'Email is required' : 'Please enter valid email'} */}
                        </span>
                      )}
                    </Col>

                    <Col className="pr-md-1 mb-3" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> Company Name:{" "}
                      </span>

                      <input
                        style={{ padding: ".5rem .2rem" }}
                        onChange={changeUserHandler}
                        name="company_name"
                        type="text"
                        className="form-control"
                        placeholder="  Company Name"
                        required
                      />
                      {errors.company_name && (
                        <span className="error-message">
                          {/* Company name is required */}
                          {user.company_name.trim() === ""
                            ? "Company Name is required"
                            : "Company Name should not start with blank space"}
                        </span>
                      )}
                    </Col>

                    <Col className="pr-md-1 mb-3" md="3">
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
                          <label htmlFor="photo" className="file-input-label">
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
                  </Row>
                  <Row>
                    <Col className="pr-md-1 buttonGroupContainer1" md="3">
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

                  <p>Change Password</p>
                  <Row>
                    <Col className="pr-md-1 mb-3" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> Old Password:{" "}
                      </span>

                      <input
                        style={{ padding: ".5rem .2rem" }}
                        onChange={changePasswordHandler}
                        name="old_password"
                        type="text"
                        className="form-control"
                        placeholder="  Old Password"
                        required
                      />
                      {passworderrors.old_password && (
                        <span className="error-message">
                          {/* Old Password is required */}

                          {password.old_password.trim() === ""
                            ? "Old Password is required"
                            : "Old Password should not start with space"}
                        </span>
                      )}
                    </Col>
                    <Col className="pr-md-1 mb-3" md="3">
                      <span className="form-labels">
                        <span className="asterisk-symbol">*</span> New Password:{" "}
                      </span>

                      <input
                        style={{ padding: ".5rem .2rem" }}
                        onChange={changePasswordHandler}
                        name="new_password"
                        type="text"
                        className="form-control"
                        placeholder="  New Password"
                        // required
                      />
                      {passworderrors.new_password && (
                        <span className="error-message">
                          {/* New Password is required */}

                          {password.new_password.trim() === ""
                            ? "New Password is required"
                            : "New Password should not start with space"}
                        </span>
                      )}
                    </Col>

                    <Col className="pr-md-1 buttonGroupContainer" md="3">
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
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}> */}
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
                  <h5 className="title">Company Name : {companyNameO}</h5>
                  {/* </a> */}
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
