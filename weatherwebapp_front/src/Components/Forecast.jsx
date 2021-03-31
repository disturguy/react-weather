import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
//import WeatherMap from './Map/WeatherMap'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import '../assets/css/Hint.css';
import { Hint } from 'react-autocomplete-hint';
import data from '../jsons/coordinates'
import { withNamespaces } from 'react-i18next';
import convertTimestamp from '../scripts/convertTimestamp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import oneCall from '../scripts/api_calls/onecall';
import fetchLocation from '../scripts/api_calls/fetchLocation';
import autoComplete from '../scripts/api_calls/autoComplete';





const ForecastbyCity = ({ t }) => {


    const [hintData, setHintData] = useState([]);
    // const [text, setText] = useState('');
    const [city, setCity] = useState('');
    // const [results, setResults] = useState({weather_state: '-', weather_forecast_datetime: '-', weather_min_temp: '-', weather_max_temp: '-', weather_icon: '01d' });
    const [results, setResults] = useState({ data });
    const [latlng, setlatlng] = useState({ lat: '', lon: '' })
    const [view, setView] = useState(false);

    const notify = (message) => toast(message);



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
                                oneCall(latlng).then(
                                    (res) => {
                                        setResults({ data: res.data })
                                    }).catch((error) => {
                                        console.log(error)
                                        notify(t(error.message))
                                    });
                                fetchLocation().then((res) => {
                                    setlatlng({ lat: res.data[0].lat, lon: res.data[0].lon });
                                    setView(true);
                                }).catch((error) => {
                                    notify(t(error.message))
                                })
                            }}>{t("Check Weather")}</Button>
                        </Col>
                    </Row>
                    {view === false ? null : (
                        <>
                            <hr />
                            <Row>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[0].dt)}
                                        temp_min={results.data.daily[0].temp.min}
                                        temp_max={results.data.daily[0].temp.max}
                                        main={results.data.daily[0].weather[0].main}
                                        icon={results.data.daily[0].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[1].dt)}
                                        temp_min={results.data.daily[1].temp.min}
                                        temp_max={results.data.daily[1].temp.max}
                                        main={results.data.daily[1].weather[0].main}
                                        icon={results.data.daily[1].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[2].dt)}
                                        temp_min={results.data.daily[2].temp.min}
                                        temp_max={results.data.daily[2].temp.max}
                                        main={results.data.daily[2].weather[0].main}
                                        icon={results.data.daily[2].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[3].dt)}
                                        temp_min={results.data.daily[3].temp.min}
                                        temp_max={results.data.daily[3].temp.max}
                                        main={results.data.daily[3].weather[0].main}
                                        icon={results.data.daily[3].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[4].dt)}
                                        temp_min={results.data.daily[4].temp.min}
                                        temp_max={results.data.daily[4].temp.max}
                                        main={results.data.daily[4].weather[0].main}
                                        icon={results.data.daily[4].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[5].dt)}
                                        temp_min={results.data.daily[5].temp.min}
                                        temp_max={results.data.daily[5].temp.max}
                                        main={results.data.daily[5].weather[0].main}
                                        icon={results.data.daily[5].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[6].dt)}
                                        temp_min={results.data.daily[6].temp.min}
                                        temp_max={results.data.daily[6].temp.max}
                                        main={results.data.daily[6].weather[0].main}
                                        icon={results.data.daily[6].weather[0].icon}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <WeatherCard
                                        dt={convertTimestamp(results.data.daily[7].dt)}
                                        temp_min={results.data.daily[7].temp.min}
                                        temp_max={results.data.daily[7].temp.max}
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