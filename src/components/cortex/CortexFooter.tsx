import { Link } from "react-router-dom";

const CortexFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — wordmark */}
          <div>
            <p className="text-[15px] font-bold tracking-[0.3em] text-[#f5f3ef]">
              NIAS
            </p>
            <p className="text-[14px] text-[#78716c] mt-0.5" style={{ fontFamily: "serif" }}>
              نِياس
            </p>
          </div>

          {/* Centre — nav links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "About", to: "/people" },
              { label: "Access", href: "https://access.nias.io/" },
              { label: "Investors", href: "https://access.nias.io/investors" },
              { label: "Real Estate", to: "/real-estate" },
              { label: "Cortex", href: "https://access.nias.io/cortex" },
            ].map((link) =>
              link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-[12px] text-[#5a5a5a] hover:text-[#c9a84c] transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] text-[#5a5a5a] hover:text-[#c9a84c] transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right — copyright */}
          <div className="text-right">
            <p className="text-[11px] text-[#3a3a3a]">
              © {new Date().getFullYear()} NIAS Network. All rights reserved.
            </p>
            <p className="text-[11px] font-mono text-[#3a3a3a] mt-0.5">nias.io</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CortexFooter;
