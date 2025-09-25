import Image from "next/image";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1559223607-882da4ca27db?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "Hamster peeking out of a cozy hideout"
  },
  {
    src: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "Hamster enjoying a snack in a tiny chair"
  },
  {
    src: "https://images.unsplash.com/photo-1618519764364-5dbee0eba7b7?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "Hamster running on a wheel under soft lighting"
  },
  {
    src: "https://images.unsplash.com/photo-1618841458479-1a5f33838763?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "Hamster exploring a play tunnel"
  },
  {
    src: "https://images.unsplash.com/photo-1546539782-6fc531453083?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "Hamster nibbling on fresh veggies"
  },
  {
    src: "https://images.unsplash.com/photo-1610541743643-6b38c733ef56?auto=format&fit=crop&w=600&h=600&q=80",
    alt: "Hamster curled up and sleeping"
  }
];

export default function GalleryPage() {
  return (
    <main className="page">
      <h1>Happy hamsters, every stay</h1>
      <p>
        From sunset snacks to midnight wheel sessions, our caretakers make sure every
        hamster feels right at home. Take a peek at recent guests enjoying their suites.
      </p>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <figure key={item.src} className="gallery-item">
            <Image src={item.src} alt={item.alt} width={600} height={600} />
            <figcaption>{item.alt}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
