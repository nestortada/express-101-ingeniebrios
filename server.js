const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Students data stored in an array
const students_data = [
    {
        id: 1,
        name: "Felipe",
        lastNames: "Abella Ballesteros",
        email: "felipeabba@unisabana.edu.co"
    },
    {
        id: 2,
        name: "",
        lastNames: "",
        email: ""
    }
];

// Default endpoint
app.get('/', (req, res) => {
    res.json({ message: "You are in the server. Add /user_info/id for more information about a student" });
});

// User info endpoint
app.get('/user_info/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id, 10); // Convert ID to number

        // Validate that ID is a number
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format, must be a number." });
        }

        // Search for the student in the array
        const selected_student = students_data.find(student => student.id === id);

        if (selected_student) {
            res.json(selected_student);
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (error) {
        // Server error handling
        res.status(500).json({ error: "Internal server error" });
    }
});

// Listen on port
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
