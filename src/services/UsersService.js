import http from './base-http-service';


const list = (query) => {
    return http.get('/users',{
        params: query || {}
    }).then(response => response.data);
}

const getUser = (id) => http.get(`/users/${id}`)
    .then(response => response.data)

const createUser = (user) => http.post('/users', user)
    .then(response => response.data)
     

export {
    list,
    getUser,
    createUser
}