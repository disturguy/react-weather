import React, { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Sidebar from './Sidebar/Sidebar'
import Charts from './Charts/Charts'
import { Button } from 'react-bootstrap';
import '../assets/css/Hint.css'
import { Hint } from 'react-autocomplete-hint';
import axios from 'axios'
import data from '../jsons/coordinates'
import convertTimestamp from '../scripts/convertTimestamp'
import error_codes_reference from '../scripts/error_codes_reference'
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withNamespaces } from 'react-i18next';



const Statistics = ({ t }) => {
    const [hintData, setHintData] = useState([]);
    const [city, setCity] = useState('');
    const [results, setResults] = useState({ data });
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
            latlng.lat = res.lat;
            latlng.lon = res.lon;

            return latlng;
            // console.log(res);
            // setCoordinates({ cityname: res[0].display_name, lat: res[0].lat, lon: res[0].lon });

        } catch (error) {
            console.log(error)
        }
    }

    const Autocomplete = async () => {
        // const res = await axios.get(`https://api.locationiq.com/v1/autocomplete.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q&q=Athens`);
        const res = await axios.get(`http://localhost:8080/v1/autocomplete.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&q&q=Athens`);
        var hintArray = []
        res.data.map(a => hintArray.push(a.address.name + " " + a.address.state + " " + a.address.country));
        setHintData(hintArray);
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
                            <h1>{t("Search_metricsbox_text")}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <Hint options={hintData} allowTabFill>
                                <input className='input-with-hint' value={city} onChange={(event) => { setCity(event.target.value); Autocomplete(); }} />
                            </Hint>
                        </Col>
                        <Col>
                            <Button onClick={() => { onSearch(); /*console.log(results.data);*/ }}>{t("Check Weather")}</Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={8}>
                            <Charts data={{
                                data1: [
                                    (results.data.daily[0].temp.max + results.data.daily[0].temp.min) / 2,
                                    (results.data.daily[1].temp.max + results.data.daily[1].temp.min) / 2,
                                    (results.data.daily[2].temp.max + results.data.daily[2].temp.min) / 2,
                                    (results.data.daily[3].temp.max + results.data.daily[3].temp.min) / 2,
                                    (results.data.daily[4].temp.max + results.data.daily[4].temp.min) / 2,
                                    (results.data.daily[5].temp.max + results.data.daily[5].temp.min) / 2,
                                    (results.data.daily[6].temp.max + results.data.daily[6].temp.min) / 2,
                                    (results.data.daily[7].temp.max + results.data.daily[7].temp.min) / 2],
                                data2: [
                                    results.data.daily[0].weather[0].main,
                                    results.data.daily[1].weather[0].main,
                                    results.data.daily[2].weather[0].main,
                                    results.data.daily[3].weather[0].main,
                                    results.data.daily[4].weather[0].main,
                                    results.data.daily[5].weather[0].main,
                                    results.data.daily[6].weather[0].main,
                                    results.data.daily[7].weather[0].main],
                                data3: [
                                    convertTimestamp(results.data.daily[0].dt),
                                    convertTimestamp(results.data.daily[1].dt),
                                    convertTimestamp(results.data.daily[2].dt),
                                    convertTimestamp(results.data.daily[3].dt),
                                    convertTimestamp(results.data.daily[4].dt),
                                    convertTimestamp(results.data.daily[5].dt),
                                    convertTimestamp(results.data.daily[6].dt),
                                    convertTimestamp(results.data.daily[7].dt)
                                ]
                            }
                            }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default withNamespaces()(Statistics);