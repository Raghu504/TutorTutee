import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./header.jsx";
import Contactus from "./contactus.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import TutorMain from "./tutormain.jsx";
import TuteeMain from "./tuteemain.jsx";
import Profile from "./profile.jsx";
import Bookings from "./bookings.jsx";
import Tutorprofile from "./tutorprofile.jsx";
import Yourdata from "./tutordata.jsx";
import ProtectedRoute from "./protectroute.jsx";
import Form from "./form.jsx";
import Aboutus from "./aboutus.jsx";
import Emailver from "./emailver.jsx";
import Bookinfo from "./bookinfo.jsx";
import Addlecture from "./addlecture.jsx";
import Editlecture from "./editlecture.jsx";
import Editlecturedata from "./editlecturedata.jsx";
import StudentForm from "./tuteeform.jsx";

function App() {
    const data=JSON.parse(localStorage.getItem("roleslogin"));
    const r=data?.role;
    const d=JSON.parse(localStorage.getItem("i"));
    const i=d?.i;
    // alert(i)
    // alert(JSON.parse(localStorage.getItem("ids")))
    const s=JSON.parse(localStorage.getItem("codes"));
    const code=s?.code;
    const e=JSON.parse(localStorage.getItem("emailz"));
    const email=e?.email;

    
    return (
        <Router>
            <Routes>
                <Route path="/contactus" element={<Contactus />} />
                
                <Route path="/signup" element={<Signup />} />
                <Route path="/teachform" element={<Form />} />
                <Route path="/aboutus" element={<Aboutus />} />
                <Route path="/emailVerification" element={<Emailver />}/>
                <Route path="/tuteeform" element={<StudentForm />}/>
                <Route path="/" 
                    element={
                            <ProtectedRoute>
                                <Header />
                            </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/tutormain"
                    element={
                        <ProtectedRoute>
                            <TutorMain />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tuteemain"
                    element={
                        <ProtectedRoute>
                            <TuteeMain email={email}/>
                        </ProtectedRoute>
                    }
                />
                <Route
                path="/editlecturedata/:id"
                element={
                    <ProtectedRoute>
                        <Editlecturedata />
                    </ProtectedRoute>
                }
                />
                <Route 
                    path="/editlecture"
                    element={
                        <ProtectedRoute>
                            <Editlecture />
                        </ProtectedRoute>
                    }
                    />
                <Route 
                    path="/addlecture"
                    element={
                        <ProtectedRoute>
                            <Addlecture />
                        </ProtectedRoute>
                    }
                    />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile id={i} role={r}/>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/book"
                    element={
                        <ProtectedRoute>
                            <Bookinfo />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/bookings"
                      element={<ProtectedRoute>
                            <Bookings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tutorprofile"
                    element={
                        <ProtectedRoute>
                            <Tutorprofile id={i} role={r} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/yourdata"
                    element={
                        <ProtectedRoute>
                            <Yourdata />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
