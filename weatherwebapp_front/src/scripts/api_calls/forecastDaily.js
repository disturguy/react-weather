import ApiErrorHandling from '../api_error_handling';
import {base_url_local_HVservice} from '../../property_files/base_host';
import {forecastDaily_url} from '../../property_files/api_urls';
import axios from 'axios'


const forecastDaily = async (latlng) => {

    let ErrorClass = new ApiErrorHandling();

    try {

        //const latlng = await FetchLocationQ();
        let response = await axios({method: 'get', url: forecastDaily_url(latlng), baseURL: base_url_local_HVservice});

        // console.log(response);
        return response;

    } catch (error) {
        throw new Error(ErrorClass.errorReporting(error));
    }
}

export default forecastDaily