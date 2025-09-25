const faqs = [
  {
    question: "What do I need to bring for my hamster?",
    answer:
      "We provide bedding, hideouts, wheels, and chew toys. Bring any specialty treats or medication your hamster needs, plus their favorite hideaway if it helps them feel at home."
  },
  {
    question: "How late can I drop off my hamster?",
    answer:
      "Check-in runs from 3-9 PM daily. Please message us in the reservation notes if you need a later hand-off so we can accommodate."
  },
  {
    question: "Can bonded hamsters stay together?",
    answer:
      "Absolutely. Choose the Bonded Buddies suite when booking and note each hamster's preferences. We'll keep watch to ensure everyone remains friendly."
  },
  {
    question: "What security measures do you have overnight?",
    answer:
      "Our caretakers stay on-site with 24/7 monitoring, temperature alerts, and locked access to the boarding wing. Guests also receive photo updates through the members portal."
  },
  {
    question: "Can I tour the facility before booking?",
    answer:
      "Yes! Contact us to schedule a daytime tour. We love showing off our playrooms and enrichment spaces."
  }
];

export default function FAQPage() {
  return (
    <main className="page">
      <h1>Frequently asked questions</h1>
      <p>
        If you don&apos;t see your question here, reach out via reservations and our caretakers
        will respond within 24 hours.
      </p>
      <div className="faq-list">
        {faqs.map((faq) => (
          <article key={faq.question}>
            <h2>{faq.question}</h2>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
