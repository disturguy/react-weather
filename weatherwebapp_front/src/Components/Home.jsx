// import Sidebar from "./Sidebar/Sidebar";
// import data from '../Jsons/coordinates'
// import { useHistory } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary'
// import Header from './Header';
// import WeatherMap from './Map/WeatherMap'
// import MyGoogleMap from './map2/GoogleMap'

import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import WeatherMap from "./MapGL/Maps";
import { Container, Row, Col, Button, Jumbotron } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withNamespaces } from "react-i18next";
import convertTimestamp from "../scripts/convertTimestamp";
import onSearch from "../scripts/api_calls/current_weather";
import revGeoloc from "../scripts/api_calls/rev_geoloc";

const Home = ({ t, collapsed, handleToggleSidebar, handleCollapsedChange }) => {
  const [lnglat, setCoordinates] = useState({
    coordinates: ["10.10", "10.10"],
  });
  // const [results, setResults] = useState({weather_state: '-', weather_forecast_datetime: '-', weather_min_temp: '-', weather_max_temp: '-', weather_icon: '01d' });
  const [results, setResults] = useState({ data: {} });
  const [cityname, setCityName] = useState({ name: "", country: "" });
  // const history = useHistory();

  const customId = "toast_id";
  const Msg = ({ message }) => <h4>{message}</h4>;
  const notify = (message) =>
    toast.info(<Msg message={message} />, { toastId: customId });

  // function ErrorFallback({ error }) {

  //     return (
  //         <div role="alert">
  //             <p>Something went wrong:</p>
  //             <pre style={{ color: 'red' }}>{error.message}</pre>
  //         </div>
  //     )
  // }

  /* <Row>
          <Col className="block">
            <Switch
              height={16}
              width={30}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={handleImageChange}
              checked={image}
              onColor="#219de9"
              offColor="#bbbbbb"
            />
            <span> {t("image")}</span>
          </Col>
        </Row> */

  return (
    // <ErrorBoundary
    //     FallbackComponent={ErrorFallback}>
    <>
      <Container fluid>
        <Row>
          <Col>
            <Row>
              <Col>
                <Container fluid>
                  <Jumbotron fluid>
                    <Container fluid>
                      <Row>
                        <Col>
                          {results.data.mainInfo === undefined ? null : (
                            <h1>{cityname.name + " " + cityname.country}</h1>
                          )}
                          <p>{t("jumbotron_message")}</p>
                          <p>
                            <Button
                              onClick={() => {
                                onSearch(lnglat)
                                  .then((res) => {
                                    console.log(res);
                                    setResults({ data: res.data });
                                  })
                                  .catch((error) => {
                                    notify(t(error.message));
                                  });
                                revGeoloc(lnglat)
                                  .then((res) => {
                                    setCityName({
                                      name: res.data.address.county,
                                      country: res.data.address.country,
                                    });
                                  })
                                  .catch((error) => {
                                    notify(t(error.message));
                                  });
                              }}
                            >
                              {t("Current Weather")}
                            </Button>
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </Jumbotron>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                {results.data.mainInfo === undefined ? null : (
                  <>
                    <Row>
                      <Col>
                        <Container fluid>
                          <Row>
                            <Col>
                              <WeatherCard
                                dt={convertTimestamp(
                                  results.data.timeOfDataCalculation
                                )}
                                temp_min={results.data.mainInfo.tempMin}
                                temp_max={results.data.mainInfo.tempMax}
                                main={results.data.weatherDescription[0].main}
                                icon={results.data.weatherDescription[0].icon}
                              />
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <hr />
                      </Col>
                    </Row>
                  </>
                )}
                <Row>
                  <Col>
                    <Container fluid>
                      <Row>
                        <Col>
                          <WeatherMap
                            Coord={(lnglat) => {
                              setCoordinates({
                                coordinates: lnglat.coordinates,
                              });
                              console.log("parent " + lnglat.coordinates);
                            }}
                          />
                          {/* <MyGoogleMap /> */}
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
    // </ErrorBoundary>
  );
};

export default withNamespaces()(Home);
