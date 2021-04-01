import ApiErrorHandling from '../api_error_handling';
import {base_url_local} from '../../property_files/base_host';
import {autoComplete_url} from '../../property_files/api_urls';
import axios from 'axios'


const autoComplete = async (city) => {

    let ErrorClass = new ApiErrorHandling();

    try {

        //const latlng = await FetchLocationQ();
        const response = await axios({method: 'get', url: autoComplete_url(), baseURL: base_url_local});
        var hintArray = []
        response.data.map(a => hintArray.push(a.address.name + " " + a.address.state + " " + a.address.country));

        // console.log(response);
        return hintArray;

    } catch (error) {
        throw new Error(ErrorClass.errorReporting(error));
    }
}

export default autoComplete