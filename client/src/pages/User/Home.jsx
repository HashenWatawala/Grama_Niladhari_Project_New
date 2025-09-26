import React, { useState } from "react";
import "../../styles/home.css";
import emblem from "../../assets/emblem.jpg";
import colombo from "../../assets/colombo.jpg";
import Citizen from "./Citizen";
import Institute from "./Institute";

const Home = () => {
  const [showCitizenPopup, setShowCitizenPopup] = useState(false);
  const [showInstitutePopup, setInstitutePopup] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-2"
            id="Emblem"
            style={{
              backgroundImage: `url(${emblem})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100px",
            }}
          ></div>
          <div className="col-10" id="heading">
            <h1 className="heading1">GRAMA NILADHARI E-CERTIFICATION</h1>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        data-aos="fade-down"
        data-aos-duration="1500"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler me-3 text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon bx-md"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link mx-5 fs-5 text-white" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-5 fs-5 text-white" href="#AboutUs">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-5 fs-5 text-white" href="#ContactUs">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-md heading2"
            style={{
              backgroundImage: `url(${colombo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              paddingTop: "100px",
              paddingBottom: "50px",
            }}
          >
            <center>
              <h1 className="text-white title">
                Welcome to the
                <br />
                E-Certification
              </h1>
              <p className="text-white subTitle">
                Now Grama Niladhari certificates
                <br />
                can be taken online through this web
                <br />
                platform
              </p>
            </center>
          </div>

          {/* Action Buttons */}
          <div
            className="col-md"
            style={{ backgroundImage: "linear-gradient(#0A021E, #000000)" }}
          >
            <center>
              <div className="container Select">
                <h3 className="text-white" style={{ paddingTop: "50px" }}>
                  Use as
                </h3>
                <button
                  type="button"
                  className="btn btn-dark SelectButton"
                  style={{ backgroundColor: "#000000", marginBottom: "20px" }}
                  onClick={() => setShowCitizenPopup(true)}
                >
                  Citizen
                </button>
                <br />
                <button
                  type="button"
                  className="btn btn-dark"
                  style={{ marginBottom: "50px", backgroundColor: "#000000" }}
                  onClick={() => setInstitutePopup(true)}
                >
                  Institute
                </button>

                {showCitizenPopup && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#ffffffff",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "90%",
                        maxWidth: "800px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() => setShowCitizenPopup(false)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "none",
                          color: "#000",
                          border: "none",
                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>

                      {/* Render Citizen Component */}
                      <Citizen />
                    </div>
                  </div>
                )};
                {showInstitutePopup && (
                  <div
                    style={{  
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0,0,0,0.6)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        width: "90%",
                        maxWidth: "800px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() => setInstitutePopup(false)}
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "none",
                          color: "#000",
                          border: "none",

                          borderRadius: "50%",
                          width: "30px",
                          height: "30px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </button>
                      {/* Render Institute Component */}
                      <Institute />
                    </div>
                  </div>
                )}
              </div>
            </center>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="About">
        <center>
          <section id="AboutUs">
            <h1 className="Title2">About Us....</h1>
          </section>
          <p className="text-white introduction">
            Our website simplifies the process of obtaining certificates issued
            by Grama <br />
            Niladharis in Sri Lanka. Users select the relevant form, fill it
            out, and submit <br />
            their application.
          </p>
        </center>
      </div>

      {/* Cards Section */}
      <div className="container myCards">
        <div className="row gy-3 mx-5">
          {[
            {
              icon: "bi bi-1-circle",
              title: "Select Relevant Form",
              text: "Choose the appropriate <br /> form for your certificate <br /> request.",
            },
            {
              icon: "bi bi-2-circle",
              title: "Fill the Form",
              text: "Complete the form with <br /> necessary details <br /> accurately.",
            },
            {
              icon: "bi bi-3-circle",
              title: "Apply",
              text: "Submit your application <br /> for processing. <br />click apply",
            },
          ].map((card, idx) => (
            <div key={idx} className="col-md-4">
              <center>
                <div className="card myCard">
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "50px" }}>
                      <i className={card.icon}></i>
                    </h5>
                    <h6 className="card-subtitle mb-2 text-body">
                      <b>{card.title}</b>
                    </h6>
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{ __html: card.text }}
                    />
                  </div>
                </div>
              </center>
            </div>
          ))}
        </div>
        <center>
          <p style={{ marginBottom: "10vh", marginTop: "5vh" }}>
            <b>Note - </b> You have to meet your Grama Niladhari and register
            for this service.
          </p>
        </center>
      </div>

      {/* Contact Section */}
      <div
        className="container-fluid mt-auto"
        style={{ backgroundImage: "linear-gradient(#0E24E5, #32517F)" }}
      >
        <center>
          <section id="ContactUs">
            <h1 className="Title2" style={{ marginBottom: "10vh" }}>
              Get in touch
            </h1>
          </section>
        </center>

        <div className="container">
          <div className="row text-center">
            <div className="col-md">
              <h1>
                <i className="bi bi-geo-alt-fill text-white"></i>
              </h1>
              <h1 className="text-white">Address</h1>
              <p className="text-white">
                Independence Square,
                <br />
                Independence ave,
                <br />
                Colombo 00700
              </p>
            </div>
            <div className="col-md">
              <h1>
                <i className="bi bi-telephone-fill text-white"></i>
              </h1>
              <h1 className="text-white">Tel</h1>
              <p className="text-white">
                Hotline - 1919 <br />
                Head office - 0112 166 000
              </p>
            </div>
            <div className="col-md">
              <h1>
                <i className="bi bi-envelope-fill text-white"></i>
              </h1>
              <h1 className="text-white">Email</h1>
              <p className="text-white">egramaniladhari@gmal.com</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-3">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item mx-5">
              <a href="#" className="nav-link px-2 text-white">
                Home
              </a>
            </li>
            <li className="nav-item mx-5">
              <a href="#AboutUs" className="nav-link px-2 text-white">
                About
              </a>
            </li>
            <li className="nav-item mx-5">
              <a href="#ContactUs" className="nav-link px-2 text-white">
                Help
              </a>
            </li>
          </ul>
          <p className="text-center" style={{ color: "white" }}>
            © All right reserved <br />
            Design and developed by team Kairos
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
