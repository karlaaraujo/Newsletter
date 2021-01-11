const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res)
{
    const fstName= req.body.firstName;
    const lstName= req.body.lastName;
    const emailAdress= req.body.email;


    const data =
    {
      members :
      [
        {
          email_address : emailAdress,
          status: "subscribed",
          merge_fields: {
            FNAME: fstName,
            LNAME: lstName
          }
        }

      ]
    };
    const jsonData= JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists/99965ac5a1";
    const options= {
      method:"POST",
      auth: "qualquerString:4541c8eda4a2f4def74682e41d563c0f-us7"
    };

    const request= https.request(url,options, function(response){

      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      });
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req,res){
  res.redirect("/");
})

//SETTING PORTS TO EITHER THE ONE GIVEN BY HEROKU OR LOCALHOST 3000
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});

//api key
//4541c8eda4a2f4def74682e41d563c0f-us7


//list
//99965ac5a1
