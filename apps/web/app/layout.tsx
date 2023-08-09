import "tailwindcss/tailwind.css";

export const metadata = {
  title: "Lil Networking",
  description: "The app to help people form intentional networking habits ",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
