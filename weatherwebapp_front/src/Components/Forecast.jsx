import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
//import WeatherMap from './Map/WeatherMap'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import '../assets/css/Hint.css';
import { Hint } from 'react-autocomplete-hint';
// import data from '../jsons/coordinates'
import { withNamespaces } from 'react-i18next';
import convertTimestamp from '../scripts/convertTimestamp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import forecastDaily from '../scripts/api_calls/forecastDaily';
import fetchLocation from '../scripts/api_calls/fetchLocation';
import autoComplete from '../scripts/api_calls/autoComplete';





const ForecastbyCity = ({ t }) => {


    const [hintData, setHintData] = useState([]);
    // const [text, setText] = useState('');
    const [city, setCity] = useState('');
    // const [results, setResults] = useState({weather_state: '-', weather_forecast_datetime: '-', weather_min_temp: '-', weather_max_temp: '-', weather_icon: '01d' });
    const [results, setResults] = useState({ data: {} });
    const [latlng, setlatlng] = useState({ lat: '10', lon: '10' })
    const [view, setView] = useState(false);

    const customId = "toast_id";
    const Msg = ({ message }) => (
        <h4>
            {message}
        </h4>
    )
    const notify = (message) => toast.info(<Msg message={message} />, { toastId: customId });




    // const FetchData = async () => {
    //     try {
    //         await Promise.all([FetchLocationQ(), onSearch()]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <Container fluid>
            <Row>
                <Col sm={2}>
                    <Sidebar />
                </Col>
                <Col sm={10}>
                    <Row>
                        <Col sm={4}>
                            <h1> {t("Search_box_text")}</h1>
                            {/* <code>{`[${hintData.toString()}]`}</code> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Hint options={hintData} allowTabFill>
                                <input className='input-with-hint' value={city} onChange={(event) => {
                                    setCity(event.target.value);
                                    autoComplete()
                                        .then((hintArray) => {
                                            setHintData(hintArray);
                                        })
                                        .catch((error) => {
                                            notify(t(error.message))
                                        })
                                }} />
                            </Hint>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                fetchLocation().then(
                                    (res) => {
                                        console.log(res.data[0])
                                        if (res.data[0] !== undefined) {
                                            setlatlng({ lat: res.data[0].lat, lon: res.data[0].lon })
                                        }else{
                                            throw new Error("alert4")
                                        }
                                    }).catch((error) => {
                                        notify(t(error.message))
                                    })
                                forecastDaily(latlng).then(
                                    (res) => {
                                        console.log(res.data)
                                        if (res.data !== undefined) {
                                            setResults({ data: res.data })
                                        }else{
                                            throw new Error("alert4")
                                        }
                                    }).then(() => {
                                        setView(true);
                                    }).catch((error) => {
                                        // console.log(error)
                                        notify(t(error.message))
                                    });
                            }}>{t("Check Weather")}</Button>
                        </Col>
                    </Row>
                    <hr />
                    {view === false ? null : (
                        <>
                            <Row>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[0].dateTime)}
                                        temp_min={results.data.daily[0].temperature.minimum}
                                        temp_max={results.data.daily[0].temperature.maximum}
                                        main={results.data.daily[0].weather[0].main}
                                        icon={results.data.daily[0].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[1].dateTime)}
                                        temp_min={results.data.daily[1].temperature.minimum}
                                        temp_max={results.data.daily[1].temperature.maximum}
                                        main={results.data.daily[1].weather[0].main}
                                        icon={results.data.daily[1].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[2].dateTime)}
                                        temp_min={results.data.daily[2].temperature.minimum}
                                        temp_max={results.data.daily[2].temperature.maximum}
                                        main={results.data.daily[2].weather[0].main}
                                        icon={results.data.daily[2].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[3].dateTime)}
                                        temp_min={results.data.daily[3].temperature.minimum}
                                        temp_max={results.data.daily[3].temperature.maximum}
                                        main={results.data.daily[3].weather[0].main}
                                        icon={results.data.daily[3].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[4].dateTime)}
                                        temp_min={results.data.daily[4].temperature.minimum}
                                        temp_max={results.data.daily[4].temperature.maximum}
                                        main={results.data.daily[4].weather[0].main}
                                        icon={results.data.daily[4].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[5].dateTime)}
                                        temp_min={results.data.daily[5].temperature.minimum}
                                        temp_max={results.data.daily[5].temperature.maximum}
                                        main={results.data.daily[5].weather[0].main}
                                        icon={results.data.daily[5].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[6].dateTime)}
                                        temp_min={results.data.daily[6].temperature.minimum}
                                        temp_max={results.data.daily[6].temperature.maximum}
                                        main={results.data.daily[6].weather[0].main}
                                        icon={results.data.daily[6].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[7].dateTime)}
                                        temp_min={results.data.daily[7].temperature.minimum}
                                        temp_max={results.data.daily[7].temperature.maximum}
                                        main={results.data.daily[7].weather[0].main}
                                        icon={results.data.daily[7].weather[0].icon}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
        </Container >
    );
}


export default withNamespaces()(ForecastbyCity);