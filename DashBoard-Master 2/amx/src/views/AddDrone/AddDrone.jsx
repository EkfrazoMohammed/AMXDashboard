import React, { useState } from "react";
import "./AddDrone.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "views/DropFileInput/DropFileInput";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";


// import Button from "react-bootstrap/esm/Button";

// import Button from "react-bootstrap/esm/Button";

function AddDrone() {
  let [state, setState] = useState({
    aircraft_type: "",
    connection_id: "",
    model_name: "",
    purchase_year: "",
    UIN: "",
    time_in_service: "",
    Next_maintainance: "",
  });
  let {
    aircraft_type,
    connection_id,
    model_name,
    purchase_year,
    UIN,
    time_in_service,
    Next_maintainance,
  } = state;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state,"state==>");
    let data = await axios.post(
      // "http://127.0.0.1:8000/dronecount/addDrone/",
      "https://fibregrid.amxdrones.com/dronecount/addDrone/",
      state
    );
    
    console.log(data);
    CloseProject()
  };
  const [popup, setPopup] = useState(false);
  const handleClickOpen = () => {
    setPopup(!popup);
  };

  const ClosePopup = () => {
    setPopup(false);
  };

  const [addprojectopen, setaddprojectopen] = React.useState(false);

  const AddProject = () => {
    console.log(AddProject, "AddProject")
    setaddprojectopen(true)
  };

  const CloseProject = () => {
    console.log("CloseProject")
    setaddprojectopen(false)
  };

  const onFileChange = (files) => {
    console.log(files);
  }



  return (
    <BackgroundColorContext.Consumer>
    {({ color }) => (
    <>
      {/* <div className="modal" style={addprojectopen ? { display:'block'} : {display : 'none'}} id="myModal" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
             
              <div className="modal-body">
              <button className="modal-close" onClick={CloseProject}>&times;</button>

                <h5>Add Drone</h5>
                <div className="input-file">
                  <form onSubmit={handleSubmit}>
                    <div className="container">
                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">
                            Aircraft Type:
                          </span>
                        </label>
                        <div class="col-sm-4">
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            
                            placeholder="Aircraft_type"
                            name="aircraft_type"
                            value={aircraft_type}
                            onChange={handleChange}
                          />
                        </div>
                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">
                            Connection ID:
                          </span>
                        </label>
                        <div class="col-sm-4">
                          <input
                            type="text"
                            class="form-control"
                            id="droneID"
                            placeholder="Connection_ID"
                            name="connection_id"
                            value={connection_id}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    

                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">
                            Model Name:
                          </span>
                        </label>
                        <div class="col-sm-4">
                          <input
                            type="text"
                            class="form-control"
                            id="Date"
                            placeholder="model_name"
                            name="model_name"
                            value={model_name}
                            onChange={handleChange}
                          />
                        </div>

                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">
                            Purchase year:
                          </span>
                        </label>
                        <div class="col-sm-4">
                          <input
                            type="date"
                            class="form-control"
                            id="Date"
                            placeholder="purchase_year"
                            name="purchase_year"
                            value={purchase_year}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">UIN:</span>
                        </label>
                        <div class="col-sm-4">
                          <input
                            type="text"
                            class="form-control"
                            id="text"
                            placeholder="UIN"
                            name="UIN"
                            value={UIN}
                            onChange={handleChange}
                          />
                        </div>

                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">
                            Time In Service:
                          </span>
                        </label>
                        <div class="col-sm-4">
                          <input
                            type="date"
                            class="form-control"
                            id="Date"
                            placeholder="time_in_service"
                            name="time_in_service"
                            value={time_in_service}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          for="staticEmail"
                          class="col-form-label col-sm-2 "
                        >
                          <span className="Add-drone-form-lable">
                            Next Maintainance:
                          </span>
                        </label>
                        <div class="col-sm-3">
                          <input
                            type="date"
                            class="form-control"
                            id="Date"
                            placeholder="Next_maintainance"
                            name="Next_maintainance"
                            value={Next_maintainance}
                            onChange={handleChange}
                          />
                        </div>

                        <div class="col-sm-6"></div>
                      </div>
                    </div>
                    <div className="">
                      <button className="label theme-bg2 text-white f-12">ADD</button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>

        </div>
       { 
       addprojectopen ?
       <div class="modal-backdrop"></div>
:
null
       }  */}

      <div className={addprojectopen == true ? "overlay show" : "overlay"}>

        {/* <!-- popup box start --> */}
        <div className="popup-outer-adddrone">
          <div className="popup-box-adddrone">
            {/* <i id="close" className="bx bx-x close"></i> */}
            <FontAwesomeIcon onClick={CloseProject} className="close" icon={faClose} />
            <div className="profile-text-adddrone">
              {/* <img src="profile.jpg" alt="" />  */}
              <div className="text-adddrone">
                <span className="name">Create Projects</span>
                {/* <span className="profession">Web & Web Designer</span> */}
              </div>
            </div>
            {/* <form action="#"> */}
              <div className="wraper-dashboard">
                <div className="container">
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3 "
                    >
                      <span className="Add-drone-form-lable">
                        Aircraft Type:
                      </span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        id="name"

                        placeholder="Aircraft_type"
                        name="aircraft_type"
                        value={aircraft_type}
                        onChange={handleChange}
                      />
                    </div>
                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3"
                    >
                      <span className="Add-drone-form-lable">
                        Connection ID:
                      </span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        id="droneID"
                        placeholder="Connection_ID"
                        name="connection_id"
                        value={connection_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div class="form-group row"> */}

                  {/* </div> */}

                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3"
                    >
                      <span className="Add-drone-form-lable">
                        Model Name:
                      </span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        id="Date"
                        placeholder="model_name"
                        name="model_name"
                        value={model_name}
                        onChange={handleChange}
                      />
                    </div>

                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3"
                    >
                      <span className="Add-drone-form-lable">
                        Purchase year:
                      </span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="date"
                        class="form-control"
                        id="Date"
                        placeholder="purchase_year"
                        name="purchase_year"
                        value={purchase_year}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3"
                    >
                      <span className="Add-drone-form-lable">UIN:</span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="text"
                        class="form-control"
                        id="text"
                        placeholder="UIN"
                        name="UIN"
                        value={UIN}
                        onChange={handleChange}
                      />
                    </div>

                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3"
                    >
                      <span className="Add-drone-form-lable">
                        Time In Service:
                      </span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="date"
                        class="form-control"
                        id="Date"
                        placeholder="time_in_service"
                        name="time_in_service"
                        value={time_in_service}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="staticEmail"
                      class="col-form-label col-sm-3"
                    >
                      <span className="Add-drone-form-lable">
                        Next Maintainance:
                      </span>
                    </label>
                    <div class="col-sm-3">
                      <input
                        type="date"
                        class="form-control"
                        id="Date"
                        placeholder="Next_maintainance"
                        name="Next_maintainance"
                        value={Next_maintainance}
                        onChange={handleChange}
                      />
                    </div>

                    <div class="col-sm-6"></div>
                  </div>
                </div>


              </div>
              {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
              <div className="button">
                <button id="close" onClick={CloseProject} className="cancel">Cancel</button>
                <button onClick={handleSubmit} className="send">ADD</button>
              </div>
            {/* </form> */}
          </div>
        </div>
      </div>

    
      <div className="content" style={{ backgroundColor: color == 'green' ? 'rgba(255,140,49,.05)' : color == 'primary' ? 'rgba(253,101,113,.05)' : "rgba(65, 195, 199,.03)" }} >
    
      <div className="content">
        {/* <div classNameNameName="dashboard-header">
          <br />
          <i classNameNameName="profile-icon bi bi-person-circle"></i>
        </div> */}

        {/* <a href="#"
         type="file"
          classNameNameName="header-content-btn"
          onClick={handleClickOpen}
          classNameName="label theme-bg2 text-white f-12">Click Me</a> */}


        {/* <button type="button" classNameName="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Open Modal
  </button> */}


        <button type="button" onClick={AddProject} className="btn btn-primary">Add Drone</button>

        {/* <!-- Modal --> */}
        {/* <div className="block" id="myModal" tabindex="-1" role="dialog"> */}






        {/* <div>
          {popup ? (
            <div classNameNameName="main-pop-up">
              <div classNameNameName="pop-up-employee-file-gd">
                <div classNameNameName="header-employee-pop">
                  <h3 style={{ fontWeight: "800", fontFamily:"Poppins" }}>ADD DRONE</h3>
                  <button classNameNameName="pop-up-closer-button" onClick={ClosePopup}>
                    X
                  </button>
                </div>
                <div classNameNameName="input-file">
                  <form onSubmit={handleSubmit}>
                    <div classNameNameName="container">
                      <div classNameName="form-group row">
                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">
                            Aircraft Type:
                          </span>
                        </label>
                        <div classNameName="col-sm-4">
                          <input
                            type="text"
                            classNameName="form-control"
                            id="name"
                            
                            placeholder="Aircraft_type"
                            name="aircraft_type"
                            value={aircraft_type}
                            onChange={handleChange}
                          />
                        </div>
                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">
                            Connection ID:
                          </span>
                        </label>
                        <div classNameName="col-sm-4">
                          <input
                            type="text"
                            classNameName="form-control"
                            id="droneID"
                            placeholder="Connection_ID"
                            name="connection_id"
                            value={connection_id}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {/* <div classNameName="form-group row"> */}

        {/* </div> */}

        {/* <div classNameName="form-group row">
                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">
                            Model Name:
                          </span>
                        </label>
                        <div classNameName="col-sm-4">
                          <input
                            type="text"
                            classNameName="form-control"
                            id="Date"
                            placeholder="model_name"
                            name="model_name"
                            value={model_name}
                            onChange={handleChange}
                          />
                        </div>

                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">
                            Purchase year:
                          </span>
                        </label>
                        <div classNameName="col-sm-4">
                          <input
                            type="date"
                            classNameName="form-control"
                            id="Date"
                            placeholder="purchase_year"
                            name="purchase_year"
                            value={purchase_year}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div classNameName="form-group row">
                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">UIN:</span>
                        </label>
                        <div classNameName="col-sm-4">
                          <input
                            type="text"
                            classNameName="form-control"
                            id="text"
                            placeholder="UIN"
                            name="UIN"
                            value={UIN}
                            onChange={handleChange}
                          />
                        </div>

                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">
                            Time In Service:
                          </span>
                        </label>
                        <div classNameName="col-sm-4">
                          <input
                            type="date"
                            classNameName="form-control"
                            id="Date"
                            placeholder="time_in_service"
                            name="time_in_service"
                            value={time_in_service}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div classNameName="form-group row">
                        <label
                          for="staticEmail"
                          classNameName="col-form-label col-sm-2 "
                        >
                          <span classNameNameName="Add-drone-form-lable">
                            Next Maintainance:
                          </span>
                        </label>
                        <div classNameName="col-sm-3">
                          <input
                            type="date"
                            classNameName="form-control"
                            id="Date"
                            placeholder="Next_maintainance"
                            name="Next_maintainance"
                            value={Next_maintainance}
                            onChange={handleChange}
                          />
                        </div>

                        <div classNameName="col-sm-6"></div>
                      </div>
                    </div>
                    <div classNameNameName="text-center-add">
                      <button classNameNameName="submit-button">ADD</button>
                    </div>
                  </form>
                </div>
                <br />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>  */}
      </div>
      </div>
      
    </>
      )}
      </BackgroundColorContext.Consumer>
  );
}

export default AddDrone;
