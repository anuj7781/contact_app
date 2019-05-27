const express = require('express');
//the server runs on a port
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
//this Contact will be used to populate the collection
const Contact = require('./models/contact');
const app = express();


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
//middleware1
// app.use(function(req,res,next){
//     req.myName  = 'Anuj';
//     //console.log('middleware1 called');
//     next();
// })

//middleware2
// app.use(function(req,res,next){
//     console.log('My name from MW2',req.myName);
//     //console.log('middleware2 called');
//     next();
// })


var contactList =  [
    {
        name:'Anuj',
        phone:11111
    },
    {
        name:'Dhoni',
        phone:77777
    },
    {
        name:'Tony Stark',
        phone:22222
    }
];

//for deleting a contact
app.get('/delete-contact',function(req,res){
    //get the id from query in the  url
    let id = req.query.id

    //find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting an object from database');
        }
        return res.redirect('back');
    });


    // console.log(req.params);
    // let phone=req.params.phone;
    //get query from the url;
    //console.log(req.query);
    //let phone = req.query.phone;
    //find the index
    //let contactIndex = contactList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
});

app.get('/',function(req,res){
    // console.log(req);
    //console.log(__dirname);
    // console.log('from the get route controller',req.myName);
    // res.send('<h1>Cool it is running or is it?</h1>');
    Contact.find({},function(err,contacts){
        if(err){
            console.log('err in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title:"Contacts List",
            contact_list:contacts
        });    
    });
    // return res.render('home',{
    //     title:"Contacts List",
    //     contact_list:contactList
    // });
});

app.get('/practice',function(req,res){
    //console.log(__dirname);
    return res.render('practice',{
        title:"Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
//    console.log(req.body);
//    console.log(req.body.name);
//    console.log(req.body.phone);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })


    //now we will push the entry in the database directly
    //contactList.push(req.body)
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }
        console.log('*******',newContact);
        res.redirect('back');
    });

    // return res.redirect('/');
    //return res.redirect('back');
});



//run the server
//as the server is running it is listening to requests and sending back responses 
app.listen(port,function(err){
    if(err){
        console.log('Error in running the server ',err);
    }
    console.log("Yup! My express server is running on the port",port);
});
