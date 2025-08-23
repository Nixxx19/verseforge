import { Music4, Headphones, Upload, Edit, Share, Download, Copyright, CloudUpload} from "lucide-react";

const features = [
  {
    icon: Music4,
    title: "10 Free songs daily",
    description: "Turn any moment into music — from your commute to inside jokes. Express what words can't. Free forever, no subscription needed.",
    highlight: "Free daily"
  },
  {
    icon: Headphones,
    title: "Unlimited free listening",
    description: "Discover what's possible when anyone can make music. Explore millions of songs—remixes, jokes, and raw emotion. No signups, no limits.",
    highlight: "Unlimited"
  },
  {
    icon: CloudUpload,
    title: "Share it with the world",
    description: "Make music that matters to you, then share it with people who'll feel it too. From your inner circle to millions of music fans, your next track can go far.",
    highlight: "Share globally"
  },
  {
    icon: Copyright,
    title: "Create everyday. Keep it all.",
    description: "Make up to 500 songs a month, with full commercial rights on the Pro plan. Get inspired, break genre boundaries, and own what you create—no strings attached.",
    highlight: "Commercial rights"
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Everything you need to
            <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent">
              make music your way
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-glass-card backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-4 hover:border-white/20 transition-all duration-500 hover:shadow-glass-hover hover:-translate-y-2 hover:bg-glass-hover"
            >
              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-premium rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-premium">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="inline-block text-xs font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {feature.highlight}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;