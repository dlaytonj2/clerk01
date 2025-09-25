import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ReservationForm } from "../../components/reservation-form";

export default function ReservationPage() {
  return (
    <main className="page reservation">
      <h1>Reserve an overnight suite</h1>
      <p>
        Boarding is available seven nights a week with dedicated caretakers on site.
        Create an account to share your hamster&apos;s preferences, manage stay details, and
        receive photo updates during their stay.
      </p>
      <SignedOut>
        <div className="reservation-card">
          <h2>Sign in to continue</h2>
          <p>Bookings are reserved for members so we can collect care details securely.</p>
          <div className="cta-row">
            <SignInButton mode="modal">Sign in</SignInButton>
            <SignUpButton mode="modal">Create account</SignUpButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <ReservationForm />
      </SignedIn>
    </main>
  );
}
