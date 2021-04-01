import ApiErrorHandling from '../api_error_handling';
import {base_url_local} from '../../property_files/base_host';
import {fetchLocationQ_url} from '../../property_files/api_urls';
import axios from 'axios'


const fetchLocationQ = async (city) => {

    let ErrorClass = new ApiErrorHandling();

    try {

        //const latlng = await FetchLocationQ();
        let response = await axios({method: 'get', url: fetchLocationQ_url(city), baseURL: base_url_local});

        //console.log(response);
        return response;

    } catch (error) {
       // console.log(error.code)
        throw new Error(ErrorClass.errorReporting(error));
    }
}

export default fetchLocationQ