const express = require('express')
const app = express()

app.get('/api',(req, res)=>{
    res.send('Bonjour tout le monde')
})

app.get('/api/V1',(req, res)=>{
    res.send('C\'est la version 1')
}) 

app.get('/ap1/v1/books/:id',(req, res) =>{
    res.send(req.params)
})
app.listen(8080, () => console.log('Started on port 8080.'))
