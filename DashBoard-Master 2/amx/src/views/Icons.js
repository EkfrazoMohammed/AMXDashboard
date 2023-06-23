// import * as React from "react";
import React, { useEffect, useState } from "react";
// import MaterialTable from "material-table";

import MaterialTable from "material-table";

import { GetApp, Add } from "@material-ui/icons";

import drone from "../assets/img/drone.webp";
import "./Icons.css";
// import { } from '@fortawesome/free-solid-svg-icons'
// import { Row, Col } from "reactstrap";

import { Row, Col } from "reactstrap";

import { useMemo } from "react";
// import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination, useRowSelect } from 'react-table';

import axios from "axios";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
// import MaterialTable from "material-table";

import TableData from "./TableData";

// { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
// { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
// { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
// { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
// { name: "Neha", email: "neha@gmail.com", phone: 7845621301, age: 25, gender: "F", city: "Patna", fee: 748521 },
// { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
// { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
// { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },
// { name: "Raj", email: "Raj@gmail.com", phone: 7894561230, age: null, gender: "M", city: "Chennai", fee: 78456 },
// { name: "Mohan", email: "mohan@gmail.com", phone: 7845621590, age: 35, gender: "M", city: "Delhi", fee: 456125 },
// { name: "Sweety", email: "sweety@gmail.com", phone: 741852912, age: 17, gender: "F", city: "Noida", fee: 458796 },
// { name: "Vikas", email: "vikas@gmail.com", phone: 9876543210, age: 20, gender: "M", city: "Mumbai", fee: 874569 },

function DroneList() {
  const [tableData, setTableData] = useState([]);

  let GetAllDrone = async () => {
    try {
      let data = await axios.get(
        "https://fibregrid.amxdrones.com/dronecount/addDrone/"
      );
      console.log(data, "dronedata====>");
      setTableData(data.data);
      // toast(`Successfully ${project_name}  project data was created`);
      // navigate("/");
      // CloseProject()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllDrone();
  }, []);

  const columns = [
    {
      title: "Model Name",
      field: "model_name",
      sorting: false,
      filtering: false,
      cellStyle: { background: "#009688" },
      headerStyle: { color: "#fff" },

      render: (rowData) => (
        <div>
          {rowData.model_name}
        </div>
      ),
      
    },
    { title: "UIN", field: "UIN", filterPlaceholder: "filter" },
    {
      title: "Time in Service",
      field: "time_in_service",
      align: "center",
      grouping: false,
      render: (rowData) => {
        const purchaseDate = new Date(rowData.time_in_service);
        const formattedDate = purchaseDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      
        return (
          <div>
            {formattedDate}
          </div>
        );
      }
      
    },
    {
      title: "Next Maintainance",
      field: "Next_maintainance",
      emptyValue: () => <em>null</em>,
      render: (rowData) => {
        const purchaseDate = new Date(rowData.Next_maintainance);
        const formattedDate = purchaseDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      
        return (
          <div>
            {formattedDate}
          </div>
        );
      },
      searchable: false,
      export: false,
    },
    {
      title: "Purchase Year",
      field: "purchase_year",
      lookup: { M: "2023", F: "2024" },
      
      render: (rowData) => {
        const purchaseDate = new Date(rowData.purchase_year);
        const formattedDate = purchaseDate.toLocaleDateString('en-US', {
          year: 'numeric',
        });
      
        return (
          <div>
            {formattedDate}
          </div>
        );
      }
    },
    {
      title: "Aircraft Type",
      field: "aircraft_type",
      filterPlaceholder: "filter",
    },
    {
      title: "Connection Id",
      field: "connection_id",
      currencySetting: { minimumFractionDigits: 1 },
      cellStyle: { background: "#009688" },
      headerStyle: { color: "#fff" },
    },
  ];
  // const Table = ({ data }) => {
  //   const [filterText, setFilterText] = useState({});
  //   const [currentPage, setCurrentPage] = useState(0);
  //   const pageSize = 10; // Number of rows per page

  //   const filteredData = data.filter(item =>
  //     Object.keys(filterText).every(key => item[key].toLowerCase().includes(filterText[key].toLowerCase()))
  //   );

  //   const pageCount = Math.ceil(filteredData.length / pageSize);

  //   const handleFilterChange = (e, column) => {
  //     const value = e.target.value;
  //     setFilterText(prevFilterText => ({
  //       ...prevFilterText,
  //       [column]: value
  //     }));
  //     setCurrentPage(0);
  //   };

  //   const handlePageChange = page => {
  //     setCurrentPage(page);
  //   };

  //   const filteredAndPaginatedData = filteredData.slice(
  //     currentPage * pageSize,
  //     (currentPage + 1) * pageSize
  //   );

  //   return (
  //     <div className="table-container">
  //       <table className="data-table">
  //         <thead>
  //           <tr>
  //             <th>
  //               {/* <input
  //                 type="text"
  //                 value={filterText.id || ''}
  //                 onChange={e => handleFilterChange(e, 'id')}
  //                 placeholder="Filter ID"
  //                 className="filter-input"
  //               /> */}
  //             </th>
  //             <th>
  //               <input
  //                 type="text"
  //                 value={filterText.name || ''}
  //                 onChange={e => handleFilterChange(e, 'name')}
  //                 placeholder="Filter Name"
  //                 className="filter-input"
  //               />
  //             </th>
  //             <th>
  //               <input
  //                 type="text"
  //                 value={filterText.email || ''}
  //                 onChange={e => handleFilterChange(e, 'email')}
  //                 placeholder="Filter Email"
  //                 className="filter-input"
  //               />
  //             </th>
  //             <th>
  //               <input
  //                 type="text"
  //                 value={filterText.phone || ''}
  //                 onChange={e => handleFilterChange(e, 'phone')}
  //                 placeholder="Filter Phone"
  //                 className="filter-input"
  //               />
  //             </th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {filteredAndPaginatedData.map(item => (
  //             <tr key={item.id}>
  //               <td>{item.id}</td>
  //               <td>{item.name}</td>
  //               <td>{item.email}</td>
  //               <td>{item.phone}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //       <div className="pagination-container">
  //         <button
  //           onClick={() => handlePageChange(currentPage - 1)}
  //           disabled={currentPage === 0}
  //           className="pagination-button"
  //         >
  //           Previous
  //         </button>
  //         {Array.from({ length: pageCount }, (_, index) => (
  //           <button
  //             key={index}
  //             onClick={() => handlePageChange(index)}
  //             disabled={currentPage === index}
  //             className={`pagination-button ${currentPage === index ? 'active' : ''}`}
  //           >
  //             {index + 1}
  //           </button>
  //         ))}
  //         <button
  //           onClick={() => handlePageChange(currentPage + 1)}
  //           disabled={currentPage === pageCount - 1}
  //           className="pagination-button"
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   );
  // };

  // old
  let [state, setState] = React.useState([]);

  React.useEffect(() => {
    let fetchData = async () => {
      try {
        let { data } = await axios.get(
          // "http://127.0.0.1:8000/dronecount/addDrone/"
          "https://fibregrid.amxdrones.com/dronecount/addDrone/"
        );
        setState(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  let handleDelete = async (id) => {
    await axios.delete(`${id}`);
    window.location.assign("/dronelist");
    // const handleEdit = e => {};
  };

  console.log(columns, "columns===>");
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

            <div className="container">
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
                      onRowUpdate: (newRow, oldRow) =>
                        new Promise((resolve, reject) => {
                          const updatedData = [...tableData];
                          updatedData[oldRow.tableData.id] = newRow;
                          setTableData(updatedData);
                          setTimeout(() => resolve(), 500);
                        }),
                      // onRowDelete: (selectedRow) =>
                      //   new Promise((resolve, reject) => {
                      //     const updatedData = [...tableData];
                      //     updatedData.splice(selectedRow.tableData.id, 1);
                      //     setTableData(updatedData);
                      //     setTimeout(() => resolve(), 1000);
                      //   }),
                    }}
                    actions={[
                      {
                        icon: () => <GetApp />,
                        tooltip: "Click me",
                        onClick: (e, data) => console.log(data),
                        // isFreeAction:true
                      },
                    ]}
                    onSelectionChange={(selectedRows) =>
                      console.log(selectedRows)
                    }
                    options={{
                      sorting: true,
                      search: true,
                      searchFieldAlignment: "right",
                      searchAutoFocus: true,
                      searchFieldVariant: "standard",
                      filtering: true,
                      paging: true,
                      pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                      pageSize: 5,
                      paginationType: "stepped",
                      showFirstLastPageButtons: false,
                      paginationPosition: "bottom",
                      exportButton: true,
                      exportAllData: true,
                      exportFileName: "TableData",
                      addRowPosition: "first",
                      actionsColumnIndex: -1,
                      selection: true,
                      showSelectAllCheckbox: false,
                      showTextRowsSelected: false,
                      selectionProps: (rowData) => ({
                        disabled: rowData.age == null,
                        // color:"primary"
                      }),
                      grouping: true,
                      columnsButton: true,
                      rowStyle: (data, index) =>
                        index % 2 === 0 ? { background: "#f5f5f5" } : null,
                      headerStyle: { background: "#f44336", color: "#fff" },
                    }}
                    title="Drone Information"
                    icons={{ Add: () => <Add /> }}
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
