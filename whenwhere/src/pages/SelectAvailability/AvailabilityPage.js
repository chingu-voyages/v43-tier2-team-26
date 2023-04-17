import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AvailabilityGrid } from './AvailabilityGrid.js'
import { GroupGrid } from './GroupGrid.js'
// import LoginPage from '../loginpage.js'


export const AvailabilityPage = () => {
  return (
    <div id="YouAvailability" className="YouGrid">
      <Container>
        <Row className='min-vh-100'>
          <Col md={6} className='p-5 d-flex flex-column text-white'>
            <Row>
              <Col>
                <AvailabilityGrid />
                {/* <LoginPage /> */}
              </Col>
            </Row>
          </Col>

          <Col md={6} className='p-5 d-flex flex-column text-white'>
            <Row>
              <Col>
                <GroupGrid />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};