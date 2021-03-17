import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
//import WeatherMap from './Map/WeatherMap'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from './Sidebar/Sidebar';
import '../assets/css/Hint.css'
import { Hint } from 'react-autocomplete-hint';
import axios from 'axios';
import data from '../jsons/coordinates'
import { withNamespaces } from 'react-i18next';
import convertTimestamp from '../scripts/convertTimestamp'
import error_codes_reference from '../scripts/error_codes_reference'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ForecastbyCity = ({ t }) => {

    const [hintData, setHintData] = useState([]);
    // const [text, setText] = useState('');
    const [city, setCity] = useState('');
    // const [results, setResults] = useState({weather_state: '-', weather_forecast_datetime: '-', weather_min_temp: '-', weather_max_temp: '-', weather_icon: '01d' });
    const [results, setResults] = useState({ data });
    // const [coordinates, setCoordinates] = useState({ cityname: '', lat: '', lon: '' })
    const CancelToken = axios.CancelToken
    let cancel;
    const history = useHistory();
    const notify = (message) => toast(message);


    const apiErrorHandling = async (error) => {
        console.log(error.response.data);
        if (axios.isCancel(error)) {
            console.log('Request cancelled successfully.');
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

            const latlng = await FetchLocationQ();
            let results = await axios.get(`http://localhost:8080/onecall?lat=` + latlng.lat + `&lon=` + latlng.lon + `&exclude=current,minutely,hourly,alerts&appid=c5bca6977c807a27776c8a36988e68c3`, {
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


    const FetchLocationQ = async () => {

        try {
            let latlng = {
                lat: '',
                lon: ''
            }
            // let response = await fetch(`https://eu1.locationiq.com/v1/search.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q=`+city+`&format=json`)
            let response = await fetch(`http://localhost:8080/v1/search.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q=` + city + `&format=json`)
            let res = await response.json();
            latlng.lat = res[0].lat;
            latlng.lon = res[0].lon;

            return latlng;
            // console.log(res);
            // setCoordinates({ cityname: res[0].display_name, lat: res[0].lat, lon: res[0].lon });

        } catch (error) {
            console.log(error)
        }
    }


    // const FetchData = async () => {
    //     try {
    //         await Promise.all([FetchLocationQ(), onSearch()]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    const Autocomplete = async () => {
        // const res = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q&q=Athens`);
        const res = await axios.get(`http://localhost:8080/v1/autocomplete.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q=Athens`);
        var hintArray = []
        res.data.map(a => hintArray.push(a.address.name + " " + a.address.state + " " + a.address.country));
        setHintData(hintArray);
        console.log(hintArray);
    }

    return (
        <Container fluid>
            <ToastContainer />
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
                                <input className='input-with-hint' value={city} onChange={(event) => { setCity(event.target.value); Autocomplete(); }} />
                            </Hint>
                        </Col>
                        <Col>
                            <Button onClick={() => { onSearch(); console.log(results.data) }}>{t("Check Weather")}</Button>
                        </Col>
                    </Row>
                    {results.data.daily[0].dt === '' ? null : (
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
        </Container>
    );
}


export default withNamespaces()(ForecastbyCity);