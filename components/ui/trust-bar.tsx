import Image from "next/image";

import { Icon } from "@/components/ui/icon";

const textItems = [
  { icon: "verified", label: "Familienbetrieb seit 1990" },
  { icon: "support_agent", label: "24h-Notdienst" },
  { icon: "location_on", label: "Persönlich auf Rügen" },
];

export function TrustBar() {
  return (
    <div className="bg-surface-container-low border-y border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap justify-center lg:justify-between gap-x-6 gap-y-4 text-sm font-semibold text-primary/80">
        {textItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <Icon name={item.icon} className="text-accent" fill />
            {item.label}
          </div>
        ))}
        <Image
          src="/brand/bosch-premium-partner.jpg"
          alt="Bosch Premium Partner"
          width={140}
          height={28}
          className="h-8 w-auto object-contain"
        />
      </div>
    </div>
  );
}
