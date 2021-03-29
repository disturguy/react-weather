const error_code_reference = (errorcode) =>{
    if (errorcode === 5000) {
        //Generic Error
        return "O3"
    }else if(errorcode === 1000){
        //Invalid city name
        return "alert4"
    }else if(errorcode === 1001){
        //Invalid units passed as parameter
        return "alert5"
    }else if(errorcode === 1002){
        //Invalid language passed as parameter
        return "alert5"
    }else if(errorcode === 1003){
        //Invalid city id passed as parameter
        return "alert5"
    }else if(errorcode === 1004){
        //Invalid coordinates passed as parameters
        return "alert5"
    }else if(errorcode === 2000){
        // the message of this error is parametrical and will be set from the one that OWM throws
        return "alert6"
    }
}

export default error_code_reference;