const express = require('express');
const path = require('path');
const parser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact')
const app  = express();
// app.use(parser.urlencoded({extended:false}))
app.use(parser.urlencoded())
app.use(express.static('assets'))

const contactList =[
    {
        name:'Anvitha',
        phone:90090909
    },
    {
        name:'Srilatha',
        phone:862847634
    }
]


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

app.get('/',function(req,res){

    Contact.find({}).then(function(contacts){
        return res.render('./home',{
            title:"My contacts list",
            contact_list: contacts
        })}).catch((err)=>{
            if(err){
                console.log("Error in finding the contact")
            }
        })
    })

   


app.post('/create-contact',function(req,res){
    // return res.redirect('/practice')
    
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    }).then((newContact)=>{
        console.log('********',newContact);})
        .catch((err)=>{
            if(err){
                console.log("Error in creating contact")
            }
        })
        return res.redirect('./') //or 'back' can be used here
        
    })
   

app.get('/delete-contact/', function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id)
    .then().catch((err)=>{
        if(err)
             console.log('Error in deleting contact')
    })
     
    return res.redirect('back')
})

app.listen(port, function(Err){
    if(Err){
        console.log(Err);
    }
    else{
        console.log('Server is up and running on port',port)
    }
})


