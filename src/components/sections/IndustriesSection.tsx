import { 
  Stethoscope, Utensils, ShoppingBag, Car, HardHat, 
  Headphones, TrendingUp, GraduationCap, Wrench, 
  Factory, Shirt, Rocket, Building2, Store 
} from "lucide-react";

const industries = [
  { name: "Medical / Healthcare", icon: Stethoscope },
  { name: "Hotels / Restaurants", icon: Utensils },
  { name: "Retail / FMCG", icon: ShoppingBag },
  { name: "Automobile", icon: Car },
  { name: "Construction", icon: HardHat },
  { name: "BPO / Customer Services", icon: Headphones },
  { name: "Sales & Marketing", icon: TrendingUp },
  { name: "Education & Training", icon: GraduationCap },
  { name: "Engineering & Technical", icon: Wrench },
  { name: "Textile Manufacturing", icon: Factory },
  { name: "Small-scale Manufacturing", icon: Building2 },
  { name: "Textiles & Garments", icon: Shirt },
  { name: "MSME", icon: Store },
  { name: "Start-Ups", icon: Rocket },
];

export default function IndustriesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Industries We Serve
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our placement solutions office demonstrates strong industry expertise by delivering structured, compliant, and results-driven recruitment services across multiple sectors.
          </p>
        </div>

        {/* 🟢 UPDATED GRID: lg:grid-cols-4 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {industries.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="opacity-0 animate-slide-up group flex flex-col items-center justify-center p-10 rounded-2xl bg-white border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[220px]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="h-16 w-16 bg-primary/5 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground text-center group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}