import ApiErrorHandling from '../api_error_handling';
import {base_url_local} from '../../property_files/base_host';
import {revGeoloc_url} from '../../property_files/api_urls';
import axios from 'axios'


const revGeoloc = async (lnglat) => {
    
    let ErrorClass = new ApiErrorHandling();

    try {

        //let response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=c5bca6977c807a27776c8a36988e68c3&lat=`+lnglat.coordinates[1]+`&lon=`+lnglat.coordinates[0]+`&format=json`);
        let response = await axios({method: 'get', url: revGeoloc_url(lnglat), baseURL: base_url_local});

        // console.log(response);
        return response;

    } catch (error) {
        throw new Error(ErrorClass.errorReporting(error));
    }
}

export default revGeoloc