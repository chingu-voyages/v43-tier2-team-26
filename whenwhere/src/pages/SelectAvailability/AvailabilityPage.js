import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AvailabilityGrid } from './AvailabilityGrid.js'
import { GroupGrid } from './GroupGrid.js'


export const AvailabilityPage = () => {
  return (
    <div id="YouAvailability" className="YouGrid">
      <Container>
        <Row>
          <Col md={6}>
            <Row>
              <Col>
                <h2>Enter your availability</h2>
                <p>click on time slots to select/deselect</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <AvailabilityGrid />
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Row>
              <Col>
                <h2>Group availability</h2>
                <p>available times are shown in green</p>
              </Col>
            </Row>

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