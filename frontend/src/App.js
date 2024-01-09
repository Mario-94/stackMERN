import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'popper.js';
// // import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import "./App.css";
import Navigation from './components/Navigation';
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';


function App() {
  return (
    <BrowserRouter>
      {/* NOTE: Si quiero que un elemento siempre se muestre, comoNavigation, ejemplo menu de opciones lo tengo que poner fuera de los elementos Routes de lo contrario no puedo realizar esto */}
      <Navigation />
      <div className="container p-3">
        <Routes>

          <Route path="/" element={<NotesList />} />
          <Route path="/edit/:id" element={<CreateNote />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/user" element={<CreateUser />} />

        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
