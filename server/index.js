import express from 'express';
import cors from 'cors';
//init the express app
const app = express();
//requests from front end from different url
app.use(cors());
//in express we use middleware to use cors to parse json from server
app.use(express.json());

import Chance from 'chance';
const chance = new Chance();
// convert array to integers spread on keys
const animals = [...Array(250).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    }
});
//endpoint to research for animals
//run this function on each request
app.get('', (req,res) =>{
    // search you want lowercase and or empty string as default
    const q = req.query.q?.toLowerCase() || '';
    // filter animals with only that text
    //filter will loop each animal
    // and it needs to pass a test animal.type includes q
    const results = animals.filter(animal => animal.type.toLowerCase().includes(q));
    //end point send data back
    res.send(results);
})

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));
