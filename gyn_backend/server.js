import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"gynn"
})

app.post('/reg', (req, res) => {
    // Insert data into the 'patient' table
    const patientSql = "INSERT INTO patient (`phn`,`full_name`,`address`,`nic`,`phone_no`,`dob`,`marrital_status`,`blood_gr`) VALUES (?)";
    const patientValues = [
        req.body.phn,
        req.body.fname,
        req.body.address,
        req.body.nic,
        req.body.tp,
        req.body.dob,
        req.body.status,
        req.body.bloodgr
    ];

    db.query(patientSql, [patientValues], (patientErr, patientResult) => {
        if (patientErr) {
            console.error("Error inserting data into 'patient' table:", patientErr);
            return res.status(500).json({ error: "Error inserting data into 'patient' table", details: patientErr });
        }

        // Insert data into the 'admission' table
        const admissionSql = "INSERT INTO admission (`date`,`phn`,`bht`,`ward_no`,`consultant`,`past_obs`,`past_med`,`past_surg`,`diagnosis`,`hist_cancer`,`allergy`,`complaints`,`height`,`weight`,`other`) VALUES (?)";
        const admissionValues = [
            req.body.date,
            req.body.phn,
            req.body.bht,
            req.body.ward,
            req.body.consultant,
            req.body.past_obs,
            req.body.past_med,
            req.body.past_surg,
            req.body.diagnosis,
            req.body.past_hist,
            req.body.allergy,
            req.body.complaint,
            req.body.height,
            req.body.weight,
            req.body.other
        ];

        db.query(admissionSql, [admissionValues], (admissionErr, admissionResult) => {
            if (admissionErr) {
                console.error("Error inserting data into 'admission' table:", admissionErr);
                return res.status(500).json({ error: "Error inserting data into 'admission' table", details: admissionErr });
            }

            return res.status(200).json({ patientResult, admissionResult });
        });
    });
});


app.post('/staff_reg', (req, res) => {
    // Insert data into the 'patient' table
    const staffSql = "INSERT INTO staff (`full_name`,`phone_no`,`role`,`email`,`password`,`status`) VALUES (?)";
    const staffValues = [
        req.body.name,
        req.body.phone_no,
        req.body.role,
        req.body.email,
        req.body.password,
        req.body.status
    ];

    db.query(staffSql, [staffValues], (staffErr, staffResult) => {
        if (staffErr) {
            return res.json({ error: "Error inserting data into 'staff' table", details: staffErr });
        }

        return res.json({ staffResult });
    });
});

app.post('/login',(req,res) =>{
    const sql = "SELECT * from staff WHERE `email`=? AND `password` =?";
    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        //console.log(data);
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");
        }else{
            return res.json("Failed");
        }
    })
})

app.get('/details', (req, res) => {
    db.query('SELECT id, full_name, blood_gr,phn, phone_no, address, dob, marrital_status, nic,  FROM patient', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

app.get('/data', (req, res) => {
    const limit = req.query.limit || 20; // Default limit to 10 if not specified in the query string
    db.query('SELECT * FROM patient LIMIT ?', [limit], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

app.get('/admitdata', (req, res) => {
    const limit = req.query.limit || 20; // Default limit to 10 if not specified in the query string
    db.query('SELECT * FROM patient INNER JOIN admission ON patient.phn = admission.phn WHERE admission.status = "admit" LIMIT ?', [limit], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});

app.get('/dischargedata', (req, res) => {
    const limit = req.query.limit || 20; // Default limit to 10 if not specified in the query string
    db.query('SELECT * FROM patient INNER JOIN admission ON patient.phn = admission.phn WHERE admission.status = "discharged" LIMIT ?', [limit], (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(results);
        }
    });
});
app.post('/searchdata', (req, res) => {
    const { phn, name } = req.body;
    const limit = req.query.limit || 20; // Default limit to 20 if not specified in the query string
    let sqlQuery = 'SELECT * FROM patient WHERE ';

    if (phn) {
        // If input is a number, search by phn
        sqlQuery += 'phn LIKE ?';
        const searchTerm = `%${phn}%`; // Prepare search term for SQL LIKE clause
        db.query(sqlQuery, [searchTerm], (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving data from database');
            } else {
                res.json(results);
            }
        });
    } else if (name) {
        // If input is alphabets, search by name
        sqlQuery += 'full_name LIKE ?';
        const searchTerm = `%${name}%`; // Prepare search term for SQL LIKE clause
        db.query(sqlQuery, [searchTerm], (err, results) => {
            if (err) {
                res.status(500).send('Error retrieving data from database');
            } else {
                res.json(results);
            }
        });
    } else {
        res.status(400).send('Invalid search input');
    }
});

app.get('/view/:id',(req,res) =>{
    const sql ="SELECT * , FLOOR(DATEDIFF(CURRENT_DATE(), dob) / 365) AS age FROM  patient WHERE id = ?";
    const id=req.params.id;
    db.query(sql,[id],(err,result) =>{
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.json(result);
        }
       
    })
})

app.put('/discharge/:phn', (req, res) => {
    const sql = 'UPDATE admission SET status = "discharged" WHERE phn = ?';
    const phn = req.params.phn;
    db.query(sql, [phn], (err, result) => {
        if (err) {
            res.status(500).send('Error discharging data from database');
        } else {
            res.json(result);
        }
    });
});




  
app.get('/logout',(req,res)=>{
    //navigate('/');
    // req.session.user = null;
    // req.session.destroy();
    // return res.json("success")
})
app.listen(8081,() =>{
    console.log("Running...");
})
