import React from 'react';
import { Navigate,} from 'react-router-dom';
import {useLocation } from 'react-router-dom';
import './AccessDenied.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user_session");
  const data=JSON.parse(localStorage.getItem("roleslogin"));
  const r=data?.role;
  const location = useLocation();

  const tutorRoutes = ["/tutormain","/tutorprofile","/yourdata","/addlecture","/editlecture","/editlecturedata/:id"];
  const tuteeRoutes = ["/tuteemain","/profile","/bookings","/book"];
  const accessDeniedMessage = (
    <div className="access-denied">
      <h1>404</h1>
      <h2>Access Denied</h2>
      <p>You do not have permission to access this page.</p>
      <p>Please contact the administrator if you believe this is an error.</p>
      <a href='/'>Go To Home Page</a>
    </div>
  );
// alert("ok");
// alert(r);
  // alert("ok");

  if (!isAuthenticated) {
    <Navigate to="/" />;
  }
  
  else{
    if (location.pathname === '/' || location.pathname === '/login') {
      if (r === 'tutor') {
        return <Navigate to="/tutormain" />;
      } else if (r === 'tutee') {
        return <Navigate to="/tuteemain" />;
      }
    }
    if(r==="tutor" && !tutorRoutes.some(route => location.pathname.startsWith(route))){
      return accessDeniedMessage;
     
   }
   if(r==="tutee" && !tuteeRoutes.some(route => location.pathname.startsWith(route))){
     return accessDeniedMessage;
   }
  }
  
  return children;
};

export default ProtectedRoute;
