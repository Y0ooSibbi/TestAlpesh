const express = require("express");
const router = new express.Router();
const mongoose = require('mongoose');
var mongodb= require('mongodb');
var MongoClient= mongodb.MongoClient;
const app = express();
var jwt = require('jsonwebtoken');
require('./schema');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/',(req,resp)=>{
    resp.send('hello');
})

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// const db = '';
// app.listen(3000);

mongoose.connect('mongodb+srv://healthify:healthify12345@cluster0.ov0fwob.mongodb.net/?retryWrites=true&w=majority').then(()=>{
        app.listen(3000);
        console.log('connected succefully');
      })

app.post('/login', async (req,resp)=>{
    const {email , password }= req.body;
    // resp.send('hel');
    console.log(
    'hello'
    )

    const TestModel = await mongoose.model('tests', {client_email:String});
    await TestModel.findOne({client_email:email}).then((docs)=>{
        if(docs===null){
            resp.status(401).send('Please provide correct EMail');
        }
        console.log(docs);
        resp.send(docs);
    })
//     MongoClient.connect('mongodb+srv://healthify:healthify12345@cluster0.ov0fwob.mongodb.net/?retryWrites=true&w=majority', async function (err, client) {
//   if (err) throw err;
// //   console.log('able to come');

//   var db = client.db('test');

//   await db.collection('tests').findOne({client_email:email}, function (findErr, result) {
//     if (findErr) throw findErr;
//     console.log(result.client_name);
//     resp.send(result.client_name)
//     client.close();
//   });
// }); 

    // function find (name, query, cb) {
    //     mongoose.connection.db.collection(name, function (err, collection) {
    //        collection.find(query).toArray(cb);
    //    });
    // }
    
    // await find('tests', { client_email:email}, function (err, docs) {
    //     console.dir(docs);
    // });

    // await mongoose.connection.database.collection('tests').findOne({ client_email:email }).then(()=>{
    //     res.send('User found');
    // }).catch((error)=>{
    //     console.error(error);
    // })
})

app.post('/add',async (req,resp)=>{
    const { client_name,client_email,client_phone,comments } = req.body;
    // const TestModel = mongoose.model('Test', blogSchema);
    // await TestModel.collection.insertOne({ name: 'Test Testerson' });
    // resp.send(`hello ${uuid}`);

    const schema = new mongoose.Schema({
         // String is shorthand for {type: String}
    //   date: String,
      client_name: String,
      client_email: String,
      client_phone: String,
      meeting_time: { type: Date, default: Date.now },
      comments : String
      });
      const TestModel = mongoose.model('test', schema);
      let date_ob = new Date();
      let dateNow = ("0" + date_ob.getDate()).slice(-2);
      const yyyy = date_ob.getFullYear();
    let mm = date_ob.getMonth() + 1; // Months start at 0!
    let dd = date_ob.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();

    // get current seconds
    let seconds = date_ob.getSeconds();
    const currentTime = hours + ':'+minutes+':'+seconds;


      async function run() {
        await TestModel.collection.insertOne({
        //   date: String,
          client_name: client_name,
          client_email: client_email,
          client_phone: client_phone,
          meeting_time: currentTime,
          date : formattedToday,
          comments : comments
          }).then(()=>{
            console.log('inserted');
          }).catch((errorr)=>{
            console.error(errorr);
          })
      }
      run();
      resp.send('hello');
      
})