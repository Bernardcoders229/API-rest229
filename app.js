require('babel-register')
const express = require('express')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const app = express()
const {success, error} = require('function')
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

let MembersRouter = express.Router()

 
app.use(morgan('dev'))
app.use(bodyParser.json())  
app.use(bodyParser.urlencoded({ extended: true }))   

MembersRouter.route('/:id')


//requetes get
.get((req, res)=>{
    res.json(success(members[(req.params.id)-1]))
})

.get((req, res)=>{
    if(req.query.max != undefined && req.query.max>0){
        res.json(success(members.slice(0, req.query.max)))
    }else if(req.query.max != undefined){
        res.json(error('Wrong max value'))
    }else{
        res.json(success(members))
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


//requete put
 .put((req, res)=>{
    let index = getIndex(req.params.id);
    if (typeof(index)=='string') {
        res.json(error(index))
        
    }else{
        let member = members[index];
        let same = false
        for(let i = o; i<members.length; i++){
             if (req.body.name == members[i].name && req.params.id != members[i].id) {
                same = true 
                break
             }
        }
        if(same){
            res.json(error('same name'))
        }else {
            members[index].name = req.body.name
            res.json(success(true))
        }
    }
})


//requete post
 .post((req, res) => {
    
    if (req.body.name) {
let sameName = false
        for (let i = 0; i< members.length; i++){
            if (members[i].name == req.body.name) {
                sameName = true 
                break
            }
        }if (sameName) {
            res.json(error('name already taken'))
            
        }else{
            let member= {
                id:members.length+1,
                name: req.body.name
            }
            members.push(member)

            res.json(success(member))
        
        }

        
      
     }else {
        res.json(error('no name value '))
     }
})



//requete delete
.delete((req, res)=> {
    let index = getIndex(req.params.id);
    if (typeof(index)=='string') {
        res.json(error(index))
        
    } else {
        members.splice(index,1)
        res.json(success(members))
    }
})




app.use('/api/v1/members', MembersRouter)

app.listen(8080, () => console.log('Started on port 8080.'))

function getIndex(id) {
    for(let i = o; i<members.length; i++){
        if (members[i],id== id) {
            return i
        }
        return 'wrong id'
    }
    
}
 