import axios from "axios";
import { apiConstants } from "../constants";

const createPaymentIntent = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(`${apiConstants.BACKEND_API.BASE_URL}${apiConstants.BACKEND_API.PAYMENT}`, data).then(function(res) {
            resolve(res);
        }).catch(function(error){
            reject(error);
        });
    });  
}

export default createPaymentIntent;