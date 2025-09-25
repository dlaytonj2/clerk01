const tiers = [
  {
    name: "Standard Burrow",
    price: "$35",
    features: [
      "Private suite with pine-free bedding",
      "Twice-daily wellness checks",
      "Evening cardio wheel session",
      "Daily photo update"
    ]
  },
  {
    name: "Luxury Loft",
    price: "$48",
    features: [
      "Extra-large suite with climbing maze",
      "Organic produce tasting menu",
      "Nightly cuddle & brushing",
      "Live-stream access"
    ]
  },
  {
    name: "Bonded Buddies",
    price: "$62",
    features: [
      "Shared habitat for up to two hamsters",
      "Custom enrichment rotation",
      "Temperature-controlled comfort",
      "Morning postcard with highlights"
    ]
  }
];

export default function PricingPage() {
  return (
    <main className="page">
      <h1>Transparent nightly pricing</h1>
      <p>
        Every stay includes fresh bedding, filtered water, and a dedicated caretaker. Pick
        the suite that matches your hamster&apos;s personality. Upgrade or cancel up to 12
        hours before check-in.
      </p>
      <div className="pricing-grid">
        {tiers.map((tier) => (
          <article key={tier.name} className="pricing-card">
            <h2>{tier.name}</h2>
            <p className="price">{tier.price} / night</p>
            <ul>
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
