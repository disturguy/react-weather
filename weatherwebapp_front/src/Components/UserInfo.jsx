import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const UserInfo = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Container fluid>
            <Row align="center" style={{ height: "100px", width:"100vh" }}>
              <Col>
                <h1 colo>Αλλαγή Στοιχείων Χρήστη</h1>
              </Col>
            </Row>
            <Row align="end" style={{ height: "300px" }}>
              <Col sm={4}>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
