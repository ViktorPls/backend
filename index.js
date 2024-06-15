const express = require('express'); 
const morgan = require('morgan')


const PORT = process.env.PORT || 3000;
const app = express();

// Settings oder Configs //
app.use(morgan('combined'))

// app.METHOD(PATH, HANDLER) // 

app.get('/', function (req, res) {
    res.send('Hello World!');
    });

app.listen(
    PORT,
    () => console.log(`Server is running on http://localhost:${PORT}`)
);

