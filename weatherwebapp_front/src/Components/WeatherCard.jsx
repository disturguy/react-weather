import React from 'react';
import {Card} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next'

const WeatherCard = ({dt, temp_min, temp_max, main, icon,t}) => {

    // const date = new Date(dt);
    return(
        <Card style={{width: '18rem'}}>
            <Card.Img variant='top' src={`http://openweathermap.org/img/wn/${icon}@2x.png`}/>
            <Card.Body>
                <Card.Title>{main}</Card.Title>
                <p>
                    {dt /* {date.toLocaleDateString()} - {date.toLocaleTimeString()} */}
                </p>
                <p>
                    {t("Min")}: {temp_min}
                </p>
                <p>
                    {t("Max")}: {temp_max}
                </p>
            </Card.Body>
        </Card>
    );
}


export default withNamespaces()(WeatherCard);