import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Star, 
  Sunrise,
  Calendar,
  Target,
  Heart,
  ChevronRight,
  Play
} from "lucide-react";
import cosmicHero from "@/assets/cosmic-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Sun,
      title: "Morning Alignment",
      description: "Start each day with personalized cosmic guidance, energy check-ins, and mindful intention setting.",
      color: "text-yellow-400"
    },
    {
      icon: Moon,
      title: "Evening Reflection",
      description: "Close your day with gratitude, synchronicity awareness, and deep personal insights.",
      color: "text-blue-400"
    },
    {
      icon: Star,
      title: "Cosmic Insights",
      description: "Track patterns, discover your natural rhythms, and receive personalized astrological guidance.",
      color: "text-purple-400"
    },
    {
      icon: Target,
      title: "Intention Tracking",
      description: "Set and complete daily intentions aligned with your unique cosmic blueprint.",
      color: "text-green-400"
    }
  ];

  const testimonials = [
    {
      quote: "AstroFlow helped me understand my natural energy cycles. I'm more productive and at peace.",
      author: "Sarah, Manifesting Generator",
      rating: 5
    },
    {
      quote: "The morning alignment ritual has transformed how I start my day. It's like cosmic coffee!",
      author: "Marcus, Projector", 
      rating: 5
    },
    {
      quote: "Finally, an app that combines productivity with spiritual awareness. Exactly what I needed.",
      author: "Luna, Reflector",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-nebula">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${cosmicHero})` }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 space-y-8">
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
            ✨ Your Cosmic Productivity Companion
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-cosmic bg-clip-text text-transparent leading-tight">
            AstroFlow
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Align your daily rhythm with cosmic wisdom. Boost productivity through 
            personalized astrology, human design, and mindful intention setting.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              variant="cosmic" 
              size="lg" 
              className="px-8 text-lg"
              onClick={() => navigate('/morning')}
            >
              <Play className="w-5 h-5 mr-2" />
              Begin Your Journey
            </Button>
            <Button 
              variant="cosmic-outline" 
              size="lg" 
              className="px-8 text-lg"
              onClick={() => navigate('/dashboard')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Features
            </Button>
          </div>
          
          <div className="pt-8 text-sm text-muted-foreground">
            No account required to start • Free cosmic guidance
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-70" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full animate-float opacity-60" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-secondary rounded-full animate-float opacity-80" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-primary/50 rounded-full animate-float opacity-50" style={{ animationDelay: "0.5s" }} />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Your Daily Cosmic Ritual
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform ordinary days into extraordinary journeys of growth and alignment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-gradient-subtle border-muted/50 shadow-soft hover:shadow-cosmic transition-all duration-300 group">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-cosmic flex items-center justify-center group-hover:animate-pulse-glow`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Your Daily Flow
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple rituals, profound transformation
            </p>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: 1,
                icon: Sunrise,
                title: "Morning Alignment",
                description: "Check your energy, receive cosmic guidance, set intentions, and meditate with personalized scripts based on your astrological profile.",
                time: "5-10 minutes"
              },
              {
                step: 2,
                icon: Calendar,
                title: "Live Your Day",
                description: "Move through your day with clarity and purpose, guided by your cosmic insights and daily intentions.",
                time: "All day"
              },
              {
                step: 3,
                icon: Moon,
                title: "Evening Reflection",
                description: "Honor your journey with gratitude, capture synchronicities, and reflect on your growth and experiences.",
                time: "10-15 minutes"
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-cosmic rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-glow">
                      {step.step}
                    </div>
                  </div>
                  <Card className="flex-1 bg-gradient-subtle border-muted/50 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-primary" />
                            <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">
                          {step.time}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  {index < 2 && (
                    <div className="flex-shrink-0 hidden md:block">
                      <ChevronRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Transforming Lives Daily
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands finding their cosmic rhythm
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-subtle border-muted/50 shadow-soft">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-foreground italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-sm text-muted-foreground">
                    — {testimonial.author}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Ready to Align with Your Cosmic Purpose?
            </h2>
            <p className="text-xl text-muted-foreground">
              Begin your journey of mindful productivity and cosmic awareness today
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="cosmic" 
              size="lg" 
              className="px-12 text-lg"
              onClick={() => navigate('/morning')}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Morning Alignment
            </Button>
            <Button 
              variant="cosmic-outline" 
              size="lg" 
              className="px-12 text-lg"
              onClick={() => navigate('/evening')}
            >
              <Heart className="w-5 h-5 mr-2" />
              Try Evening Reflection
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
