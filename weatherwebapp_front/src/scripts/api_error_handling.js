import error_codes_reference from '../scripts/error_codes_reference'

class ApiEerrorHandling{
    
    errorReporting = (error) => {
        let alert_message;
        if(error.response !== undefined){
            if (error.response.status !== 409) {
                alert_message = "alert1";
            } else if (error.response.status === 409) {
                alert_message = error_codes_reference(error.response.data.errorCode);
            }        
        }else{
                alert_message = error.message 
        }
        return alert_message
    }
}

export default ApiEerrorHandling