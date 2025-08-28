import { useAuth } from "@/contexts/AuthContext";

const StatisticsSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-foreground mb-1">10+</div>
              <div className="text-sm">Songs Created</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-foreground mb-1">20+</div>
              <div className="text-sm">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-foreground mb-1">98%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
