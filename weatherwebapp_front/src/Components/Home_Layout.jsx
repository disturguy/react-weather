import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useRef } from "react";


function Layout({ t }) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  }; 

  return (
    <div className={`app ${toggled ? "toggled" : ""} flex-container`}>
      <div className="flex-child">
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className="flex-child">
        <Container fluid>
        <Row>
          <Col>
            <div
              className="btn-toggle"
              onClick={() => {
                handleToggleSidebar(true);
                handleCollapsedChange(!collapsed);
                console.log(collapsed+"    "+toggled)
              }}
            >
              {collapsed ? <FaChevronCircleLeft/> : <FaChevronCircleRight/>}
            </div>
          </Col>
        </Row>
        </Container>
        <Home
          toggled={toggled}
          collapsed={collapsed}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
      </div>
    </div>
  );
}

export default Layout;
