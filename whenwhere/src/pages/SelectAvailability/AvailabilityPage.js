import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AvailabilityGrid } from './AvailabilityGrid.js';
import { GroupGrid } from './GroupGrid.js';
// import LoginPage from '../loginpage.js'

export const AvailabilityPage = () => {
  const meetingId = window.location.href.split('/')[3];

  const getMeetingById = async () => {
    try {
      const response = await fetch(`/w/viewevent/${meetingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      throw new Error('Problem with fetching meeting');
    }
  };

  useEffect(() => {
    getMeetingById();
  }, []);

  return (
    <div id="YouAvailability" className="YouGrid">
      <Container>
        <Row className="min-vh-100">
          <Col md={6} className="p-5 d-flex flex-column text-white">
            <Row>
              <Col>
                <AvailabilityGrid />
                {/* <LoginPage /> */}
              </Col>
            </Row>
          </Col>

          <Col md={6} className="p-5 d-flex flex-column text-white">
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
