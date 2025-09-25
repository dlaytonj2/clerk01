import { HomeHero } from "../components/home-hero";

const highlights = [
  {
    title: "Climate-controlled suites",
    description:
      "Every suite maintains the ideal temperature and airflow for small pets, with lighting tuned to their nocturnal rhythms."
  },
  {
    title: "Certified caretakers",
    description:
      "Our team is trained in small-animal first aid and monitors each guest with hourly well-being checks."
  },
  {
    title: "Live activity feed",
    description:
      "Sign in to watch recorded highlights and receive photo updates whenever your hamster tries a new enrichment toy."
  }
];

const steps = [
  {
    label: "Create an account",
    detail: "Use Clerk-powered sign-up to securely store your contact and vet info."
  },
  {
    label: "Share care preferences",
    detail: "Tell us about favorite treats, exercise routines, and any medication reminders."
  },
  {
    label: "Drop off and relax",
    detail: "We handle the rest and send nightly summaries so you can focus on your plans."
  }
];

const testimonials = [
  {
    name: "Jordan",
    quote:
      "Peaches never wants to leave! I love getting notifications when she's exploring the adventure tubes."
  },
  {
    name: "Priya",
    quote:
      "The staff memorized Mochi's vitamin schedule and sent proof every night. The peace of mind is priceless."
  }
];

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <section className="page section">
        <h2>Why hamsters love staying with us</h2>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="page section alt">
        <h2>Booking in three quick steps</h2>
        <ol className="steps-list">
          {steps.map((step) => (
            <li key={step.label}>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="page section">
        <h2>Pet parents are obsessed</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name}>
              <p>{testimonial.quote}</p>
              <footer>&mdash; {testimonial.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  );
}
