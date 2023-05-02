require('babel-register')
const express = require('express')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const app = express()
const func = require('function')
const members = [
    {
        id:1,
        name: 'Bernard'
    },
    {
        id:2,
        name: 'Mauriette'
    },
    {
        id:3,
        name: 'Luc'
    },
    {
        id:4,
        name: 'Cheridane'
    }
]
 
 
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(morgan('dev'))

app.get('/api/v1/members/:id', (req, res)=>{
    res.json(func.success(members[(req.params.id)-1]))
})

app.get('/api/v1/members',(req, res)=>{
    if(req.query.max != undefined && req.query.max>0){
        res.json(func.success(members.slice(0, req.query.max)))
    }else if(req.query.max != undefined){
        res.json(func.error('Wrong max value'))
    }else{
        res.json(func.success(members))
    }
})

//app.get('/api',(req, res)=>{
 //   res.send('Bonjour tout le monde')
//})

//app.get('/api/V1',(req, res)=>{
  //  res.send('C\'est la version 1')
//}) 

//app.get('/ap1/v1/books/:id ',(req, res) =>{
//    res.send(req.params)
//})

app.post('/api/v1/members',(req, res) => {
    res.send(req.body)
})
app.listen(8080, () => console.log('Started on port 8080.'))


 