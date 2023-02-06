import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import CreateTask from "./createtask";
// import ManageTask from "./managetask";
// import UserRegister from "./register/userRegister";
// import HomePage from "./homePage"
// import BookDetails from "./book/bookDetails";
// import CreateBook from "./book/createBook";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <BrowserRouter>
        <h2 style={{ background: "#b84dff", color: "white", textAlign: "center" ,width:"1280px"}}>Shopping List</h2>
        <Routes>
            <Route path='/' element={<App />} />
            {/* <Route path='/createtask' element={<CreateTask />} />
            <Route path="/managetask" element={<ManageTask />} />
             */}
        </Routes>
    </BrowserRouter>
)