import axios from "axios";

const APIKEY = "&account=131R3A7C&token=9i7frzvvmcqu2i1jnrf6tyra5i8qmr4b"

export default {

searchByLocation: function(query) {
    return axios.get("https://www.triposo.com/api/20180627/location.json?id=" + query + "&fields=all" + APIKEY)
}



}