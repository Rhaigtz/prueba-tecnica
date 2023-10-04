export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto h-screen">{children}</div>;
}
