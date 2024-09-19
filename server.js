const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require('multer');
const app = express();
app.use(cors());
app.use(express.json());

const portdefault = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employee",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connceted to database");
});


app.post("/login", async (req, res) => {
  const v = [req.body.email, req.body.password];
  const data = db.query(
    `SELECT * FROM login WHERE (\`userName\` = (?) and \`pwd\` = (?))`,
    v,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      const user = results[0];
      console.log(user);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
      return res.json({
        success: true,
        user: { name : user.userName},
      });
    }
  );
});

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// GET all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM employees';
    
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching users:', err);
        res.status(500).send('Error fetching users');
      } else {
        res.status(200).json(result);
      }
    });
  });
  


app.post('/api/employees', upload.single('imgUpload'), (req, res) => {
  const { name, email, mobileNo, designation, gender, course } = req.body;
  const courseData = JSON.parse(course);
  const imgPath = req.file ? req.file.path : null;

  const selectedCourses = Object.keys(courseData).filter((key) => courseData[key]).join(',');

  const sql = 'INSERT INTO employees (name, email, mobile_no, designation, gender, course, img_upload) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, mobileNo, designation, gender, selectedCourses, imgPath], (err, result) => {
    if (err) {
      console.error('Error inserting employee:', err);
      res.status(500).send('Error inserting employee');
    } else {
      res.status(200).send('Employee created successfully');
    }
  });
});

// GET a user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM employees WHERE id = ?';
    
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Error fetching user');
      } else if (result.length === 0) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(result[0]); // Send the first user record
      }
    });
  });
  
// DELETE a user by ID
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM employees WHERE id = ?';
    
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
      } else {
        res.status(200).send('User deleted successfully');
      }
    });
  });

  
// PUT: Update a user by ID
app.put('/api/users/:id', upload.single('imgUpload'), (req, res) => {
    const userId = req.params.id;
    const { name, email, mobileNo, designation, gender, course } = req.body;
    const courseData = JSON.parse(course); // Convert the course JSON string to an object
    const imgPath = req.file ? req.file.path : null;
  
    const selectedCourses = Object.keys(courseData).filter((key) => courseData[key]).join(',');
  
    let sql = 'UPDATE employees SET name = ?, email = ?, mobile_no = ?, designation = ?, gender = ?, course = ?';
    let params = [name, email, mobileNo, designation, gender, selectedCourses];
  
    // Update image path only if a new file is uploaded
    if (imgPath) {
      sql += ', img_upload = ?';
      params.push(imgPath);
    }
  
    sql += ' WHERE id = ?';
    params.push(userId);
  
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
      } else {
        res.status(200).send('User updated successfully');
      }
    });
  });
  

app.listen(portdefault, () => {
  console.log(`server is running on PORT ${portdefault}`);
});
