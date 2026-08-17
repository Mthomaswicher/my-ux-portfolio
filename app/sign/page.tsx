import SignFlow from "@/components/SignFlow";

export const metadata = {
  title: "Sign the guestbook",
  alternates: { canonical: "/sign/" },
};

export default function SignPage() {
  return <SignFlow />;
}
