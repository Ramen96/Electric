import React, { useState } from 'react';
import { X, AlertTriangle, Mail, Phone } from 'lucide-react';

export default function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative shadow-lg z-[9999]" style={{ backgroundColor: '#f97316', color: 'white' }}>
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-90" style={{ background: 'linear-gradient(to right, #ea580c, #dc2626)' }}></div>
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}></div>

      <div className="relative z-10 px-6 py-4 mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-4">
          {/* Left side - Warning icon and main message */}
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              <div
                className="rounded-full p-2 transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
              >
                <AlertTriangle className="h-4 w-4" style={{ color: 'white' }} />
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">🚧 UNDER CONSTRUCTION</span>
              </div>
              <p className="text-sm text-white opacity-90 leading-relaxed">
                Contact forms and job applications are temporarily unavailable due to server configuration.
              </p>
            </div>
          </div>

          {/* Right side - Contact info and close button */}
          <div className="flex items-start gap-4">
            <div className="text-right space-y-2">
              <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
                Please contact us directly:
              </p>
              <div className="space-y-1">
                <a
                  href="tel:+1234567890"
                  className="flex items-center justify-end gap-2 transition-colors group hover:opacity-80"
                  style={{ color: 'white' }}
                >
                  <span className="text-sm font-medium">(704) 879-4057</span>
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:emily.cncconstruction@gmail.com"
                  className="flex items-center justify-end gap-2 transition-colors group hover:opacity-80"
                  style={{ color: 'white' }}
                >
                  <span className="text-sm font-medium">emily.cncconstruction@gmail.com</span>
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="rounded-full p-2 transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
              aria-label="Close banner"
            >
              <X className="h-4 w-4" style={{ color: 'white' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5" style={{ background: 'linear-gradient(to right, #facc15, #fb923c)' }}></div>
    </div>
  );
}