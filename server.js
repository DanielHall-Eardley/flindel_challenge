const express = require('express');
const path = require('path');
const cors = require('cors')
const routes = require('./server/routes')

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api', routes)

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//catch all thrown errors 
app.use((error, req, res, next) => {
    const message = error.message || 'An Error occurred'
    res.status(200).json({error: message})
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
