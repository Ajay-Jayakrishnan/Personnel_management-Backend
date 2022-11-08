const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}))


const service = require('./Services/service')

//function to add a new employee

app.post('/register', (req, res) => {

    service.register(req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//Function to login

app.post('/login', (req, res) => {
    service.login(req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//function to add employees to users

app.post('/addemployee/:uid', (req, res) => {
    service.addemployee(req.body, req.params.uid).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//function to fetch data from employees array

app.get('/empdata/:uid', (req, res) => {
    service.empdata(req.params.uid).then(result => {
        res.status(result.statusCode).json(result)
    })
})

//Function to remove employee from the array

app.post('/deleteemp', (req, res) => {
    service.deleteemp(req.body).then(result => {
        res.status(result.statusCode).json(result)
    })
})
app.post('/updateData',(req,res) =>{
service.updateData(req.body).then((result)=>{
   res.status(result.statusCode).json(result)
})
})




app.listen(3010, () => {
    console.log("server at 3010");
})