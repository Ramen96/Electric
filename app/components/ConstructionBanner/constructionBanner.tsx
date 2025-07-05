import { useState, useEffect } from "react";
import { X, AlertTriangle, Mail, Phone } from "lucide-react";

export default function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Show banner when scrolling up or at top
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsScrollVisible(true);
        } else {
          // Hide banner when scrolling down
          setIsScrollVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 shadow-lg z-[9999] transition-transform duration-300 ${
        isScrollVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ backgroundColor: "#f97316", color: "white" }}
    >
      {/* Subtle animated background */}
      <div
        className="absolute inset-0 opacity-90"
        style={{ background: "linear-gradient(to right, #ea580c, #dc2626)" }}
      ></div>
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      ></div>
      <div className="relative z-10 px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-4 mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          {/* Left side - Warning icon and main message */}
          <div className="flex items-start gap-2 sm:gap-4 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              <div
                className="rounded-full p-1.5 sm:p-2 transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
                }
              >
                <AlertTriangle
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  style={{ color: "white" }}
                />
              </div>
            </div>
            <div className="flex-1 space-y-1 sm:space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base lg:text-lg font-bold">
                  🚧 UNDER CONSTRUCTION
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white opacity-90 leading-relaxed hidden sm:block">
                Contact forms and job applications are temporarily unavailable
                due to server configuration.
              </p>
              <p className="text-xs text-white opacity-90 leading-relaxed sm:hidden">
                Contact forms and job applications are temporarily unavailable
                due to server configuration.
              </p>
            </div>
          </div>
          {/* Right side - Contact info and close button */}
          <div className="flex items-start gap-2 sm:gap-4">
            {/* Contact info - hidden on small screens, visible on md+ */}
            <div className="text-right space-y-2 hidden md:block">
              <p
                className="text-xs font-medium"
                style={{ color: "rgba(255, 255, 255, 0.75)" }}
              >
                Please contact us directly:
              </p>
              <div className="space-y-1">
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-end gap-2 transition-colors group hover:opacity-80"
                  style={{ color: "white" }}
                >
                  <span className="text-sm font-medium">(704) 879-4057</span>
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:emily.cncconstruction@gmail.com"
                  className="flex items-center justify-end gap-2 transition-colors group hover:opacity-80"
                  style={{ color: "white" }}
                >
                  <span className="text-sm font-medium">
                    emily.cncconstruction@gmail.com
                  </span>
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
            {/* Mobile contact buttons - visible on small screens only */}
            <div className="flex gap-1 md:hidden">
              <a
                href="tel:+1234567890"
                className="rounded-full p-1.5 transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
                }
                aria-label="Call us"
              >
                <Phone className="h-3 w-3" style={{ color: "white" }} />
              </a>
              <a
                href="mailto:emily.cncconstruction@gmail.com"
                className="rounded-full p-1.5 transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
                }
                aria-label="Email us"
              >
                <Mail className="h-3 w-3" style={{ color: "white" }} />
              </a>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="rounded-full p-1.5 sm:p-2 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
              }
              aria-label="Close banner"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "white" }} />
            </button>
          </div>
        </div>
      </div>
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 w-full h-0.5"
        style={{ background: "linear-gradient(to right, #facc15, #fb923c)" }}
      ></div>
    </div>
  );
}
