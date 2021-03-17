import React, { useState, useEffect } from 'react';
// import Header from './Header';
import WeatherCard from './WeatherCard';
// import WeatherMap from './Map/WeatherMap'
import WeatherMap from './MapGL/Maps'
// import MyGoogleMap from './map2/GoogleMap'
import { Container, Row, Col } from 'react-grid-system';
import { Button, Jumbotron } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar'
// import data from '../Jsons/coordinates'
import axios from 'axios'
import { useHistory } from 'react-router-dom';
// import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withNamespaces } from 'react-i18next';
import convertTimestamp from '../scripts/convertTimestamp'
import error_codes_reference from '../scripts/error_codes_reference'


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

const Home = ({ t }) => {
   
    const [lnglat, setCoordinates] = useState({ coordinates: [-83.376398, 33.9597677] });
    // const [results, setResults] = useState({weather_state: '-', weather_forecast_datetime: '-', weather_min_temp: '-', weather_max_temp: '-', weather_icon: '01d' });
    const [results, setResults] = useState({ data: {} });
    const [cityname, setCityName] = useState({ name: "", country: "" });
    const history = useHistory();
    const CancelToken = axios.CancelToken
    let cancel;
    const notify = (message) => toast(message);

    const promisaki = new Promise((resolve) => {
        resolve(notify(t("alert1")));
    });

    const apiErrorHandling = async (error) => {

            if (axios.isCancel(error)) {
                console.log('Request cancelled successfully.');
                // notify(t("alert1"));
                promisaki.then(()=>{
                    window.location.reload();
                })
                return;
            } else {
                if (error.response.status === 404) {
                    history.replace(history.location.pathname, {
                        errorStatusCode: error.response.status
                    });
                } else if (error.response.status === 409) {
                    notify(error_codes_reference(error.response.data.errorCode));
                }
            } 

    }

    const onSearch = async () => {
        

        if (cancel !== undefined) {
            cancel();
        }

        try {

            //let results = await axios.get(`http://localhost:8080/weather?lat=` + lnglat.coordinates[1] + `&lon=` + lnglat.coordinates[0] + `&appid=c5bca6977c807a27776c8a36988e68c3`, {
            let results = await axios.get(`http://localhost:8080/error_generator`, {
                cancelToken: new CancelToken((c) => {
                    cancel = c;
                })
            });

            console.log(results.data);
            // let results = FetchHook(`http://localhost:8080/weather?lat=` + lnglat.coordinates[1] + `&lon=` + lnglat.coordinates[0] + `&appid=c5bca6977c807a27776c8a36988e68c3`);

            setResults({
                data: results.data
            });

        } catch (error) {
            apiErrorHandling(error);
        }
    };


    const revGeoloc = async () => {
        
        if (cancel !== undefined) {
            cancel();
        }
        try {

            // let response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=c5bca6977c807a27776c8a36988e68c3&lat=`+lnglat.coordinates[1]+`&lon=`+lnglat.coordinates[0]+`&format=json`);
            let response = await axios.get(`http://localhost:8080/v1/reverse.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&lat=-37.870662&lon=144.9803321&format=json`, {
                cancelToken: new CancelToken((c) => {
                    cancel = c;
                })
            });

            // console.log(response);
            setCityName({ name: response.data.address.county, country: response.data.address.country });

        } catch (error) {
            apiErrorHandling(error);
        }
    }

    // function ErrorFallback({ error }) {

    //     return (
    //         <div role="alert">
    //             <p>Something went wrong:</p>
    //             <pre style={{ color: 'red' }}>{error.message}</pre>
    //         </div>
    //     )
    // }

    return (

        // <ErrorBoundary
        //     FallbackComponent={ErrorFallback}>
            <Container fluid>
                <ToastContainer />
                <Row>
                    <Col offset={{ sm: 2 }}>
                        <Jumbotron fluid>
                            <Container>
                                {results.data.main === undefined ? null : (
                                    <h1>{cityname.name + " " + cityname.country}</h1>
                                )}
                                <p>
                                    {t("jumbotron_message")}
                                </p>
                                <p>
                                    <Button onClick={() => { onSearch(); revGeoloc(); }}>{t("Current Weather")}</Button>
                                </p>
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col sm={1}>
                        <Sidebar />
                    </Col>
                    <Col offset={{ sm: 1 }}>
                        {results.data.main === undefined ? null : (
                            <>
                                <Row>
                                    <Col sm={4}>
                                        <WeatherCard
                                            dt={convertTimestamp(results.data.dt)}
                                            temp_min={results.data.main.temp_min}
                                            temp_max={results.data.main.temp_max}
                                            main={results.data.weather[0].main}
                                            icon={results.data.weather[0].icon}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>)
                        }
                        <Row>
                            <Col>
                                <WeatherMap Coord={(lnglat) => { setCoordinates({ coordinates: lnglat.coordinates }); console.log("parent " + lnglat.coordinates) }} />
                                {/* <MyGoogleMap /> */}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        // </ErrorBoundary>
    );
}

export default withNamespaces()(Home);