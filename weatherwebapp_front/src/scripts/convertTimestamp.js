export default function convertTimestamp(timestamp) {
    if (timestamp !== "") {

        var time = timestamp.replace(/T/g, ' (').replace(/Z/g, ')')
        
        return time;
    }else{
        return "";
    }
}