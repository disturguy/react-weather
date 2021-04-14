import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import * as FA from "react-icons/fa";
import { Button, Container, Row, Col } from "react-bootstrap";
import sidebarBg from "../../assets/images/bg1.jpg";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import i18n from "../../i18n";
import { withNamespaces } from "react-i18next";

function Sidebar({ t, collapsed, toggled, handleToggleSidebar }) {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <IconContext.Provider value={{ size: "50px" }}>
        <ProSidebar
          image={sidebarBg}
          collapsed={collapsed}
          toggled={toggled}
          breakPoint="md"
          onToggle={handleToggleSidebar}
        >
          <SidebarHeader>
            <Row
              style={{
                padding: "30px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 30,
                letterSpacing: "2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Col>{t("sidebarTitle")}</Col>
            </Row>
          </SidebarHeader>

          <SidebarContent>
            <Menu>
              <MenuItem
                icon={<FA.FaHome />}
                style={{
                  fontSize: 20,
                  paddingTop: "25px",
                  paddingBottom: "50px",
                }}
              >
                {t("home")}
                <Link to="/" />
              </MenuItem>
              <MenuItem
                icon={<FA.FaSun />}
                style={{ fontSize: 20, paddingBottom: "50px" }}
              >
                {t("forecast")}
                <Link to="/forecast" />
              </MenuItem>
              <MenuItem
                icon={<FA.FaCodepen />}
                style={{ fontSize: 20, paddingBottom: "50px" }}
              >
                {t("statistics")}
                <Link to="/stats" />
              </MenuItem>
              <MenuItem
                icon={<FA.FaUser />}
                style={{ fontSize: 20, paddingBottom: "50px" }}
              >
                {t("userinfo")}
                <Link to="/userinfo" />
              </MenuItem>
            </Menu>
          </SidebarContent>

          <SidebarFooter style={{ textAlign: "center" }}>
            <Row
              style={{
                padding: "20px 24px",
              }}
            >
              <Col>
                <a
                  href="https://github.com/disturguy/react-weather"
                  target="_blank"
                  className="sidebar-btn"
                  rel="noopener noreferrer"
                >
                  <FA.FaGithub />
                  <span> {t("viewSource")}</span>
                </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  <Button onClick={() => changeLanguage("en")}>en</Button>
                </span>
                <span> </span>
                <span>
                  <Button onClick={() => changeLanguage("gr")}>gr</Button>
                </span>
              </Col>
            </Row>
          </SidebarFooter>
        </ProSidebar>
      </IconContext.Provider>
    </>
  );
}

export default withNamespaces()(Sidebar);
