import React, { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Home from "./Home";
import Forecast from './Forecast';
import Statistics from './Statistics';
import UserInfo from './UserInfo';
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";


function Layout({ t, route }) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  //`app ${toggled ? "toggled" : ""}`
  return (
    <div className={`flex-container`}>
      <div className="flex-child">
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
      <div className="flex-child" style={{ height: "100vh"}}>
        <Container fluid>
          <Row>
            <Col>
              <div
                className="btn-toggle"
                onClick={() => {
                  handleToggleSidebar(true);
                  handleCollapsedChange(!collapsed);
                  console.log(collapsed + "    " + toggled)
                }}
              >
                {collapsed ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
              </div>
            </Col>
          </Row>
        </Container>
        {route === "home" ?
          <Home /> : <></>}
        {route === "forecast" ?
          <Forecast /> : <></>}
        {route === "statistics" ?
          <Statistics /> : <></>}
        {route === "userinfo" ?
          <UserInfo /> : <></>}
      </div>
    </div>
  );
}

export default Layout;
