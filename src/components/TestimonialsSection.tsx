import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Grammy-nominated Producer",
      company: "Universal Music",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      content: "Suno Pro has revolutionized my workflow. The AI understands musical nuance in ways I never thought possible. It's like having a genius collaborator 24/7.",
      rating: 5,
      verified: true
    },
    {
      name: "Marcus Rodriguez",
      role: "Film Composer",
      company: "Netflix",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content: "From concept to final mix, Suno Pro delivers professional-grade results. I've used it for three major film scores this year.",
      rating: 5,
      verified: true
    },
    {
      name: "Luna Park",
      role: "Independent Artist",
      company: "Spotify Top 1%",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content: "As an indie artist, Suno Pro levels the playing field. My latest album, created entirely with AI assistance, hit #1 on indie charts.",
      rating: 5,
      verified: true
    },
    {
      name: "Dr. James Wilson",
      role: "Music Technology Professor",
      company: "Berkeley College of Music",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content: "The technical precision and creative possibilities are astounding. I'm integrating Suno Pro into our curriculum.",
      rating: 5,
      verified: true
    },
    {
      name: "Emma Thompson",
      role: "Music Director",
      company: "Broadway Productions",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      content: "For rapid prototyping and creative exploration, nothing comes close. It's become essential for our pre-production process.",
      rating: 5,
      verified: true
    },
    {
      name: "Alex Kim",
      role: "Electronic Music Producer",
      company: "Beatport Top 10",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
      content: "The electronic music generation capabilities are insane. It understands every subgenre and creates authentic-sounding tracks.",
      rating: 5,
      verified: true
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge className="bg-gradient-premium text-white border-0 px-6 py-2 mb-6 text-sm font-medium">
            Trusted by Professionals
          </Badge>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
            What Creators
            <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent relative isolate bg-background">
              Are Saying
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Join thousands of musicians, producers, and creators who trust Suno Pro for their musical journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group transition-all duration-500 hover:scale-105 hover:shadow-glass-hover hover:bg-glass-hover"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-foreground leading-relaxed text-lg">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-premium text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-primary text-sm font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-foreground mb-1">10M+</div>
              <div className="text-sm">Songs Created</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-foreground mb-1">50K+</div>
              <div className="text-sm">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-foreground mb-1">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;