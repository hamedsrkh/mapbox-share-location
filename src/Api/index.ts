import axios from "axios";

const instance = axios.create({
    baseURL: 'https://mapbox-save-location-default-rtdb.firebaseio.com',
    headers: {
        "Content-type": "application/json",
    },
});

export default instance