import { MOCK_CLIENTS } from "~/mock/clients";

export default function ClienteleSection() {
  return (
    <section className="section-padding bg-amber-50 border-t border-amber-100 py-20">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to partner with respected organizations.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {MOCK_CLIENTS.map((client, index) => (
            <div 
              key={client.id} 
              // 🟢 UPDATED: Reduced padding on mobile (p-2) to maximize logo space
              // Kept md:p-8 for desktop to maintain clean look
              className="group relative flex flex-col items-center justify-center p-4 md:p-8 bg-white rounded-2xl border border-amber-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-36 md:h-48"
            >
              {/* 🟢 UPDATED: Increased container height on mobile (h-28) vs desktop (md:h-20) */}
              <div className="h-28 md:h-20 w-full flex items-center justify-center mb-0 md:mb-4 px-1 md:px-4">
                <img 
                  src={client.logo} 
                  alt={`${client.name} logo`} 
                  // 🟢 UPDATED: Added scale-110 on mobile to make it pop
                  className="max-h-full max-w-full object-contain transition-all duration-300 scale-110 md:scale-100 mix-blend-multiply"
                />
              </div>

              {/* Client Name (Visible only on desktop hover) */}
              <span className="text-sm font-bold text-gray-900 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-6 hidden md:block">
                {client.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}