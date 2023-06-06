import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";

import "../projects/Project.css"
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "views/DropFileInput/DropFileInput";
// import "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/projects/TwoDview.css"

const folder_list = [
  {
    'project_name': '2D view',
    'folder_color': '#D65A47',
    'link': '/amx/twodview'
  },
  {
    'project_name': '3D view',
    'folder_color': 'rgb(64,153,173)',
    'link': '/amx/threedview'

  },
  {
    'project_name': 'DTM',
    'folder_color': 'rgb(239,185,93)',
    'link': '/amx/processdata'


  },
  {
    'project_name': 'DSM',
    'folder_color': 'rgb(55,109,236)',
    'link': '/amx/processdata'

  },
  {
    'project_name': 'NDVI',
    'folder_color': '#D65A47',
    'link': '/amx/processdata'

  }

]

function ProcessData() {
  let [state, setState] = useState({
    project_name: "",
  });
  const [addprojectopen, setaddprojectopen] = React.useState(false);

  const AddProject = (name) => {
    console.log("AddProject======")
    setaddprojectopen(true)
  };
  const CloseProject = (name) => {
    setaddprojectopen(false)
  };

  const OKProject = (name) => {
    setaddprojectopen(false)
  };
  console.log(addprojectopen, 'addprojectopen====>')

  const onFileChange = (files) => {
    console.log(files);
  }

  // pop up endd=====

  let { project_name } = state;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload = state;
      console.log(payload);
      let data = await axios.post(
        "http://127.0.0.1:8000/dronecount/projects/",
        payload
      );
      console.log(data);
      toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const [popup, setPopup] = useState(false);
  const handleClickOpen = () => {
    setPopup(!popup);
  };
  const ClosePopup = () => {
    setPopup(false);
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          {/* pop UP */}
          <div className={addprojectopen == true ? "overlay show" : "overlay"}>

            {/* <!-- popup box start --> */}
            <div className="popup-outer-process" >
              <div className="popup-box-process">
                {/* <i id="close" className="bx bx-x close"></i> */}
                <FontAwesomeIcon onClick={CloseProject} className="close" icon={faClose} />
                <div className="profile-text-process" >
                  {/* <img src="profile.jpg" alt="" />  */}
                  <div className="text-process">
                    <span className="name">Create Projects</span>
                    {/* <span className="profession">Web & Web Designer</span> */}
                  </div>
                </div>
                <form action="#">
                  <div className="">

                    <div className="" >
                      <div>




                        <div className="input-file-type">
                          <form onSubmit={handleSubmit}>
                            <div class="form-group row">
                              <label
                                for="staticEmail"
                                class="col-sm-3 col-form-label"

                              >
                                Project
                              </label>{' '}
                              <div class="col-sm-9">
                                <input
                                  type="text"
                                  class="form-control"
                                  id="name"
                                  name="project_name"
                                  placeholder="Name"
                                  value={project_name}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <div class="col-sm-12"></div>
                            </div>
                         
                          </form>
                        </div>
                        <br />
                        <br />



                      </div>
                      <header>

                      </header>


                    </div>


                  </div>
                  {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                  <div className="button">
                    <button id="close" onClick={CloseProject} className="cancel" class="btn btn-primary">ADD</button>
                    {/* <button className="send">ADD</button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* popup end */}


          <div className="content">
            <h2 style={{ fontSize: "25px" }}>PROCESSED DATA</h2>

            <div style={{}} className="row">


              {folder_list.map((item) =>
                //  <div  className="row">
                <>
                  <Link to={item.link}>
                    <div className="file-cards">
                      <div style={{}} className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5">
                        {/* <div style={{justifyContent:"center"}} className="col-lg-2 col-sm-12 col-md-3"> */}
                        <div data={color} style={{ alignContent: "center" }} class="folder">

                          <div class="folder-inside" style={{ backgroundColor: item.folder_color }}>


                          </div>

                        </div>

                        {/* </div> */}

                      </div>

                    </div>
                    <h4 style={{ textAlign: 'center', paddingTop: '40px' }}>{item.project_name}</h4>

                  </Link>
                </>

                // </div>
              )}



            </div>


            {/* <div className="row folder-name">
          <Link to="/amx/twodview" className="col-lg-2 col-sm-2 col-md-2">
            2D VIEW
          </Link>
          <Link to="/amx/threedview" className="col-lg-2 col-sm-2 col-md-2">
            3D VIEW
          </Link>
          <Link className="col-lg-2 col-sm-12 col-md-6">DTM</Link>
          <Link className="col-lg-2 col-sm-12 col-md-6">DSM</Link>
          <Link className="col-lg-2 col-sm-12 col-md-6">NDVI</Link>
        </div> */}
            <div data={color} className="row gx-0 row-datas-cards col-lg-12 col-md-12 col-sm-6">
              <button
                data={color}
                type="file"
                className="header-content-btn1"
                onClick={AddProject}
              >
                +
              </button>

              {/* <div>
            {popup ? (
              <div className="main-pop-up">
                <div className="pop-up-employee-file">
                  <div className="header-employee-pop">
                    <h3 className="project-name-1">PROJECTS</h3>
                    <button
                      className="pop-up-closer-button"
                      onClick={ClosePopup}
                    >
                      X
                    </button>
                  </div>
                  <div className="input-file-type">
                    <form onSubmit={handleSubmit}>
                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-sm-3 col-form-label"
                          
                        >
                          Project
                        </label>{' '}
                        <div class="col-sm-9">
                          <input 
                            type="text"
                            class="form-control"
                            id="name"
                            name="project_name"
                            placeholder="Name"
                            value={project_name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="col-sm-12"></div>
                      </div>
                      <div className="text-center1">
                        <button className="handleSubmit">SUBMIT</button>
                      </div>
                    </form>
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            ) : (
              ""
            )}
          </div> */}
            </div>
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default ProcessData;