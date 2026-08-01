export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden huddle-gradient-bg">
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-mint/50 blur-3xl animate-blobMove" />
      <div
        className="absolute top-1/3 -right-20 w-64 h-64 rounded-full bg-lavender/50 blur-3xl animate-blobMove"
        style={{ animationDelay: "-5s" }}
      />
      <div
        className="absolute bottom-24 -left-10 w-52 h-52 rounded-full bg-coral/40 blur-3xl animate-blobMove"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-peach/40 blur-3xl animate-blobMove"
        style={{ animationDelay: "-13s" }}
      />
    </div>
  );
}
