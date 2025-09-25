import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="centered">
      <SignIn appearance={{ layout: { socialButtonsVariant: "iconButton" } }} />
    </main>
  );
}
