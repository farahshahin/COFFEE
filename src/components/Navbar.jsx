import { useState, useEffect } from "react";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useIsMobile } from "../hooks/useMobile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);

  const location = useLocation();
  const isMobile = useIsMobile();

  const isHome = location.pathname === "/";
  const isSolid = !isHome || isScrolled || expanded;

  const closeMenu = () => {
    if (!expanded || closing) return;
    setClosing(true);
  };

  useEffect(() => {
    if (!isHome) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setExpanded(false);
    setClosing(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  return (
    <>
      <style>
        {`
          .site-navbar {
            z-index: 1030;
            transition: background-color 0.4s ease;
          }
          .navbar-solid { background-color: #493326; }
          .navbar-transparent { background-color: transparent; }

          .coffee-logo {
            color: #F5EFE6 !important;
            text-decoration: none;
            font-family: var(--font-display);
          }
          .coffee-logo img { object-fit: contain; }
          .coffee-logo span { letter-spacing: 1px; }

          /* Desktop Links */
          .desktop-links .nav-link {
            position: relative;
            color: #F5EFE6 !important;
            transition: color 0.3s ease;
          }
          .desktop-links .nav-link::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #B88955;
            transition: width 0.3s ease;
          }
          .desktop-links .nav-link:hover::after,
          .desktop-links .nav-link.active::after { width: 100%; }
          .desktop-links .nav-link:hover,
          .desktop-links .nav-link.active { color: #D8C0A5 !important; }

          /* Buttons */
          .shopping-bag,.mobile-toggle, .close-menu {
            width: 42px;
            height: 42px;
            border: 1px solid #FFFFFF !important;
            border-radius: 50%;
            color: #FFFFFF !important;
            background: transparent !important;
          }

          /* Fullscreen Menu */
          .fullscreen-menu {
            z-index: 1040;
            background-color: #493326;
            clip-path: circle(0% at calc(100% - 30px) 30px);
            animation: menuExpand 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          }
          .fullscreen-menu.closing {
            pointer-events: none;
            animation: menuCollapse 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          }

          @keyframes menuExpand {
            to { clip-path: circle(150% at calc(100% - 30px) 30px); }
          }

          @keyframes menuCollapse {
            from { clip-path: circle(150% at calc(100% - 30px) 30px); }
            to { clip-path: circle(0% at calc(100% - 30px) 30px); }
          }

          /* Close Button */
          .close-menu {
            opacity: 0;
            animation: showContent 0.5s ease 0.55s forwards;
          }

          /* Mobile Links */
          .menu-links .nav-link {
            color: #F5EFE6 !important;
            font-family: var(--font-display);
            opacity: 0;
            transform: translateY(20px);
            animation: showContent 0.65s ease forwards;
            transition: color 0.3s ease;
          }
          .menu-links .nav-link:nth-child(1) { animation-delay: 0.45s; }
          .menu-links .nav-link:nth-child(2) { animation-delay: 0.55s; }
          .menu-links .nav-link:nth-child(3) { animation-delay: 0.65s; }
          .menu-links .nav-link:nth-child(4) { animation-delay: 0.75s; }
          .menu-links .nav-link:hover,
          .menu-links .nav-link.active { color: #D8C0A5 !important; }

          @keyframes showContent {
            to { opacity: 1; transform: translateY(0); }
          }

          .fullscreen-menu.closing .menu-links .nav-link,
          .fullscreen-menu.closing .close-menu {
            animation: hideContent 0.2s ease forwards;
          }

          @keyframes hideContent {
            to { opacity: 0; transform: translateY(12px); }
          }

          /* Responsive */

          @media (max-width: 767px) {
            .coffee-logo img { width: 34px; height: 34px; }
            .coffee-logo span { font-size: 21px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .fullscreen-menu,
            .menu-links .nav-link,
            .close-menu { animation-duration: 0.01ms !important; }
          }
        `}
      </style>

     

      <BootstrapNavbar fixed="top" variant="dark" className={`site-navbar py-2 ${isSolid ? "navbar-solid" : "navbar-transparent"}`}>
        <Container fluid className="position-relative px-4 px-lg-5 d-flex align-items-center">
          {/* Logo */}
          <BootstrapNavbar.Brand as={NavLink} to="/" className="coffee-logo d-flex align-items-center gap-2 m-0">
            <img src="/logo.png" alt="COFFEE" width="38" height="38" className="object-fit-contain" />
            <span className="fs-4 fw-semibold">COFFEE</span>
          </BootstrapNavbar.Brand>

          {/* Desktop Navigation */}
          <Nav className="desktop-links d-none d-md-flex position-absolute top-50 start-50 translate-middle align-items-center gap-3">
            <Nav.Link as={NavLink} to="/" end className="position-relative small">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/shop" className="position-relative small">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="position-relative small">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="position-relative small">Contact</Nav.Link>
          </Nav>

          {/* Actions */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <button className="shopping-bag btn d-flex align-items-center justify-content-center p-0" aria-label="Shopping Bag">
              <i className="bi bi-bag"></i>
            </button>

            {isMobile && (
              <button className="mobile-toggle btn d-flex align-items-center justify-content-center p-0" onClick={() => setExpanded(true)} aria-label="Open menu">
                <i className="bi bi-list"></i>
              </button>
            )}
          </div>

        </Container>
      </BootstrapNavbar>

      {/* Mobile Fullscreen Menu */}

      {isMobile && expanded && (
        <div
          className={`fullscreen-menu position-fixed top-0 start-0 w-100 vh-100 d-flex align-items-center justify-content-center ${closing ? "closing" : ""}`}
          onAnimationEnd={(event) => {
            if (event.animationName === "menuCollapse") {
              setExpanded(false);
              setClosing(false);
            }
          }}
        >
          <button className="close-menu btn position-absolute top-0 end-0 mt-4 me-4 d-flex align-items-center justify-content-center p-0 fs-3" onClick={closeMenu} aria-label="Close menu">
            <i className="bi bi-x"></i>
          </button>

          <Nav className="menu-links d-flex flex-column align-items-center gap-3">
            <Nav.Link as={NavLink} to="/" end onClick={closeMenu} className="fs-2">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/shop" onClick={closeMenu} className="fs-2">Menu</Nav.Link>
            <Nav.Link as={NavLink} to="/about" onClick={closeMenu} className="fs-2">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact" onClick={closeMenu} className="fs-2">Contact</Nav.Link>
          </Nav>
        </div>
      )}
    </>
  );
}
