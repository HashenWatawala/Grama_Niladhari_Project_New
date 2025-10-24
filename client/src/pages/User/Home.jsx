import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emblem from "../../assets/emblem.jpg";
import colombo from "../../assets/colombo.jpg";
import Citizen from "./Citizen";
import Institute from "./Institute";

const Home = () => {
  const [showCitizenPopup, setShowCitizenPopup] = useState(false);
  const [showInstitutePopup, setShowInstitutePopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-light text-dark min-vh-100 d-flex flex-column">
      {/* ---------- HEADER ---------- */}
      <header className="d-flex align-items-center bg-primary py-3 px-4 shadow-sm">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-white me-3"
          style={{
            backgroundImage: `url(${emblem})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "80px",
            height: "80px",
          }}
        ></div>
        <h1 className="flex-grow-1 text-center text-white fw-bold mb-0 fs-4 fs-md-3">
          GRAMA NILADHARI E-CERTIFICATION
        </h1>
      </header>

      {/* ---------- NAVBAR ---------- */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="navbarNav"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse justify-content-center ${
              isMenuOpen ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <a className="nav-link active text-white fw-semibold" href="#" aria-current="page">
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link text-white fw-semibold" href="#AboutUs">
                  About
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link text-white fw-semibold" href="#ContactUs">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ---------- HERO SECTION ---------- */}
      <section
        className="hero-section d-flex align-items-center text-center text-white position-relative"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${colombo}) center/cover no-repeat`,
          minHeight: "60vh",
        }}
      >
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
            Welcome to the E-Certification
          </h1>
          <p className="lead fs-5 animate__animated animate__fadeInUp">
            Now Grama Niladhari certificates can be requested online easily
            through our web platform.
          </p>
        </div>
      </section>

      {/* ---------- USE AS SECTION ---------- */}
      <section className="py-5 bg-light">
        <div className="container">
          <h3 className="text-center mb-5 fw-bold text-dark">Use As</h3>
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-6 col-lg-5">
              <div className="card border-0 shadow-lg h-100 text-center bg-white hover-card" onClick={() => setShowCitizenPopup(true)} style={{ cursor: 'pointer' }}>
                <div className="card-body py-5">
                  <i className="bi bi-person-circle fs-1 text-primary mb-3"></i>
                  <h5 className="card-title fw-bold text-dark">Citizen</h5>
                  <p className="card-text text-muted">Request certificates as an individual citizen. Fill out the form and submit your application online.</p>
                  <button className="btn btn-primary btn-lg mt-3">Get Started</button>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5">
              <div className="card border-0 shadow-lg h-100 text-center bg-white hover-card" onClick={() => setShowInstitutePopup(true)} style={{ cursor: 'pointer' }}>
                <div className="card-body py-5">
                  <i className="bi bi-building fs-1 text-success mb-3"></i>
                  <h5 className="card-title fw-bold text-dark">Institute</h5>
                  <p className="card-text text-muted">Access institutional services for bulk requests or organizational needs.</p>
                  <button className="btn btn-success btn-lg mt-3">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT SECTION ---------- */}
      <section
        id="AboutUs"
        className="text-center py-5 text-white"
        style={{ background: "linear-gradient(180deg, #1E3C59, #4082BF)" }}
      >
        <div className="container">
          <h2 className="text-decoration-underline mb-4 fw-bold">About Us</h2>
          <p className="fs-5 lh-base">
            Our platform simplifies the process of obtaining Grama Niladhari certificates
            in Sri Lanka. Just select the form, fill your details, and submit your
            application online.
          </p>
        </div>
      </section>

      {/* ---------- STEPS CARDS ---------- */}
      <section className="container py-5 my-5">
        <div className="row g-4 justify-content-center">
          {[
            {
              icon: "bi bi-1-circle-fill",
              title: "Select Relevant Form",
              text: "Choose the correct form for your certificate request.",
            },
            {
              icon: "bi bi-2-circle-fill",
              title: "Fill the Form",
              text: "Enter the required information accurately.",
            },
            {
              icon: "bi bi-3-circle-fill",
              title: "Apply",
              text: "Submit your application for processing.",
            },
          ].map((card, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-lg h-100 text-center py-4 bg-white hover-shadow">
                <div className="card-body">
                  <i className={`${card.icon} fs-1 text-primary mb-3`}></i>
                  <h5 className="fw-bold text-dark">{card.title}</h5>
                  <p className="text-muted">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="alert alert-info mt-4 text-center">
          <strong>Note:</strong> You must meet your Grama Niladhari and register for this service.
        </div>
      </section>

      {/* ---------- CONTACT SECTION ---------- */}
      <section
        id="ContactUs"
        className="py-5 text-white flex-grow-1"
        style={{ background: "linear-gradient(#0E24E5, #32517F)" }}
      >
        <div className="container text-center text-white">
          <h2 className="text-decoration-underline mb-5 fw-bold text-white">Get in Touch</h2>
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="p-3">
                <i className="bi bi-geo-alt-fill fs-2 text-warning"></i>
                <h5 className="mt-3 fw-semibold">Address</h5>
                <p>Independence Square, Colombo 00700</p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-3">
                <i className="bi bi-telephone-fill fs-2 text-success"></i>
                <h5 className="mt-3 fw-semibold">Tel</h5>
                <p>
                  Hotline - 1919 <br /> Head Office - 0112 166 000
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-3">
                <i className="bi bi-envelope-fill fs-2 text-danger"></i>
                <h5 className="mt-3 fw-semibold">Email</h5>
                <p>egramaniladhari@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center mt-5 pt-4 border-top border-light text-white">
          <ul className="nav justify-content-center mb-3">
            <li className="nav-item">
              <a href="#" className="nav-link px-3 text-white fw-semibold">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#AboutUs" className="nav-link px-3 text-white fw-semibold">
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#ContactUs" className="nav-link px-3 text-white fw-semibold">
                Help
              </a>
            </li>
          </ul>
          <p className="small mb-0">
            © All rights reserved. <br /> Designed & developed by <strong>Team Kairos</strong>
          </p>
        </footer>
      </section>

      {/* ---------- POPUPS ---------- */}
      {showCitizenPopup && (
        <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Citizen Portal</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowCitizenPopup(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <Citizen />
              </div>
            </div>
          </div>
        </div>
      )}

      {showInstitutePopup && (
        <div className="modal fade show d-block bg-dark bg-opacity-75" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Institute Portal</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowInstitutePopup(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <Institute />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;