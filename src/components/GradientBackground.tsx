export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden huddle-cream-bg">
      <div
        className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-sunset opacity-40 blur-3xl animate-blobFloat"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute -top-16 -right-24 w-80 h-80 rounded-full bg-lavender opacity-30 blur-3xl animate-blobFloatSlow"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-sky opacity-25 blur-3xl animate-blobFloat"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-24 -left-16 w-72 h-72 rounded-full bg-mint opacity-25 blur-3xl animate-blobFloatSlow"
        style={{ animationDelay: "0.8s" }}
      />
      <div
        className="absolute -bottom-20 right-0 w-64 h-64 rounded-full bg-sun opacity-30 blur-3xl animate-blobFloat"
        style={{ animationDelay: "2.2s" }}
      />
      <div className="absolute inset-0 bg-cream/40" />
    </div>
  );
}
