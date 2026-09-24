const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 5000;


const filePath = path.join(__dirname, "data.json");


app.get("/employees", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            console.log("File reading error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to read employee data"
            });
        }

        try {
            const employees = JSON.parse(data);

            res.status(200).json({
                success: true,
                message: "Employees fetched successfully",
                count: employees.length,
                data: employees
            });

        } catch (error) {
            console.log("JSON parsing error:", error);

            res.status(500).json({
                success: false,
                message: "Unable to read employee data"
            });
        }
    });
});

// employee by id
app.get("/employees/:id", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {
            console.log("File reading error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to read employee data"
            });
        }

        try {
            const employees = JSON.parse(data);

            const id = Number(req.params.id);

            const employee = employees.find((emp) => emp.id === id);

            if (!employee) {
                return res.status(404).json({
                    success: false,
                    message: "Employee not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: employee
            });

        } catch (error) {
            console.log("Error:", error);

            return res.status(500).json({
                success: false,
                message: "Unable to read employee data"
            });
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});