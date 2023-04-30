const express= require("express");
const app= express();
const cors= require('cors');
const {json}= require('body-parser');
const dotenv= require('dotenv');
const axios =require('axios');

app.use(cors());
app.use(json());

const {parsed:config}=dotenv.config();
const URL = `https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}`;

const auth ={
    username:config.API_KEY,
    password:config.API_SECRET
}

const PORT= 5000;

app.get("/photos", async function(req,res){
    const response =await axios.get(`${URL}/resources/image`,{
        auth,
        params:{
            next_cursor:req.query.next_cursor,
        }
    });

    return res.send(response.data);
});

app.get('/search',async function(req,res){
    const response= await axios.get(`${URL}/resources/search`,{
        auth,
        params:{
            expression: req.query.expression
        }
    });

    return res.send(response.data);
})



app.listen(PORT, function(){
    console.log("listing on port 5000!");
})

