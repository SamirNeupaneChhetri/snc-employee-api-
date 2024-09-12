import express from 'express';

const app = express();
const port = process.env.PORT || 4500;

// Array of SNC Employees
const sncEmp = [
    { id: 1, name: 'Ram', email: 'ram@gmail.com', age: 23 },
    { id: 2, name: 'Shyam', email: 'shyam23@gmail.com', age: 28 },
    { id: 3, name: 'John', email: 'john@gmail.com', age: 33 },
    { id: 4, name: 'Bob', email: 'bob32@gmail.com', age: 41 }
];

// Home route: Displays a welcome message
app.get('/', (req, res) => {
    res.status(200).send('<h1>Welcome to the SNC Company Employee Section</h1>');
});

// Route to get all employees
app.get('/snc/emp', (req, res) => {
    if (sncEmp.length > 0) {
        res.status(200).json(sncEmp);  // Send all employee data as JSON
    } else {
        res.status(404).send('Error: No employee data found.');  // Handle empty data case
    }
});

// Route to get a specific employee by ID using route parameters
app.get('/snc/emp/:id', (req, res) => {
    const empId = parseInt(req.params.id, 10);  // Extract and parse the ID from the URL

    // Check if empId is a valid number
    if (isNaN(empId)) {
        return res.status(400).send('Invalid Employee ID. Please enter a valid ID.');
    }

    // Find the employee with the matching ID
    const employee = sncEmp.find(emp => emp.id === empId);

    if (employee) {
        res.status(200).json(employee);  // If employee found, send the employee data
    } else {
        res.status(404).send('Error: Employee not found.');  // If not found, return 404
    }
});

// Catch-all route for undefined endpoints
app.use((req, res) => {
    res.status(404).send('404: Resource Not Found');  // Catch-all for undefined routes
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
