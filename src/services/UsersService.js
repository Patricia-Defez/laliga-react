import http from './base-http-service';


const list = (query) => {
    return http.get('/users',{
        params: query || {}
    }).then(response => response.data);
}

export {
    list
}