export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-[340px] bg-white md:border rounded-4xl md:shadow-2xl shadow-neutral-200 space-y-5 mx-auto p-5">
        {children}
      </div>
    </div>
  );
}
