import ApiErrorHandling from '../../scripts/api_error_handling';
import axios from 'axios'


const onSearch = async (lnglat) => {

    try {

        let results = await axios.get(`http://localhost:8080/weather?lat=` + lnglat.coordinates[1] + `&lon=` + lnglat.coordinates[0] + `&appid=c5bca6977c807a27776c8a36988e68c3`);

        return results;

    } catch (error) {
         throw new Error(ApiErrorHandling.errorReporting(error));
    }
};

export default onSearch