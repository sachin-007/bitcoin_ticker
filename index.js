
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app=express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  // console.log(req.body.crypto);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;

  // var baseURL= "https://apiv2.bitcoinaverage.com/convert/{symbol_set}?from={source_cur}&to={target_cur}&amount={amount}";
  // var finalURL = baseURL+crypto+fiat;

  var options ={
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method:"GET",
    qs:{
      from:crypto,
      to:fiat,
      amount:amount
    }

  };

    request(options,function(error,response,body){
      var data = JSON.parse(body);
      // var price = data.last;
      var price = data.price;
      // console.log(price);
      console.log(price);
      // var currentDate = data.display_timestamp;
      var currentDate=data.time;


      // res.write("<p>the current date is "+currentDate+"</p>");

      // res.write("<h1>The current price of "+crypto+" is "+price+fiat+"</h1>");

      res.write("<p>The Current Date is "+currentDate+"</p>");
      res.write("<h1>"+amount+crypto+"is currently worth"+price+fiat+"</h1>");

      res.send();
  });
});




app.listen(3300,function(){
  console.log("server is running on port 3300");
});
