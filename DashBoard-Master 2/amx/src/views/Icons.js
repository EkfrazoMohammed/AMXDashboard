// import * as React from "react";
import React, { useEffect, useState } from "react";
// import MaterialTable from "material-table";

import { ToastContainer, toast } from "react-toastify";
import MaterialTable from "material-table";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { GetApp, Add } from "@material-ui/icons";

import drone from "../assets/img/drone.webp";
import "./Icons.css";
// import { } from '@fortawesome/free-solid-svg-icons'
// import { Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "reactstrap";

import { useMemo } from "react";
// import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from 'react-table';

import axios from "axios";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
// import MaterialTable from "material-table";

import TableData from "./TableData";
function AddDrone() {
  const userIdO = localStorage.getItem("user_id");
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const config = {
    params: {
      user_id: userIdO,
    },
    headers: {
      Authorization: amxtokenO,
    },
  };

  let [state, setState] = useState({
    aircraft_type: "",
    connection_id: "",
    model_name: "",
    purchase_year: "",
    UIN: "",
    time_in_service: "",
    Next_maintainance: "",
    user_id: userIdO,
    Status:true

  });

  const [errors, setErrors] = useState({
    aircraft_type: false,
    connection_id: false,
    model_name: false,
    purchase_year: false,
    UIN: false,
    time_in_service: false,
    Next_maintainance: false,
    Status:false
  });
  let {
    aircraft_type,
    connection_id,
    model_name,
    purchase_year,
    UIN,
    time_in_service,
    Next_maintainance,
    user_id,
    Status,
  } = state;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
    setErrors({ ...errors, [name]: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !state.aircraft_type ||
      !state.connection_id ||
      !state.model_name ||
      !state.UIN ||
      !state.time_in_service ||
      !state.Next_maintainance ||
      !state.purchase_year
    ) {
      setErrors({
        aircraft_type: !state.aircraft_type,
        connection_id: !state.connection_id,
        model_name: !state.model_name,
        purchase_year: !state.purchase_year,
        UIN: !state.UIN,
        time_in_service: !state.time_in_service,
        Next_maintainance: !state.Next_maintainance,
      });
      return;
    }
    try {
      console.log(state, "state==>");
      let data = await axios
        .post(
          "https://fibregrid.amxdrones.com/dronecount/addDrone/",
          state,
          {
            headers: {
              Authorization: localStorage.getItem("amxtoken").replace(/"/g, ""),
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("New Drone added !", {
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
          console.log(data);
          CloseProject();
          setTimeout(()=>{
          window.location.reload();
          },2000)
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            toast.error("Invalid Data, Please try agin later !", {
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
          
            console.log(data);
            CloseProject();
            window.location.reload();

            console.log(err.response.status);
            console.log(err.response.statusText);
            console.log(err.message);
            console.log(err.response.headers); // 👉️ {... response headers here}
            console.log(err.response.data); // 👉️ {... response data here}
          }
        });
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error("Invalid Data, Please try agin later !", {
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
    }
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
    console.log(AddProject, "AddProject");
    setaddprojectopen(true);
  };

  const CloseProject = () => {
    console.log("CloseProject");
    setaddprojectopen(false);
  };

  const onFileChange = (files) => {
    console.log(files);
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <ToastContainer />
        

          <div className={addprojectopen == true ? "overlay show" : "overlay"}>
            {/* <!-- popup box start --> */}
            <div className="popup-outer-adddrone">
              <div className="popup-box-adddrone">
             
                <FontAwesomeIcon
                  onClick={CloseProject}
                  className="close"
                  icon={faClose}
                />
                <div className="profile-text-adddrone">
                 
                  <div className="text-adddrone">
                    <span className="name">Add Drone</span>
                   
                  </div>
                </div>
           
                <div className="wraper-dashboard">
                  <div className="container">
                    <div class="form-group row">
                      <label for="staticEmail" class="col-form-label col-sm-3 ">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span> Aircraft
                          Type:
                        </span>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control addDrone-input"
                          id="name"
                          placeholder="Enter Aircraft Type"
                          name="aircraft_type"
                          value={aircraft_type}
                          onChange={handleChange}
                        />
                        {errors.aircraft_type && (
                          <span className="error-message">
                            Aircraft type is required
                          </span>
                        )}
                      </div>
                      <label for="staticEmail" class="col-form-label col-sm-3">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span> Connection
                          ID:
                        </span>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control addDrone-input"
                          id="droneID"
                          placeholder="Enter Connection ID"
                          name="connection_id"
                          value={connection_id}
                          onChange={handleChange}
                        />
                        {errors.connection_id && (
                          <span className="error-message">
                            Connection ID is required
                          </span>
                        )}
                      </div>
                    </div>
                

                    <div class="form-group row">
                      <label for="staticEmail" class="col-form-label col-sm-3">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span> Model Name:
                        </span>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control addDrone-input"
                          id="Date"
                          placeholder="Enter Model Name"
                          name="model_name"
                          value={model_name}
                          onChange={handleChange}
                        />
                        {errors.model_name && (
                          <span className="error-message">
                            Model Name is required
                          </span>
                        )}
                      </div>

                      <label for="staticEmail" class="col-form-label col-sm-3">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span> Purchase
                          year:
                        </span>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="date"
                          class="form-control addDrone-input"
                          id="Date"
                          placeholder="Enter Purchase Year"
                          name="purchase_year"
                          value={purchase_year}
                          onChange={handleChange}
                        />
                        {errors.purchase_year && (
                          <span className="error-message">
                            Purchase Year is required
                          </span>
                        )}
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="staticEmail" class="col-form-label col-sm-3">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span>UIN:
                        </span>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="text"
                          class="form-control addDrone-input"
                          id="text"
                          placeholder="Enter UIN"
                          name="UIN"
                          value={UIN}
                          onChange={handleChange}
                        />
                        {errors.UIN && (
                          <span className="error-message">
                            UIN is required
                          </span>
                        )}
                      </div>

                      <label for="staticEmail" class="col-form-label col-sm-3">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span>Time In
                          Service:
                        </span>
                      </label>
                      <div class="col-sm-3">
                      <input
                          type="date"
                          class="form-control addDrone-input"
                          id="text"
                          placeholder="Time in Service"
                          name="time_in_service"
                          value={time_in_service}
                          onChange={handleChange}
                        />
                        {errors.time_in_service && (
                          <span className="error-message">
                            Time in service is required
                          </span>
                        )}
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="staticEmail" class="col-form-label col-sm-3">
                        <span className="Add-drone-form-lable">
                          <span className="asterisk-symbol">*</span> Next
                          Maintainance:
                        </span>
                      </label>
                      <div class="col-sm-3">
                        <input
                          type="date"
                          class="form-control addDrone-input"
                          id="Date"
                          placeholder="Enter Next maintainance"
                          name="Next_maintainance"
                          value={Next_maintainance}
                          onChange={handleChange}
                        />
                        {errors.Next_maintainance && (
                          <span className="error-message">
                           Next maintainance is required
                          </span>
                        )}
                      </div>

                      <div class="col-sm-6">
                        <input type="hidden"   class="form-control addDrone-input" name="user_id" value={userIdO} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* <textarea spellcheck="false" placeholder="Enter your message"></textarea> */}
                <div className="button">
                  <button id="close" onClick={CloseProject} className="cancel">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} className="send">
                    ADD
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>

          <div 

          
          >
            
        <Col md={12}>
            <button
              type="button"
              onClick={AddProject}
              className="btn btn-primary"
            >
              Add Drone
            </button>
            </Col>
          
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
}
function DroneList() {
  const [tableData, setTableData] = useState([]);

  const [updatingRow, setUpdatingRow] = useState(false);
  
  const userIdO = localStorage.getItem("user_id");
  const amxtokenO = localStorage.getItem("amxtoken").replace(/"/g, "");
  const config = {
    params: {
      user_id: userIdO,
    },
    headers: {
      Authorization: amxtokenO,
    },
  };
  
  let GetAllDrone = async () => {
    try {
    
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/",
        config
      );
      console.log(data.data.length, "dronedata====>");
      console.log(data.data)
      setTableData(data.data);
     
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
   
      // Logic for fetching data when a row is not being updated
      GetAllDrone();
   
  }, []);
  

  const columns = [
    {
      title: "Model Name",
      field: "model_name",
      sorting: false,
      filtering: false,
      cellStyle: { background: "#009688",minWidth: 110 },
      headerStyle: { color: "#fff" },
      filterPlaceholder: "filter",
      render: (rowData) => <div>{rowData.model_name}</div>,
      searchable: true,
      export: true,

      filtering: true, // Remove filter option for this column
    },
    {
      title: "UIN",
      field: "UIN",
      filterPlaceholder: "filter",
      searchable: true,
      export: true,
      cellStyle: {minWidth: 110 },

      filtering: true, // Remove filter option for this column
    },
   

    //   {
    //     title: "Next Maintainance",
    //     field: "Next_maintainance",
    //     // emptyValue: () => <em>null</em>,
    //     render: (rowData) => {
    //       const purchaseDate = new Date(rowData.Next_maintainance);
    //       const formattedDate = purchaseDate.toLocaleDateString("en-US", {
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //       });

    //       return <div>{formattedDate}</div>;
    //     },
    //     searchable: false,
    //     export: true,

    // filtering: false, // Remove filter option for this column
    //   },
   
    {
      title: "Aircraft Type",
      field: "aircraft_type",
      filterPlaceholder: "filter",
      cellStyle: {minWidth: 90 },
    },
    {
      title: "Connection Id",
      field: "connection_id",
      cellStyle: {minWidth: 90 },
      currencySetting: { minimumFractionDigits: 1 },
      // cellStyle: { background: "#009688" },
      // headerStyle: { color: "#fff" },
    },
    // {
    //   title: "IP Address",
    //   field: "ip_address",
    //   filterPlaceholder: "filter",
    // }, 
    
    {
      title: "Latitude",
      field: "latitude",
      filterPlaceholder: "filter",
      cellStyle: {minWidth: 110 },
    }, {
      title: "Longitude",
      field: "longitude",
      filterPlaceholder: "filter",
      cellStyle: {minWidth: 110 },
    },
    
    {
      title: "Location",
      field: "location",
      filterPlaceholder: "filter",
      cellStyle: {minWidth: 310 },
    }, 
    {
      title: "Status",
      field: "Status",
      cellStyle: {minWidth: 110 },
      // lookup: { True: "Active", False: "Inactive" },
      render: (rowData) => {
     
    
        return <div>{rowData.Status?"Active":"Inactive"}</div>;
      },
      editComponent: (props) => (
        <select
          value={props.value ? "True" : "False"}
          onChange={(e) => props.onChange(e.target.value === "True")}
        >
          <option value="True">Active</option>
          <option value="False">Inactive</option>
        </select>
      ),
    }
    
    
,    
    // {
    //   title: "Status",
    //   field: "status",
    //   render: (rowData) => {
    //     if (rowData.tableData.editing) {
    //       return (
    //         <Select
    //           value={rowData.status}
    //           onChange={(e) => {
    //             const updatedRowData = {
    //               ...rowData,
    //               status: e.target.value === "true",
    //             };
    //             const updatedData = [...tableData];
    //             updatedData[rowData.tableData.id] = updatedRowData;
    //             setTableData(updatedData);
    //           }}
    //         >
    //           <MenuItem value={true}>True</MenuItem>
    //           <MenuItem value={false}>False</MenuItem>
    //         </Select>
    //       );
    //     }

    //     return <div>{rowData.status ? "True" : "False"}</div>;
    //   },
    // },
    {
      title: "Time in Service",
      field: "time_in_service",
      align: "center",
      grouping: false,
      type: 'date',
      cellStyle: {minWidth: 110 },
      dateSetting: {
        format: 'dd/MM/yyyy'
      },
      render: (rowData) => {
        const purchaseDate = new Date(rowData.time_in_service);
        const formattedDate = purchaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <div>{formattedDate}</div>;
      },
      searchable: false,
      export: true,

      filtering: false, // Remove filter option for this column
    },
    {
      title: "Next Maintenance",
      field: "Next_maintainance",
      type: 'date',
      cellStyle: {minWidth: 110 },
      dateSetting: {
        format: 'dd/MM/yyyy'
      },
      render: (rowData) => {
        const purchaseDate = new Date(rowData.Next_maintainance);
        const formattedDate = purchaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        if (rowData.tableData.editing) {
          return (
            <input
              type="date"
              value={rowData.Next_maintainance}
              onChange={(e) => {
                const updatedRowData = {
                  ...rowData,
                  Next_maintainance: e.target.value,
                };
                const updatedData = [...tableData];
                updatedData[rowData.tableData.id] = updatedRowData;
                setTableData(updatedData);
              }}
            />
          );
        }

        return <div>{formattedDate}</div>;
      },
      searchable: false,
      export: true,
      filtering: false, // Remove filter option for this column
    },
    {
      title: "Purchase Year",
      field: "purchase_year",
      cellStyle: {minWidth: 110 },
      // lookup: { M: "2023", F: "2024" },
      type: 'date',
      dateSetting: {
        format: 'dd/MM/yyyy'
      },
      render: (rowData) => {
        const purchaseDate = new Date(rowData.purchase_year);
        // const formattedDate = purchaseDate.toLocaleDateString("en-US", {
        //   year: "numeric",
        // });
        const formattedDate = purchaseDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return <div>{formattedDate}</div>;
      },
      searchable: false,
      export: true,

      filtering: false, // Remove filter option for this column
    },
    // {
    //   title: "Aircraft Type",
    //   field: "aircraft_type",
    //   filterPlaceholder: "filter",
    // },
    
    
  ];
 
  let [state, setState] = React.useState([]);

  

  let handleDelete = async (id) => {
    // await axios.delete(`${id}`);
    window.location.assign("/dronelist");
    // const handleEdit = e => {};
  };

  // console.log(columns, "columns===>");
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <>
          <div
            className="content"
            style={{
              backgroundColor:
                color == "green"
                  ? "rgba(255,140,49,.05)"
                  : color == "primary"
                  ? "rgba(253,101,113,.05)"
                  : "rgba(65, 195, 199,.03)",
            }}
          >
            <AddDrone />

            <div className="drone-list-image">
              <div className="w-100"></div>
              <br />
              <div className="col-lg-12"></div>
              <h3 className="drone-list-text">Drone List</h3>
              <div className="row">
                <div className="col-lg-12">
                  {/* <img className="drone-list-img"
              src={drone}
              alt=""
              class="responsive"
              style={{ height: "220px", marginBottom:"18px" }}
            /> */}
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <Row>
                <Col md="12">
                  <MaterialTable
                    columns={columns}
                    data={tableData}
                    editable={{
                      onRowAdd: (newRow) =>
                        new Promise((resolve, reject) => {
                          setTableData([...tableData, newRow]);

                          setTimeout(() => resolve(), 500);
                        }),
                      onRowUpdate: async (newRow, oldRow) => {
                      
                        try {
                          const updatedData = [...tableData];
                          updatedData[oldRow.tableData.id] = newRow;

                          const userId1 = localStorage.getItem("user_id");
                          const amxtoken1 = localStorage
                            .getItem("amxtoken")
                            .replace(/"/g, "");
                          // Create the request body
                          const requestBody = {
                            aircraft_type: newRow.aircraft_type,
                            connection_id: newRow.connection_id,
                            model_name: newRow.model_name,
                            purchase_year: newRow.purchase_year,
                            UIN: newRow.UIN,
                            time_in_service: newRow.time_in_service,
                            Next_maintainance: newRow.Next_maintainance,
                            user_id: userId1,
                            drone_id: newRow.id,

                            // ip_address:newRow.ip_address,
                            latitude:newRow.latitude,
                            longitude:newRow.longitude,
                            // location:newRow.location,
                            Status:newRow.Status,



                          };
                            console.log(requestBody)
                          const config1 = {
                            headers: {
                              Authorization: amxtoken1,
                            },
                          };
                          // Make the API call to update the data
                          const response = await axios.put(
                            "https://fibregrid.amxdrones.com/dronecount/addDrone/",
                            requestBody,
                            config1
                          );

                          setTableData(updatedData);

                          toast.success("Drone updated successfully");
                          setTimeout(()=>{

                            window.location.reload();
                          },2000)
                          
                        } catch (error) {
                          console.error(
                            "An error occurred while updating data:",
                            error
                          );
                          setUpdatingRow(false);
                          toast.error("An error occurred while updating data");
                        } 
                      },

                      // onRowUpdate: (newRow, oldRow) =>
                      //   new Promise((resolve, reject) => {
                      //     const updatedData = [...tableData];
                      //     updatedData[oldRow.tableData.id] = newRow;
                      //     setTableData(updatedData);
                      //     setTimeout(() => resolve(), 500);
                      //   }),

                      onRowDelete: async (selectedRow) => {
                        try {
                          const { id } = selectedRow; // Assuming the selected row has a 'drone_id' property
                          console.log(selectedRow.id);

                          const userId1 = localStorage.getItem("user_id");
                          const amxtoken1 = localStorage
                            .getItem("amxtoken")
                            .replace(/"/g, "");
                          const config1 = {
                            params: {
                              user_id: userId1,
                            },
                            headers: {
                              Authorization: amxtoken1,
                            },
                            data: {
                              // Add the payload to the request body
                              drone_id: id,
                            },
                          };

                          // console.log("config1 ==>", config1);

                          const response = await axios.delete(
                            "https://fibregrid.amxdrones.com/dronecount/deldrone/",
                            config1
                          );

                          // console.log(response.data, "dronedata ===>");

                          // Delete the row from the table data
                          const updatedData = [...tableData];
                          updatedData.splice(selectedRow.tableData.id, 1);
                          setTableData(updatedData);

                          toast.success("Drone deleted successfully");
                        } catch (error) {
                          console.error(
                            "An error occurred while deleting data:",
                            error
                          );
                          toast.error("An error occurred while deleting data");
                        }
                      },

                      // onRowDelete: (selectedRow) =>
                      // new Promise((resolve, reject) => {
                      //   console.log(selectedRow.id); // Print the selectedRow object

                      //   const updatedData = [...tableData];
                      //   updatedData.splice(selectedRow.tableData.id, 1);
                      //   setTableData(updatedData);
                      //   setTimeout(() => resolve(), 1000);
                      // })
                    }}
                    // actions={[
                    //   {
                    //     icon: () => <GetApp />,
                    //     tooltip: "Click me",
                    //     onClick: (e, data) => console.log(data),
                    //     // isFreeAction:true
                    //   },
                    // ]}
                    // onSelectionChange={(selectedRows) =>
                    //   console.log(selectedRows)
                    // }
                    options={{
                      // sorting: true,
                      search: true,
                      searchFieldAlignment: "right",
                      searchAutoFocus: true,
                      searchFieldVariant: "standard",
                      // filtering: true,
                      paging: true,
                      // pageSizeOptions: [5, 10, 15, 20, 25, 50, 75, 100],
                      pagination: tableData.length > 0, // Show pagination if there's data

                      // Dynamically generate pageSizeOptions based on available data
                      pageSizeOptions: [5,10, 15, 20, 25,30, 50, 75, 100]
                        .filter(option => option <= tableData.length), // Filter out options larger than data size
                  
                      pageSize: 5,
                      paginationType: "stepped",
                      showFirstLastPageButtons: false,
                      paginationPosition: "bottom",
                      exportButton: true,
                      exportAllData: true,
                      exportFileName: "TableData",
                      addRowPosition: "first",
                      actionsColumnIndex: -1,
                      selection: false,
                      showSelectAllCheckbox: false,
                      showTextRowsSelected: false,
                      selectionProps: (rowData) => ({
                        disabled: rowData.age == null,
                        // color:"primary"
                      }),
                      // grouping: true,
                      columnsButton: true,
                      rowStyle: (data, index) =>
                        index % 2 === 0 ? { background: "#f5f5f5" } : null,
                      headerStyle: { background: "#f44336", color: "#fff" },
                    }}
                    title="Drone Information"
                    icons={{ Add: () => null }}
                    // icons={{ Add: () => <Add /> }}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default DroneList;
