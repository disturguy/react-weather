import error_codes_reference from '../scripts/error_codes_reference'

class Api_error_handling{
    
    errorReporting = (error) => {

        let alert_message;
        if(error.response !== undefined){
            if (error.response.status !== 409) {
                alert_message = "alert1";
            } else if (error.response.status === 409) {
                alert_message = error_codes_reference(error.response.data.errorCode);
            }        
        }else{
            if(error.code === 12){
                alert_message = error.message 
            }
        }
        return alert_message
    }
}

export default Api_error_handling