import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import nodemailer from "nodemailer";

const app = express();
const port = 4000;

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new pg.Client({
  user: "postgres",
  password: "r@ghu@123",
  database: "stulec",
  host: "localhost",
  port: 5432,
});

db.connect();
const saltrounds=10;
const datatosent=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"peddireddyraghuvardhanreddy@gmail.com",
    pass:"kyjw kvgr fcdr sswp",

  },

})
app.use(
  session({
    secret: "my_secret_key", 
    resave: false, 
    saveUninitialized: true,
    cookie: {
      secure: false, 
      maxAge: 30 * 60 * 1000, 
      httpOnly: true, 
      sameSite: 'strict' 
    },
  })
);

const check=(req,res,next)=>{
  
}

app.post("/login", async (req, res) => {
  try {
    const email = req.body.username;
    const password = req.body.password;

    const tutorResult = await db.query("SELECT * FROM tutor WHERE email=$1", [email]);
    if (tutorResult.rows.length > 0) {
      console.log("okk");
      const user = tutorResult.rows[0];
      const hashedPass = user.password;

      const isValid = await bcrypt.compare(password, hashedPass);
      if (isValid) {
        req.session.user = { id: user.id, role: "tutor" };
        console.log(req.session.user);
        return res.json({ status: "success", role: "tutor",id:tutorResult.rows[0].id,email:email});
      } else {
        return res.json({ status: "failure" });
      }
    }


    const tuteeResult = await db.query("SELECT * FROM tutee WHERE email=$1", [email]);
    if (tuteeResult.rows.length > 0) {
      const user = tuteeResult.rows[0];
      const hashedPass = user.password;

      const isValid = await bcrypt.compare(password, hashedPass);
      if (isValid) {
        req.session.user = { id: user.id, role: "tutee" };
        console.log(req.session.user);
        return res.json({ status: "success", role: "tutee" ,id:tuteeResult.rows[0].id,email:email});
      } else {
        return res.json({ status: "failure" });
      }
    }
    return res.json({ status: "failure", message: "User not found" });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/signup",async (req,res)=>{
    try{

        const username=req.body.username;
        const email=req.body.email;
        const password=req.body.password;
        const role=req.body.role;

        if(role==="tutee"){
          const ll = await db.query("SELECT * FROM tutee WHERE email = $1", [email]);
          if(ll.rows.length > 0){
            res.json({status:"failure", redirect: "/login" });
          }
          else{
            bcrypt.hash(password, saltrounds, async (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
            } else {
                const result = await db.query(
                    "INSERT INTO tutee (username,email, password,role) VALUES ($1,$2, $3,$4) RETURNING *",
                    [username,email, hash,role]
                );
                res.json({status:"success",role:"tutee"})

              }
          })
          }
        }

        if(role==="tutor"){
          const ll = await db.query("SELECT * FROM tutor WHERE email = $1", [email]);
          if(ll.rows.length > 0){
            res.json({status:"failure", redirect: "/login" });
          }
          else{
            bcrypt.hash(password, saltrounds, async (err, hash) => {
              if (err) {
                console.error("Error hashing password:", err);
            } else {
                const result = await db.query(
                    "INSERT INTO tutor (username,email, password,role) VALUES ($1,$2, $3,$4) RETURNING *",
                    [username,email, hash,role]
                );
                res.json({status:"success",role:"tutor"})
              }
          })
          }
        }
    }
    catch(err){
        console.log(err)
    }
});

app.post("/getsubjects",async (req,res)=>{
  const tutore=req.body.username;
  console.log(tutore);
  try{
    const i=await db.query("select subjects from tutordata where email=$1",[tutore]);
    if(i.rows.length>0){
      res.json({status:"success",ff:i.rows[0].subjects});
    }
    else{
      res.json({status:"failure"});
    }
  }
  catch(err){
    console.log(err);
  }
})
app.post("/teachform",async (req,res)=>{
  try{
    const fn=req.body.fn;
    const lna=req.body.lna;
    const age=req.body.age;
    const email=req.body.email;
    const dob=req.body.dob;
    const phnum=req.body.phnum;
    const subjects=req.body.sub;
    const expr=req.body.exp;
    const quali=req.body.quali;
    const addr=req.body.addr;
    const pinc=req.body.pinc;
    const ste=req.body.ste;
    const catogery=req.body.teachcategory;
    console.log(catogery)
     const rr=await db.query("insert into tutordata(fn,lna,age,dob,email,phnum,subjects,expr,quali,addr,pinc,ste,teachcategory) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[
      fn,
      lna,
      age,dob,
      email,
      phnum,
      subjects,
      expr,
      quali,
      addr,
      pinc,
      ste,
      catogery
     ]);
     res.json({status:"success"});
     console.log("gh");
  }
  catch(err){
    console.log(err);
    res.json({status:"failure"});
  }
})

app.post("/tuteeform",async (req,res)=>{
  const fname=req.body.fname;
  const lname=req.body.lname;
  const email=req.body.email;
  const phnumber=req.body.phnumber;
  const age=req.body.age;
  const dateofbirth=req.body.dateofbirth;
  const cname=req.body.cname;
  const rnstudying=req.body.rnstudying;
  console.log(fname);
  try{
    const kk=await db.query("insert into tuteedata (fname,lname,email,phnumber,age,dateofbirth,cname,rnstudying) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *",[
      fname,lname,email,phnumber,age,dateofbirth,cname,rnstudying
    ]);

    if(kk.rows.length>0){
      res.json({status:"success"})
    }
    else{
      res.json({status:"failure"});
    }
  }
  catch(err){
    console.log(err);
  }
})

app.get("/profiledata/:id/:role", async (req, res) => {
  const { id, role } = req.params;

  if (role === "tutee") {
    try {
      console.log(role)
      console.log(id)
      const rg = await db.query("SELECT * FROM tutee WHERE id=$1", [id]);
      if (rg.rows.length) {
        console.log(rg.rows[0]);
        res.json({ status: "success",username: rg.rows[0].username,email:rg.rows[0].email });
      } else {
        res.json({ status: "failure", message: "No tutee found" });
      }
    } catch (err) {
      console.log("Error fetching tutee data:", err);
      res.status(500).json({ status: "error", message: "Error fetching tutee data" });
    }
  } else {
    try {
      console.log(role)
      console.log(id)
      const rs = await db.query("SELECT * FROM tutor WHERE id=$1", [id]);
      console.log(rs.rows[0]);
      if (rs.rows.length) {
        res.json({ status: "success", username: rs.rows[0].username,email:rs.rows[0].email });
      } else {
        res.json({ status: "failure", message: "No tutor found" });
      }
    } catch (err) {
      console.log("Error fetching tutor data:", err);
      res.status(500).json({ status: "error", message: "Error fetching tutor data" });
    }
  }
});

app.post("/codesent", async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  console.log(`Email to send code: ${email}`);

  // Generate a 6-digit verification code
  const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();

  const mailDataToSend = {
    from: "peddireddyraghuvardhanreddy@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Your verification code is ${verificationCode}`,
  };

  try {
    datatosent.sendMail(mailDataToSend, (error, info) => {
      if (error) {
        console.error(`Email sending error: ${error}`);
        return res.status(500).json({ message: "Failed to send email." });
      } else {
        console.log("Verification code sent successfully.");
        return res.status(200).json({ code: verificationCode });
      }
    });
  } catch (error) {
    console.error(`Unexpected server error: ${error}`);
    return res.status(500).json({ message: "Unexpected server error." });
  }
});


app.post("/getSearchSubject",async (req,res)=>{
  const data = req.body.sub;
console.log(req.body);
console.log(data)
try{
  const d=await db.query("select * from lectures where subject=$1",[data]);
  if(d.rows.length){
    res.json({status:"success",ans:d.rows});
    console.log(d.rows)
  }
  else{
    res.json({status:"failure"});
  }
}
catch(err){
  console.log(err);
}
})

app.post("/getSearchLecturer",async (req,res)=>{
  const data = req.body;
  const sub = Object.keys(data)[0];
  console.log(req.body);
  console.log(sub)
  try{
    const d=await db.query("select * from tutordata where fn=$1",[sub]);
    if(d.rows.length){
      res.json({status:"success",ans:d.rows});
      console.log(d.rows)
    }
    else{
      res.json({status:"failure"});
    }
  }
  catch(err){
    console.log(err);
  }
})

app.post("/getTutordata", async (req, res) => {
  const tutormail = req.body.tutormail;
  console.log(tutormail);
  try {
    console.log(tutormail)
    const resData = await db.query("SELECT * FROM tutordata WHERE email = $1", [tutormail]);
    if (resData.rows.length > 0) {
      res.json({ status: "success", tutordata: resData.rows });
    } else {
      res.json({ status: "failure", message: "No tutor data found" });
    }
  } catch (err) {
    console.error("Error fetching tutor data:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

app.post("/createttTable",async (req,res)=>{
  
  const {tuteeemail,tutoremail}=req.body;
  const status="yes";
  try{
    const restt=await db.query("insert into bookings (tutoremail,tuteemail,status) values($1,$2,$3)",[tutoremail,tuteeemail,status]);
    res.json({status:"success"})
  }
  catch(err){
    res.json({status:"failure"})
    console.log(err);
  }
});

app.post("/bookeddata",async(req,res)=>{
  const tuteemail=req.body.tuteemail;
  try{
    console.log(tuteemail)
    const r=await db.query("select * from bookings where tuteemail=$1",[tuteemail]);
    if(r.rows.length>0){
      console.log("ok")
      res.json({status:"success",d:r.rows});
    }
    else{
      res.json({status:"failure"})
    }
  }
  catch(err){
    console.log(err);
  }
})

app.post("/tutordata",async (req,res)=>{
  const {tutormail}=req.body;
  console.log(tutormail)
  try{
    const ff=await db.query("select * from bookings where tutoremail=$1",[tutormail]);
    console.log("ok")
    if(ff.rows.length){
      console.log("ok")
      res.json({status:"success",kk:ff.rows})
    }
    else{
      res.json({status:"failure"});
    }
  }
  catch(err){
    console.log(err);
  }
})

app.post("/cancleBooking",async (req,res)=>{
  const {id}=req.body;
  console.log(id);
  try{
    const yy=await db.query("delete from bookings where id=$1",[id]);
    if(yy.rowCount>0){
      res.json({ status: "success", message: "Booking deleted successfully" });
    }
    else{
      res.json({ status: "failure", message: "No booking found with this ID" });
    }
  }
  catch(err){
    console.log(err);
  }
})

app.post("/addlecture",async (req,res)=>{
  // const {usrname,tutoremail,subject,phnumber,lecturedatetime}=req.body;
  const usrname=req.body.usrname;
  const tutoremail=req.body.email;
  const subject=req.body.subject;
  const phnumber=req.body.number;
  const lecturedatetime=req.body.dateTime;
  const status="yes";
  console.log(usrname);
  console.log(tutoremail);
  try{
    const lecture=await db.query("insert into lectures (usrname,tutoremail,subject,phnumber,lecturedatetime,status) values ($1,$2,$3,$4,$5,$6) returning *",[usrname,tutoremail,subject,phnumber,lecturedatetime,status])
    if(lecture.rows.length>0){
      res.json({status:"success",lecdata:lecture.rows});
    }
    else{
      res.json({status:"failure"})
    }
  }
  catch(err){
    console.log(err);
  }
});

app.post("/editlecture",async (req,res)=>{
  const {tutoremail}=req.body;
  try{
    const el=await db.query("select * from lectures where tutoremail=$1",[tutoremail]);
    if(el.rows.length>0){
      res.json({status:"success",kk:el.rows});
    }
    else{
      res.json({status:"failure"});
    }
  }
  catch(err){
    console.log(err)
  }
})

app.delete("/deletelecture/:id",async (req,res)=>{
  const id=req.params.id;
  console.log(id);
  try{
    const dl=await db.query("delete from lectures where id=$1 returning *",[id]);
    if(dl.rows.length>0){
      res.json({status:"success"});
    }
    else{
      res.json({status:"failure"});
    }
  }
  catch(err){
    console.log(err);
  }
})

app.post("/editlecturedata",async (req,res)=>{
  const {id}=req.body;

  try{
    const eld=await db.query("select * from lectures where id=$1",[id]);
    if(eld.rows.length>0){
      console.log(eld.rows)
      res.json({status:"success",lecturedata:eld.rows});
      
    }
    else{
      res.json({status:"failure"})
    }
  }
  catch(err){
    console.log(err);
  }
})

app.put("/updatelecturedata",async (req,res)=>{
  const usrname=req.body.usrname;
  const tutoremail=req.body.email;
  const subject=req.body.subject;
  const phnumber=req.body.number;
  const lecturedatetime=req.body.dateTime;
  const id=req.body.id;
  const status="yes";
  console.log(status)

  try{
    console.log(tutoremail)
    const uld=await db.query("update lectures set usrname=$1,tutoremail=$2,subject=$3,phnumber=$4,lecturedatetime=$5,status=$6 where id=$7 returning *",[usrname,tutoremail,subject,phnumber,lecturedatetime,status,id])
    if(uld.rows.length>0){
      res.json({status:"success"});
    }
    else{
      res.json({status:"failure"})
    }
  }
  catch(err){
    console.log(err);
  }
});

app.post("/cancleBookings",async (req,res)=>{
  const id=req.body.id;
  try{
    const ll=await db.query("delete from bookings where id=$1 returning *",[id]);
    if(ll.rows.length>0){
      res.json({status:"success",da:ll.rows});
    }
    else{
      res.json({status:"failure"})
    }
  }
  catch(err){

  }
})
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out");
    }
    res.clearCookie("connect.sid");
    res.send("Logout successful");
  });
});

app.listen(port, () => {
  console.log("Successfully listening on port 4000");
});