import React, { useState } from "react";
import Charts from "./Charts/Charts";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../assets/css/Hint.css";
import { Hint } from "react-autocomplete-hint";
// import data from '../jsons/coordinates';
import convertTimestamp from "../scripts/convertTimestamp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withNamespaces } from "react-i18next";
import forecastDaily from "../scripts/api_calls/forecastDaily";
import fetchLocation from "../scripts/api_calls/fetchLocation";
import autoComplete from "../scripts/api_calls/autoComplete";

// axios.interceptors.response.use(
//     response => response,
//     error => {
//       // We really want to throw the error so it is handled and we
//       // don't get an unhandledrejection error. By throwing here, we
//       // are handling the rejection, and bubbling up to the closest
//       // error handler (try/catch or catch method call on a promise).
//       throw error
//     }
//   )

const Statistics = ({ t }) => {
  const [hintData, setHintData] = useState([]);
  const [city, setCity] = useState("");
  const [results, setResults] = useState({ data: {} });
  const [latlng, setlatlng] = useState({ lat: "10.10", lon: "10.10" });
  const [view, setView] = useState(false);

  const customId = "toast_id";
  const Msg = ({ message }) => <h4>{message}</h4>;
  const notify = (message) =>
    toast.info(<Msg message={message} />, { toastId: customId });

  return (
    <Container fluid>
      <Row>
        <Col>
          <Container fluid>
            <Row>
              <Col style={{ width: "100vh" }}>
                <Hint options={hintData} allowTabFill>
                  <input
                    className="input-with-hint"
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                      autoComplete()
                        .then((hintArray) => {
                          setHintData(hintArray);
                        })
                        .catch((error) => {
                          notify(t(error.message));
                        });
                    }}
                  />
                </Hint>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    fetchLocation()
                      .then((res) => {
                        console.log(res.data);
                        if (res.data[0] !== undefined) {
                          setlatlng({
                            lat: res.data[0].lat,
                            lon: res.data[0].lon,
                          });
                        } else {
                          throw new Error("alert4");
                        }
                      })
                      .catch((error) => {
                        notify(t(error.message));
                      });
                    forecastDaily(latlng)
                      .then((res) => {
                        if (res.data.daily !== undefined) {
                          setResults({ data: res.data });
                        } else {
                          throw new Error("alert4");
                        }
                      })
                      .then(() => {
                        setView(true);
                      })
                      .catch((error) => {
                        //console.log(error)
                        notify(t(error.message));
                      });
                  }}
                >
                  {t("Check Stats")}
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
          <Container fluid>
          <Row>
            <Col>
              {view === false ? null : (
                <Charts
                  data={{
                    data1: [
                      (results.data.daily[0].temperature.maximum +
                        results.data.daily[0].temperature.minimum) /
                        2,
                      (results.data.daily[1].temperature.maximum +
                        results.data.daily[1].temperature.minimum) /
                        2,
                      (results.data.daily[2].temperature.maximum +
                        results.data.daily[2].temperature.minimum) /
                        2,
                      (results.data.daily[3].temperature.maximum +
                        results.data.daily[3].temperature.minimum) /
                        2,
                      (results.data.daily[4].temperature.maximum +
                        results.data.daily[4].temperature.minimum) /
                        2,
                      (results.data.daily[5].temperature.maximum +
                        results.data.daily[5].temperature.minimum) /
                        2,
                      (results.data.daily[6].temperature.maximum +
                        results.data.daily[6].temperature.minimum) /
                        2,
                      (results.data.daily[7].temperature.maximum +
                        results.data.daily[7].temperature.minimum) /
                        2,
                    ],
                    data2: [
                      results.data.daily[0].weather[0].main,
                      results.data.daily[1].weather[0].main,
                      results.data.daily[2].weather[0].main,
                      results.data.daily[3].weather[0].main,
                      results.data.daily[4].weather[0].main,
                      results.data.daily[5].weather[0].main,
                      results.data.daily[6].weather[0].main,
                      results.data.daily[7].weather[0].main,
                    ],
                    data3: [
                      convertTimestamp(results.data.daily[0].dateTime),
                      convertTimestamp(results.data.daily[1].dateTime),
                      convertTimestamp(results.data.daily[2].dateTime),
                      convertTimestamp(results.data.daily[3].dateTime),
                      convertTimestamp(results.data.daily[4].dateTime),
                      convertTimestamp(results.data.daily[5].dateTime),
                      convertTimestamp(results.data.daily[6].dateTime),
                      convertTimestamp(results.data.daily[7].dateTime),
                    ],
                  }}
                />
              )}
            </Col>
          </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default withNamespaces()(Statistics);
