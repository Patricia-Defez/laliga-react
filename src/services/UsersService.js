import http from './base-http-service';


const list = () => {
    return http.get('/users')
    .then(response => response.data);
}

export {
    list
}