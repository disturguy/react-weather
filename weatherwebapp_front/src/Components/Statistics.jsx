import React, { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Sidebar from './Sidebar/Sidebar';
import Charts from './Charts/Charts';
import { Button } from 'react-bootstrap';
import '../assets/css/Hint.css';
import { Hint } from 'react-autocomplete-hint';
import data from '../jsons/coordinates';
import convertTimestamp from '../scripts/convertTimestamp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { withNamespaces } from 'react-i18next';
import forecastDaily from '../scripts/api_calls/forecastDaily';
import fetchLocation from '../scripts/api_calls/fetchLocation';
import autoComplete from '../scripts/api_calls/autoComplete';


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
    const [city, setCity] = useState('');
    const [results, setResults] = useState({ data });
    const [latlng, setlatlng] = useState({ lat: ' ', lon: ' ' })
    const [view, setView] = useState(false);

    const customId = "toast_id";
    const Msg = ({message}) => (
        <h4>
            {message}
        </h4>
      )
    const notify = (message) => toast.info(<Msg message={message}/>, {toastId: customId});


    return (
        <Container fluid>
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
                                        if (res.data[0] !== undefined) {
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
                    <Row>
                        <Col sm={8}>
                            {view === false ? null : (
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
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default withNamespaces()(Statistics);