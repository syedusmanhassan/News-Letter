import express from "express";
import bodyParser from "body-parser";
import axios from "axios" ;
import path from 'path';
import { fileURLToPath } from 'url';
import { error } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const api_key = "YOUR API KEY"

const config ={ 
    headers : {"Authorization" : `${api_key}`}
}


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
 res.render(__dirname +"/sign-up.ejs")

});

app.post("/",async(req,res)=>{
  const  fName= req.body.fName;
  const  lName= req.body.lName;
  const  email = req.body.email;
    console.log(fName,lName,email);
    const data = {
        members : [
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                FNAME : fName,
                LNAME: lName
                  },

            }
        ]
    };
   const jsonData= JSON.stringify(data);
    try{
    const response = await axios.post("https://us15.api.mailchimp.com/3.0/lists/6e5963648c" , jsonData , config  );
  
        if(res.statusCode === 200){
          res.render(__dirname+"/success.ejs");
        }else{
          res.render(__dirname + "/failure.ejs");
        }
    }catch(error){
        if(error){
            res.render(__dirname+"/failure.ejs");
        }
        // res.send(error.message);
    }


})

app.post("/failure" , (req,res)=>{
    
    res.redirect("/");

});

app.listen(process.env.PORT || port ,()=>{
    console.log(`listening on port ${port}`);
});

// 6237f08aee4d722f4c72bf972d33b075-us15
// 6e5963648c
