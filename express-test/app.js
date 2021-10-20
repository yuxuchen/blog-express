const express = require('express')

//the instance of requirement
const app = express()

app.use((req, res, next) => {
    console.log('request to start...', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    //deal with cookie
    req.cookie = {
        useId: 'abc123'
    }
    next()
})

app.use((req, res, next) => {
    //deal with post data
    //Asynchrony
    setTimeout(()=>{
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
})

app.use('/api', (req, res, next)=>{
    console.log('deal with /api route')
    next()
})

app.get('/api', (req, res, next) => {
    console.log('get /api route')
    next()
})

app.post('/api', (req, res, next) => {
    console.log('post /api route')
    next()
})

//mimic login authentation
function loginCheck(req, res, next){
    setTimeout(() =>{
        console.log('fail to login!!')
        res.json({
            errno: -1,
            msg: 'fail to login'
        })
    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({
        errno:0,
        data: req.cookie
    })
})

app.post('/api/get-post-data', (req, res, next)=>{
    console.log('post /api/get-post-data')
    res.json({
        errno: 0,
        data: req.body
    })
})

app.use((req, res, next) => {
    console.log('deal with 404')
    res.json({
        errno: -1,
        msg: '404 not found'
    })
})

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})