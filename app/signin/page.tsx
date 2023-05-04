import AuthButton from "@/components/auth-button";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-r from-blue-500 via-blue-900 to-blue-500 bg-clip-text animate-gradient text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Lil Networking
      </h1>
      <AuthButton />
    </main>
  );
}
