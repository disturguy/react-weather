import ApiErrorHandling from '../api_error_handling';
import axios from 'axios'


const revGeoloc = async () => {

    try {

        //let response = await axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=c5bca6977c807a27776c8a36988e68c3&lat=`+lnglat.coordinates[1]+`&lon=`+lnglat.coordinates[0]+`&format=json`);
        let response = await axios.get(`http://localhost:8080/v1/reverse.php?key=pk.fafc1a26804f985cf9d25551bd04e10b&lat=-37.870662&lon=144.9803321&format=json`);

        // console.log(response);
        return response;

    } catch (error) {
        throw new Error(ApiErrorHandling.errorReporting(error));
    }
}

export default revGeoloc