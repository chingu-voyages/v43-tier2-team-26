import React, {useState} from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function AvailabilityPage() {
  return (
    <div id="YouAvailability" className="YouGrid">
      <Container>
        <Row>
          <Col>
            <h2>Enter your availability</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <AvailabilityGrid />
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mt-4">
              By submitting your availability, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AvailabilityPage;
        