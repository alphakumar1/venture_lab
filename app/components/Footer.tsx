export default function Footer() {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 text-center border-t border-white/10">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} Venture Lab. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}