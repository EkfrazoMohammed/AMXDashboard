import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import "../projects/Project.css"

import { BackgroundColorContext, backgroundColors } from "contexts/BackgroundColorContext";
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RightFolderBrower from 'components/RightFolderBrowser/RightFolderBrower';
import {ToastContainer, toast} from 'react-toastify';
import drone from "../../assets/drone.png"

import pdfImage from "../../../src/views/assets/images/fileimagesLogo/pdf.png";
import mp4Logo from "../../../src/views/assets/images/fileimagesLogo/mp4logo.png";
import fileImageLogo from "../../../src/views/assets/images/fileimagesLogo/textlogo.png";
import imageLogo from "../../../src/views/assets/images/fileimagesLogo/imgeLogo.png";
import backImage from "../../../src/views/assets/images/fileimagesLogo/backImage.png";
import DropFileInput from "views/DropFileInput/DropFileInput";


const folder_list = [
  {
    'project_name': 'RAW DATA',
    'folder_color': '#D65A47',
    'link':'/'
  },
  {
    'project_name': 'PROCESS DATA',
    'folder_color': 'rgb(64,153,173)',
    'link':'/amx/processdata'

  },
  {
    'project_name': 'DGPS DATA',
    'folder_color':  'rgb(239,185,93)',
    'link':'/amx/processdata'


  },
  {
    'project_name': 'VIDEO',
    'folder_color': 'rgb(55,109,236)',
    'link':'/amx/processdata'

  },
  {
    'project_name': 'ADDITIONAL DATA',
    'folder_color':'#D65A47',
    'link':'/amx/processdata'

  }
  
]
const Child = () => {
  const [allprojectdata, SetAllProjectData] = React.useState({});
  let location = useLocation();
  const goBack = () => {
    window.history.back();
    // history.push("/amx/folders?folder_id=" + localStorage.getItem('folder_id'));
    // window.location.reload();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  useEffect(() => {
    GetAllProjectsData()
    toast.info('Pleae note other features are in development !', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <img src={drone}/>
      });
  },[])
  
  let GetAllProjectsData = async () => {
    console.log(location.state.all_data,'subproject===>')
    SetAllProjectData(location.state.all_data)
  }

  const history = useHistory();
  const PushToCreateProject = (item) => {
    history.push('/amx/subchild',{all_data:item});
   };

  // console.log(location.state.all_data,'location.state====>')
  return (
    <BackgroundColorContext.Consumer>
    {({ color }) => (
    <>
    <ToastContainer />

    {/* <div className="dashboard-header">
      <br />
      <i className="profile-icon bi bi-person-circle"></i>
    </div> */}
    

    <div className="content">
   

        <h2 style={{fontSize:"25px"}}>{allprojectdata.name}</h2>
        <div className="row">
                    <div
                      className="col-1"
                      onClick={goBack}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={backImage} alt="" height={25} />
                    </div>
                  </div>
      <div style={{}} className="row">

       
          {allprojectdata.folders ? 
          
          allprojectdata.folders.map((item) =>
          //  <div  className="row">
          <>
           <div onClick={()=> PushToCreateProject(item)}>
           <div className="file-cards">
            <div style={{  }} className="col-lg-2 col-sm-2 col-md-2 mb-5 mt-5">
              {/* <div style={{justifyContent:"center"}} className="col-lg-2 col-sm-12 col-md-3"> */}
                <div data={color} style={{alignContent:"center"}} class="folder">

                  {/* <div class="folder-inside" style={{backgroundColor:item.folder_color}}> */}
                  <div class="folder-inside" style={{}}>


                  </div>

                </div>
  
              {/* </div> */}

            </div>
             
        </div>
        <h4 style={{fontSize:12,textAlign:'center', paddingTop: '10px'}}>{item.name}</h4>

        </div>
          </>
          
        // </div>
          )
        :
        null
        }


        
      </div>

      
      {/* <div style={{  height: '30px',marginTop:'20px'  }} className="row">
        <div className="col-lg-2 col-sm-2 col-md-2" style={{ alignItems: "center" , marginLeft:"18px"}}>
          RAW DATA
         </div>
        <Link to="/amx/processdata" style={{ alignItems: "center",marginLeft:"20px" }} className="col-lg-2 col-sm-2 col-md-2">
          PROCESSED DATA
        </Link>
        <div style={{ alignItems: "center" ,marginLeft:"20px"}} className="col-lg-2 col-sm-2 col-md-2">DGPS DATA</div>
        <div style={{ alignItems: "center",marginLeft:"20px"}} className="col-lg-2 col-sm-2 col-md-2">VIDEO</div>
        <div style={{ alignItems: "center",marginLeft:"20px" }} className="col-lg-2 col-sm-2 col-md-2">ADDITIONAL DATA</div> 
      </div> */}

    </div>


    


    
    
  </>
   )}
   </BackgroundColorContext.Consumer>

   
  
  )
}


export default Child
