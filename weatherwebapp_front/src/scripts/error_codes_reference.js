const error_code_reference = (errorcode) =>{
    if (errorcode === 5000) {
        //Generic Error
        return "Ops! An unexpected error has occured. Please refresh the page!"
    }else if(errorcode === 1000){
        //Invalid city name
        return "Invalid City Name. Please enter a valid city"
    }else if(errorcode === 1001){
        //Invalid units passed as parameter
        return "Invalid city. Please contact support"
    }else if(errorcode === 1002){
        //Invalid language passed as parameter
        return "Invalid city. Please contact support"
    }else if(errorcode === 1003){
        //Invalid city id passed as parameter
        return "Invalid city. Please contact support"
    }else if(errorcode === 1004){
        //Invalid coordinates passed as parameters
        return "Invalid city. Please contact support"
    }else if(errorcode === 2000){
        // the message of this error is parametrical and will be set from the one that OWM throws
        return "Paramtrical"
    }
}

export default error_code_reference;