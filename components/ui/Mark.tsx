/** The 11 door: two bars make the number, the right one opens. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="7" fill="currentColor" />
      <rect x="6.2" y="5.6" width="4" height="12.8" rx="2" fill="currentColor" />
      <g className="mark-door">
        <rect x="13.8" y="5.6" width="4" height="12.8" rx="2" fill="currentColor" />
        <circle cx="16.6" cy="12" r="0.62" fill="currentColor" />
      </g>
    </svg>
  );
}
