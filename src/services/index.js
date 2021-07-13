import axios from 'axios';
import { API_URL } from "../config/index";


const ApiServices = {

    getAllDocuments: function () {
        return axios.get(API_URL + '/get_document');   
    },
    saveDocument: function (paylod) {
        const headers = {
            "Content-Type": "multipart/form-data",
        };
        return axios.post(API_URL + '/add_document',paylod, headers);   
    },

}

export default ApiServices;