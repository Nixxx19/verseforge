import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'
  const [timerKey, setTimerKey] = useState(0); // Key to reset timer
  
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Grammy-nominated Producer",
      company: "Universal Music",
      avatar: "/src/assets/1REVIEW.jpg.jpg",
      content: "Suno Pro has revolutionized my workflow. The AI understands musical nuance in ways I never thought possible. It's like having a genius collaborator 24/7.",
      rating: 5,
      verified: true
    },
    {
      name: "Marcus Rodriguez",
      role: "Film Composer",
      company: "Netflix",
      avatar: "/src/assets/2REVIEW.jpg.jpg",
      content: "From concept to final mix, Suno Pro delivers professional-grade results. I've used it for three major film scores this year.",
      rating: 5,
      verified: true
    },
    {
      name: "Luna Park",
      role: "Independent Artist",
      company: "Spotify Top 1%",
      avatar: "/src/assets/3REVIEW.jpg.jpg",
      content: "As an indie artist, Suno Pro levels the playing field. My latest album, created entirely with AI assistance, hit #1 on indie charts.",
      rating: 5,
      verified: true
    },
    {
      name: "Dr. James Wilson",
      role: "Music Technology Professor",
      company: "Berkeley College of Music",
      avatar: "/src/assets/4REVIEW.jpg.jpg",
      content: "The technical precision and creative possibilities are astounding. I'm integrating Suno Pro into our curriculum.",
      rating: 5,
      verified: true
    },
    {
      name: "Emma Thompson",
      role: "Music Director",
      company: "Broadway Productions",
      avatar: "/src/assets/5REVIEW.jpg.jpg",
      content: "For rapid prototyping and creative exploration, nothing comes close. It's become essential for our pre-production process.",
      rating: 5,
      verified: true
    },
    {
      name: "Alex Kim",
      role: "Electronic Music Producer",
      company: "Beatport Top 10",
      avatar: "/src/assets/6REVIEW.jpg.jpg",
      content: "The electronic music generation capabilities are insane. It understands every subgenre and creates authentic-sounding tracks.",
      rating: 5,
      verified: true
    },
    {
      name: "eee Chen",
      role: "Grammy-e Producer",
      company: "Universal Music",
      avatar: "/src/assets/7REVIEW.jpg.jpg",
      content: "Suno Pro has revolutionized my workflow. The AI understands musical nuance in ways I never thought possible. It's like having a genius collaborator 24/7.",
      rating: 5,
      verified: true
    },
    {
      name: "ee e",
      role: "Grammy-nominated Producer",
      company: "e Music",
      avatar: "/src/assets/8REVIEW.jpg.jpg",
      content: "Suno Pro has revolutionized my workflow. The AI understands musical nuance in ways I never thought possible. It's like having a genius collaborator 24/7.",
      rating: 5,
      verified: true
    },
    {
      name: "Seehen",
      role: "Grammy-nee Producer",
      company: "Universal Music",
      avatar: "/src/assets/9REVIEW.jpg.jpg",
      content: "Suno Pro has revolutionized my workflow. The AI understands musical nuance in ways I never thought possible. It's like having a genius collaborator 24/7.",
      rating: 5,
      verified: true
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection('right');
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length, timerKey]);

  // Get current 3 testimonials
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  };

  // Handle navigation with direction and timer reset
  const handleSlideChange = (direction: 'left' | 'right') => {
    setSlideDirection(direction);
    if (direction === 'right') {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 3));
    } else {
      setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 3)) % Math.ceil(testimonials.length / 3));
    }
    
    // Reset the auto-slide timer
    setTimerKey(prev => prev + 1);
  };

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
            What Users
            <br />
            <span className="bg-gradient-warm bg-clip-text text-transparent relative isolate bg-background">
              Are Saying
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Join thousands of musicians, producers, and creators who trust Suno Pro for their musical journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleSlideChange('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-500 ease-out group"
          >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleSlideChange('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-500 ease-out group"
          >
            <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {getCurrentTestimonials().map((testimonial, index) => (
            <Card 
              key={`${currentSlide}-${index}`}
              className={`group transition-all duration-1000 ease-out hover:scale-105 hover:shadow-glass-hover hover:bg-glass-hover animate-in fade-in-0 ${
                slideDirection === 'left' ? 'slide-in-from-right-8' : 'slide-in-from-left-8'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
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

        {/* Slide indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(Math.ceil(testimonials.length / 3))].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
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