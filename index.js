console.log("hello pratik");

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello Motherfooooooooocker!');
});

app.get('/about/:id', (req, res) => {               //this id here you can get what you ask for in url. Example when you go to /about/123 it will give you 123. Used in retriving Instagram profile by username or id. 
  const id = req.params.id;
  res.send(`You requested about page with ID: ${id}`);
});
 
app.get('/add/:a/:b', (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    const sum = a + b;
    res.send(`The sum of ${a} and ${b} is ${sum}`);
})

app.post('/submit', (req, res) => {
  res.send('Form submitted successfully!');
});


//POST methods

//this post will give you the data you send in the body of the request.
app.post('/sub', (req, res) => {
    console.log(req.body);
    res.send('Subtraction endpoint hit');   
});

app.post('/substraction', (req, res) => {
  const { a, b } = req.body;
  console.log("a:", a, "b:", b); // now it won’t be undefined
  res.json({ sum: a + b });
});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
