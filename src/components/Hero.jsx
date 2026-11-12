
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";

function CoffeeCup() {
  return (
    <svg viewBox="0 0 180 150" aria-hidden="true" style={{ width: "100%" }}>
      <path
        d="M126 48 H139 C165 48 165 91 139 91 H125"
        fill="none"
        stroke="#D8C0A5"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M32 39 H132 L120 112 Q116 126 101 126 H62 Q47 126 43 112 Z"
        fill="#D8C0A5"
        stroke="#493326"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <ellipse cx="82" cy="43" rx="47" ry="5" fill="#493326" />
      <path
        d="M20 133 Q82 145 148 133"
        fill="none"
        stroke="#D8C0A5"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="position-relative w-100 overflow-hidden d-flex align-items-center"
      style={{
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#2B1E18",
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#FFFFFF",
      }}
    >
      {/* Background overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(43,30,24,0.92) 0%, rgba(43,30,24,0.72) 45%, rgba(43,30,24,0.25) 100%)",
          zIndex: 0,
        }}
      />

      {/* Hero content */}
      <Container
        className="position-relative"
        style={{
          zIndex: 2,
          paddingTop: "55px",
          paddingBottom: "100px",
        }}
      >
        <div
          style={{
            maxWidth: "750px",
            animation: "fadeUp 1s ease both",
            animationDelay: "0.3s",
          }}
        >
          <p
            className="small fw-semibold mt-4 mb-2"
            style={{ letterSpacing: "10px", color: "#D8C0A5" }}
          >
            ROASTERY <span className="mx-1">·</span> PÂTISSERIE
            <span className="mx-1">·</span> SINCE 2014
          </p>

          <h1
            className="mb-4"
            style={{
              color: "#F5EFE6",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 6vw, 76px)",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            Slow coffee,
            <br />
            <span style={{ color: "#D8C0A5", fontStyle: "italic" }}>
              sweet moments.
            </span>
          </h1>

          <p
            className="mb-5"
            style={{
              maxWidth: "470px",
              color: "rgba(245,239,230,0.85)",
              fontSize: "14px",
              lineHeight: 1.8,
            }}
          >
            A neighbourhood café of single-origin roasts, hand-whisked matcha
            and desserts baked before sunrise.
          </p>

          <Button
            as={Link}
            to="/menu"
            className="rounded-pill px-4 py-3 hero-button"
            style={{
              backgroundColor: "#D8C0A5",
              border: "1px solid #D8C0A5",
              color: "#2B1E18",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
          >
            Explore Menu <span className="ms-2">→</span>
          </Button>
        </div>
      </Container>

      {/* Floating coffee cup */}
      <div className="position-absolute" style={{ zIndex: 2, width: "175px", right: "8%", bottom: "8%",animation: "cupFloat 4s ease-in-out infinite",}}>
        {/* Coffee steam */}
        <div className="position-absolute w-100 d-flex justify-content-evenly">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              style={{
                width: "9px",
                height: "35px",
                borderLeft: "2px solid rgba(245,239,230,0.75)",
                borderRadius: "50%",
                animation: `steamRise 2.5s ease-in-out ${item * 0.6}s infinite`,
              }}
            />
          ))}
        </div>
        <CoffeeCup />
      </div>

      <div
        className="position-absolute d-flex flex-column align-items-center"
        style={{
          zIndex: 2,
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          gap: "10px",
          color: "#D8C0A5",
        }}
      >
        <span
          style={{
            width: "1px",
            height: "35px",
            backgroundColor: "#B88955",
            animation: "scrollDown 1.5s ease-in-out infinite",
          }}
        />

        <small style={{ fontSize: "8px", letterSpacing: "2px" }}>
          SCROLL TO EXPLORE
        </small>
      </div>
      <style>{`
        .hero-button:hover {
          background-color: #B88955 !important;
          border-color: #B88955 !important;
          color: #FFFFFF !important;
          transform: translateY(-4px);
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cupFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes steamRise {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(-35px);
          }
        }

        @keyframes scrollDown {
          0%, 100% {
            opacity: 0.4;
            transform: scaleY(0.7);
            transform-origin: top;
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @media (max-width: 768px) {
          section {
            background-position: 60% center;
          }

          section > div:nth-of-type(1) {
            background: rgba(43, 30, 24, 0.78) !important;
          }
        }

        @media (max-width: 480px) {
          section {
            min-height: calc(100vh - 70px) !important;
          }
        }
      `}
      </style>
    </section>
  );
}
