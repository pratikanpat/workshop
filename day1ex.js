const express = require('express');

const app = express();
app.use(express.json());
const port = 3000;

let students = [];
let nextId = 1;

// Helper: Check for duplicate email
function isDuplicateEmail(email, excludeId = null) {
    return students.some(s => s.email === email && s.id !== excludeId);
}

// POST /students - Create student
app.post('/students', (req, res) => {
    const { name, email, age } = req.body;

    // Exercise 5: Missing fields
    if (!name || !email || age === undefined) {
        return res.status(400).json({ error: 'Name, email, and age are required.' });
    }

    // Exercise 6: Age validation
    if (typeof age !== 'number' || age < 1 || age > 100) {
        return res.status(400).json({ error: 'Age must be a number between 1 and 100.' });
    }

    // Exercise 7: Duplicate email
    if (isDuplicateEmail(email)) {
        return res.status(400).json({ error: 'Email already exists.' });
    }

    const student = { id: nextId++, name, email, age };
    students.push(student);
    res.status(201).json(student);
});

// PUT /students/:id - Update student
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
    if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
    }

    const { name, email, age } = req.body;

    // Exercise 8: At least one valid field
    if (!name && !email && age === undefined) {
        return res.status(400).json({ error: 'At least one valid field (name, email, age) must be provided.' });
    }

    // Validate and update fields
    if (name) student.name = name;
    if (email) {
        if (isDuplicateEmail(email, id)) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        student.email = email;
    }
    if (age !== undefined) {
        if (typeof age !== 'number' || age < 1 || age > 100) {
            return res.status(400).json({ error: 'Age must be a number between 1 and 100.' });
        }
        student.age = age;
    }

    res.json(student);
});

// GET /students - List students
app.get('/students', (req, res) => {
    res.json(students);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
/*
JSON format for student object:
{
    "id": 1,           // Auto-generated unique ID
    "name": "John Doe",// Student's name (string)
    "email": "john@example.com", // Student's email (string, must be unique)
    "age": 20          // Student's age (number, between 1 and 100)
}

Example POST request body to create a student:
{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "age": 22
}

Example response for GET /students:
[
    {
        "id": 1,
        "name": "Alice Smith",
        "email": "alice@example.com",
        "age": 22
    },
    {
        "id": 2,
        "name": "Bob Lee",
        "email": "bob@example.com",
        "age": 25
    }
]
*/
/*
Yes, you can modify the POST /students endpoint to accept an array of students for bulk creation. 
Here's an example of how the request body would look in Postman:

[
    {
        "name": "Alice Smith",
        "email": "alice@example.com",
        "age": 22
    },
    {
        "name": "Bob Lee",
        "email": "bob@example.com",
        "age": 25
    }
]

However, your current code only supports a single student object per request. 
To support multiple students, you would need to update your POST /students handler to process an array.
*/

//What changes do i need to do in POST to access the multiple objects at a time.
// Modify POST /students to accept single or multiple students
/*
app.post('/students', (req, res) => {
    const input = req.body;
    const studentsToAdd = Array.isArray(input) ? input : [input];
    const createdStudents = [];
    const errors = [];

    studentsToAdd.forEach((studentData, idx) => {
        const { name, email, age } = studentData;

        if (!name || !email || age === undefined) {
            errors.push({ index: idx, error: 'Name, email, and age are required.' });
            return;
        }
        if (typeof age !== 'number' || age < 1 || age > 100) {
            errors.push({ index: idx, error: 'Age must be a number between 1 and 100.' });
            return;
        }
        if (isDuplicateEmail(email)) {
            errors.push({ index: idx, error: 'Email already exists.' });
            return;
        }

        const student = { id: nextId++, name, email, age };
        students.push(student);
        createdStudents.push(student);
    });

    if (errors.length > 0) {
        return res.status(400).json({ errors, created: createdStudents });
    }
    res.status(201).json(Array.isArray(input) ? createdStudents : createdStudents[0]);
});
*/