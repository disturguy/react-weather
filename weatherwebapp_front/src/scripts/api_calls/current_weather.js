import ApiErrorHandling from '../../scripts/api_error_handling';
import {base_url_local_HVservice} from '../../property_files/base_host';
import {cur_weather_url} from '../../property_files/api_urls';
import axios from 'axios'


const onSearch = async (lnglat) => {

    let ErrorClass = new ApiErrorHandling();

    try {
        let results = await axios({method: 'get', url: cur_weather_url(lnglat), baseURL: base_url_local_HVservice});
        //let results = await axios.get(`http://localhost:8080/error_generator`);

        return results;

    } catch (error) {
         throw new Error(ErrorClass.errorReporting(error));
    }
};

export default onSearch