import http from './base-http-service';

const login = (user) => http.post('/login', user)
    .then(response => response.data)


export  {
    login
}