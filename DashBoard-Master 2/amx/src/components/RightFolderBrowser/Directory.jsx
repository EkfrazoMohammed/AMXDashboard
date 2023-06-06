import { useState } from "react";
import "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/components/RightFolderBrowser/Directory.css"
import projectblue from "/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/views/assets/images/project-folder-blue.png"
import { ImageConfig } from "views/DropFileInput/config/ImageConfig";

const Directory = ({ files,CallBack }) => {
    const [isExpanded, toggleExpanded] = useState(false);
    const toggleExpandedFuction = (item) => {
        console.log("1========1",item)
        toggleExpanded(!isExpanded)
        // console.log("call_backed_to_parent",item)
        CallBack(files.id)
        // setaddprojectopen(true)
      };
    if (files.type === 'folder') {
        return (
            <div className="folder1">
                {/* <div className="wrap">  */}
               
                <div className="folder-title" onClick={(files) =>toggleExpandedFuction (files) }> <img src={projectblue} style={{ width: "14px", height: "14px",marginRight:'5px',backgroundColor:isExpanded ?'red':null}} />{files.name}</div><br />
                {
                    isExpanded && files.items.map((item) => <Directory files={item} CallBack={(item) => CallBack(item)}/>)
                }
                {/* </div> */}
                
            </div>
        )
    }
    return (
        <>
            <div onClick={()=>CallBack(files.id) } className="file-name"><img style={{fontSize:12, height:15,width:15,marginRight:'5px'}} src={ImageConfig[files.name.split('.')[1]] || ImageConfig['default']} alt="" />
{files.name}</div><br />
        </>
    )
}

export default Directory;