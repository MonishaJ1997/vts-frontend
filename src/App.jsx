import 'bootstrap/dist/css/bootstrap.min.css';
import {  Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Courses from "./components/Courses";
import About from "./components/About";
import Contact from "./components/Contact";
import CourseDetails from "./components/CourseDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/course/:id" element={<CourseDetails />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;

