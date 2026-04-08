import { Icon } from "@/components/ui/icon";

const items = [
  { icon: "verified", label: "Familienbetrieb seit 1990" },
  { icon: "engineering", label: "Bosch Premium Partner" },
  { icon: "support_agent", label: "24h-Notdienst" },
  { icon: "location_on", label: "Persönlich auf Rügen" },
];

export function TrustBar() {
  return (
    <div className="bg-surface-container-low border-y border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap justify-between gap-6 text-sm font-semibold text-primary/80">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <Icon name={item.icon} className="text-accent" fill />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
