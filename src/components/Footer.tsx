const Footer = () => {
  const brands = [
    "RollingStone",
    "VARIETY", 
    "WIRED",
    "billboard",
    "COMPLEX",
    "Forbes"
  ];

  return (
    <footer className="py-16 bg-background border-t border-white/10">
      <div className="container mx-auto px-4">
        {/* Brand logos */}
        <div className="flex items-center justify-center gap-12 mb-12 opacity-60">
          {brands.map((brand, index) => (
            <div key={index} className="text-muted-foreground font-bold text-lg">
              {brand}
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Suno, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;