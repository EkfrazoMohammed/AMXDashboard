import React, { useState, useEffect, useRef } from "react";
import './../views/styles/Login.css'
import "../../src/views/assets/css/style.css";
// reactstrap components
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
import "./assets/images/drone-icon.png";
import "./assets/images/project-folder-black.png";

function RoboFlow() {
  const myurl = process.env.PUBLIC_URL + "/roboflow.html";
  const mytensorflowurl = process.env.PUBLIC_URL + "/roboflowtensorflow.html";

  const [toggleSection, setTogglesection] = useState(true)
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null)
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log("object")

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);



  const handleFileChange = async (e) => {
    setIsLoading(true);
    try {
      setTogglesection(false)
      const file = e.target.files[0];
      const videoURL = URL.createObjectURL(file);
      setVideo(videoURL)
      if (videoRef.current) {
        videoRef.current.src = videoURL;
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>

      <div className="content">
        <Row style={{ justifyContent: 'center' }}>

          <Col lg="6" md="12">
            {
              toggleSection ?
                <>
                  <h1>Video Analytics</h1>
                  <div className="file-input">
                    <input
                      type="file"
                      id="file-input"
                      className="file-input__input"
                      onChange={handleFileChange}
                      accept="video/*"
                    />
                    <label className="file-input__label" htmlFor="file-input">
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="upload" className="svg-inline--fa fa-upload fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor" d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                      </svg>
                      <span>Upload file</span>
                    </label>
                  </div>
                  <iframe
                    className="my-roboflow-iframe"
                    title="iframe"
                    src={mytensorflowurl}
                    id="iframeId"
                  ></iframe>

                </>
                :
                <>
                  <div onClick={() => setTogglesection(true)} className="" style={{
                    backgroundImage: 'linear-gradient(to bottom left, #FD6585, #FA742B, #FD6585)',
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)', color: '#fff', textAlign: 'center', padding: '0.5rem', width: '80px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600'
                  }}>BACK</div>
                  <video ref={videoRef} style={{ width: '50%', height: '500px' }} controls autoPlay />
                  {/* <video src={video} style={{width:'100%',height:'60%'}} controls autoPlay /> */}
                </>
            }
          </Col>



          <Col lg="6" md="12">
            <Card className="card-tasks" style={{ height: "auto" }}>
              <CardHeader>
                <h6 className="title d-inline">Plugins (1)</h6>

                {/*                <p className="card-category d-inline"> </p>
                <UncontrolledDropdown>
                  <DropdownToggle
                    caret
                    className="btn-icon"
                    color="link"
                    data-toggle="dropdown"
                    type="button"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                */}


              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Person</p>
                        </td>
                        {/* <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td> */}
                      </tr>
                      {/* <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 2</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 3</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip636901683"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip636901683"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">Plugin 4</p>
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            color="link"
                            id="tooltip457194718"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-pencil" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip457194718"
                            placement="right"
                          >
                            Edit Task
                          </UncontrolledTooltip>
                        </td>
                      </tr> */}

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


                    <tr> <td></td></tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RoboFlow;
