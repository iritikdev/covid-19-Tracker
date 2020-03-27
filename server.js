const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const ejs = require('ejs')
const covid = require('novelcovid');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
        
    const sort = (async () => {

            let all = await covid.getAll();
            const nowUpdate = new Date(all.updated)

            let allCountry = await covid.getCountry();
            let indiaCountry = await covid.getCountry({country: 'India'});
            // console.log(indiaCountry)
        
            res.render("index", {   cases:(all.cases).toLocaleString(), 
                                    deaths:(all.deaths).toLocaleString(), 
                                    recovered:(all.recovered).toLocaleString(), 
                                    update:nowUpdate,
                                    allcountery:allCountry,
                                    indiaCountry:indiaCountry
                                }
                    );
        })()  

})
    
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

