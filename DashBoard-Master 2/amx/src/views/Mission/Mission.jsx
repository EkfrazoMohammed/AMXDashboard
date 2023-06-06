import React from 'react'
import { Row } from 'reactstrap'

function Mission() {
  return (
    <div className="content">
    <Row>
      {/* <Col md="12"> */}
      <div
              id="map"
              className="map"
              style={{ position: "relative", overflow: "hidden",width:'100%',height: "calc(88vh)"}}
            >
      
      {/* <div class="gmap_canvas"> */}
        <iframe
          style={{width:'100%', height:'100%'}}
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=banglore&t=&z=10&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      {/* </div> */}
            </div>
        {/* <Card className="card-plain">
          <CardHeader>Viewer</CardHeader>
          <CardBody>
            <div
              id="map"
              className="map"
              style={{ position: "relative", overflow: "hidden" }}
            >
      
              <iframe
                  width="100%"
                  height="100%"
                  src={'https://plasio.netlify.app/'}
                  
                ></iframe>
            </div>
          </CardBody>
        </Card> */}
      {/* </Col> */}
    </Row>
  </div>
  )
}

export default Mission