export function Spike({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M50 2 L53 48 L50 50 L47 48 Z" />
      <path d="M98 50 L52 53 L50 50 L52 47 Z" />
      <path d="M50 98 L47 52 L50 50 L53 52 Z" />
      <path d="M2 50 L48 47 L50 50 L48 53 Z" />
    </svg>
  );
}
