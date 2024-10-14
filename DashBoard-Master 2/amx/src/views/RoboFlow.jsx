import React, { useState, useEffect, useRef } from "react";
import './../views/styles/Login.css';
import "../../src/views/assets/css/style.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Circles } from 'react-loader-spinner';

function RoboFlow() {
  const sampleVideoUrl = process.env.PUBLIC_URL + "/sampleVideo.html";
  const tensorflowUrl = process.env.PUBLIC_URL + "/roboflowtensorflow.html";
  const [toggleSection, setToggleSection] = useState(true);
  const [isPersonChecked, setIsPersonChecked] = useState(false); 
  const [iframeUrl, setIframeUrl] = useState(sampleVideoUrl); 

  const [socket, setSocket] = useState(null);
  const videoRef = useRef(null);
  

  const [annotatedFrame, setAnnotatedFrame] = useState(null);
  const [file, setFile] = useState(null);
  const [loader,setLoader] = useState(false)
  
  useEffect(() => {
      return () => {
          if (socket) {
              socket.close();
          }
      };
  }, [socket]);
  
  useEffect(() => {
    if (file) {
        handleFileUpload();
    }
  }, [file]);
  
  const handleFileUpload = () => {
      if (!file)  return alert("NO file");
  setLoader(true)
      const reader = new FileReader();
      reader.onload = () => {
          const base64File = reader.result.split(',')[1];
  
          const newSocket = new WebSocket('wss://fibregrid.amxdrones.com/ws/videos/');
          setSocket(newSocket);
  
          newSocket.addEventListener('open', () => {
              console.log("websocket connected");
              newSocket.send(JSON.stringify({ file: base64File }));
          });
  
          newSocket.addEventListener('message', (event) => {
              const data = JSON.parse(event.data);
              console.log(data);
              if (data.annotated_frame) {
                setLoader(false)
                  setAnnotatedFrame(`data:image/jpeg;base64,${data.annotated_frame}`);
              } else if (data.message === 'Video processing completed') {
                  console.log('Video processing completed');
                  newSocket.close();
                  setSocket(null);
              }
          });
  
          newSocket.addEventListener('close', () => {
              console.log('websocket disconnected');
          });
      };
      reader.readAsDataURL(file);
  };
  const handleFileChange = async(event) => {
      setFile(event.target.files[0]);
  };
  const handleStop = () => {
      if (socket) {
          socket.close();
          setSocket(null);
          console.log('websocket manually closed');
          setAnnotatedFrame(false)
          setLoader(false)
      }
  
  };
  
  useEffect(() => {
    setIframeUrl(isPersonChecked ? tensorflowUrl : sampleVideoUrl);
  }, [isPersonChecked]);

  return (
    <div className="content">
      <Row>
          {loader ? (
                <Col lg="6" md="12" style={{ height: '72vh' }}>
                  
            <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
              <Circles height="80" width="80" color="#5a5ce5" ariaLabel="circles-loading" visible />
            </div>
            </Col>
          ) : (
            <>
              
                  {toggleSection ? (
                    <>
                    {!annotatedFrame ? (
                <>
                      <Col lg="6" md="12" style={{ height: '72vh' }}>
                        <h1 style={{
                          fontSize: "1.4rem",
                          color: "#525f7f",
                          fontWeight: "600"
                        }}>Video Analytics</h1>
                        <div className="file-input">
                          <input
                            type="file"
                            id="file-input"
                            className="file-input__input"
                            onChange={handleFileChange}
                            accept="video/*"
                          />
                          <label className="file-input__label" htmlFor="file-input">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"/>
                            </svg>
                            <span>Upload file</span>
                          </label>
                        </div>
                        <iframe
                          className="my-roboflow-iframe"
                          title="iframe"
                          src={iframeUrl}
                          id="iframeId"
                          style={{ width: '100%' }}
                        ></iframe>
                      </Col>
                    </>
                  )
                  :    <>
                      <Col lg="6" md="12" style={{ height: '72vh' }}>
                  
                  <div onClick={handleStop} className="" style={{backgroundImage: 'linear-gradient(to bottom left, #FD6585, #FA742B, #FD6585)',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',color:'#fff',textAlign:'center',padding:'0.5rem',width:'80px',borderRadius:'5px',cursor:'pointer',fontWeight:'600'}}>BACK</div>
        <div className="" style={{marginTop:"2rem"}}>
                          <img
                              id="annotatedImage"
                              src={annotatedFrame}
                              alt="Annotated Frame"
                              style={{ width: '100%', height: '400px' }}
                          />
                      </div>
                      </Col>

                </>
                }
                </>
                  )
                  : (
                    <>
                      <div onClick={() => setToggleSection(true)} style={{
                        backgroundImage: 'linear-gradient(to bottom left, #FD6585, #FA742B, #FD6585)',
                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)', 
                        color: '#fff', 
                        textAlign: 'center', 
                        padding: '0.5rem', 
                        width: '80px', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        fontWeight: '600'
                      }}>BACK</div>
                      <video ref={videoRef} style={{ width: '50%' }} controls autoPlay />
                    </>
                  )}
                </>
              )}
              <Col lg="6" md="12">
                <Card className="card-tasks" style={{ height: "auto" }}>
                  <CardHeader>
                    <h6 className="title d-inline">Plugins (1)</h6>
                  </CardHeader>
                  <CardBody>
                    <div className="table-full-width table-responsive">
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <FormGroup check>
                                <Label check>
                                  <Input
                                    type="checkbox"
                                    checked={isPersonChecked}
                                    onChange={() => setIsPersonChecked(!isPersonChecked)}
                                  />
                                  <span className="form-check-sign">
                                    <span className="check" />
                                  </span>
                                </Label>
                              </FormGroup>
                            </td>
                            <td>
                              <p className="title">Person</p>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Analysis</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Objects</th>
                          <th className="text-center">Counts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Monuments</td>
                          <td className="text-center">0</td>
                        </tr>
                        <tr>
                          <td>Trees/Plants</td>
                          <td className="text-center">0</td>
                        </tr>
                        <tr>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
        
      </Row>
    </div>
  );
}

export default RoboFlow;
