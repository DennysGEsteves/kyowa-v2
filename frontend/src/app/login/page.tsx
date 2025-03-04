import LoginView from "@/views/Login/Login.view";

export default function Contact({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return <LoginView searchParams={searchParams} />;
}
