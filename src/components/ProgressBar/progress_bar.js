import React from 'react'
// import '/Users/apple/Documents/DashBoard-Master/black-dashboard-react-master/src/components/ProgressBar/progress_bar.css';
import './../../components/ProgressBar/progress_bar.css'

const progress_bar = (props) => {
  console.log(props.color,'colorrrr_progress_bar')
  return (
    <div className="skills">
    <div className="skill">
      <div className="skill-name">Disk usage rate</div>
      <div className="skill-bar">
        <div className="skill-per" data={props.color} per="90%" style={{maxWidth:'90%',color:'white'}}></div>
      </div>
    </div>
  
    {/* <div className="skill">
      <div className="skill-name">CSS</div>
      <div className="skill-bar">
        <div className="skill-per" per="70%" style={{maxWidth:'70%'}}></div>
      </div>
    </div>
  
    <div className="skill">
      <div className="skill-name">Javascript</div>
      <div className="skill-bar">
        <div className="skill-per" per="60%" style={{maxWidth:'90%'}}></div>
      </div>
    </div>
   */}
  
  </div>
  
  )
}

export default progress_bar
