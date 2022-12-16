const express =require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app=express();


app.use(bodyParser.urlencoded({extended:true}));

 app.get("/", function(req,res){
 res.sendFile(__dirname +"/index.html");
 });





app.post("/",function(req,res) {
 //console.log( req.body.cityName);

 const query=req.body.cityName;
 const  apikey ="65971b41e088cbe61ecb82989d65b18e";
 const unit= "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +   "&appid=" + apikey + "&units=" + unit;

  https.get(url,function (response) {
    console.log(response.statusCode);

  //HOLD THE DATA AND PASS INTO JSON
    response.on("data",function(data){
     // console.log(data);
      const weatherdata = JSON.parse(data)
      const temp= weatherdata.main.temp;
      const weatherdescription=weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/" + icon + "@2x.png";


      res.write("<p>The weatther is currently " + weatherdescription + " <p>");
      res.write("<h1>The temperature in "+ query + " is " + temp + "  degrees Celcius.</h1>");
      res.write(" <img src=" + imageUrl + " >");
     res.send();

      //console.log(temp);
      //console.log(weatherdescription);
    })
  })

})


/*

*/



app.listen(3000,function(){
  console.log("My server is running at 3000");
});
