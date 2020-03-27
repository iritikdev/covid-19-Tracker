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
            // console.log(sortedCountries);
        
            res.render("index", {   cases:(all.cases).toLocaleString(), 
                                    deaths:(all.deaths).toLocaleString(), 
                                    recovered:(all.recovered).toLocaleString(), 
                                    update:nowUpdate,
                                    allcountery:allCountry
                                }
                    );
        })()  

})
    
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

