import ApiErrorHandling from '../api_error_handling';
import {base_url} from '../../property_files/base_host';
import {revGeoloc_url} from '../../property_files/api_urls';
import axios from 'axios'


const revGeoloc = async () => {

    try {

        //let response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=c5bca6977c807a27776c8a36988e68c3&lat=`+lnglat.coordinates[1]+`&lon=`+lnglat.coordinates[0]+`&format=json`);
        let response = await axios({method: 'get', url: revGeoloc_url(), baseURL: base_url});

        // console.log(response);
        return response;

    } catch (error) {
        throw new Error(ApiErrorHandling.errorReporting(error));
    }
}

export default revGeoloc