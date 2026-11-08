// Small inline icons used across the site.
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export function BagIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 0 1 6 0" /></svg>;
}

export function MenuIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function CheckIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>;
}

export function PinIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>;
}

export function PhoneIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>;
}

export function FactoryIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M3 21V9l6 4V9l6 4V5l6 4v12Z" /></svg>;
}

export function TruckIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>;
}

export function LockIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><rect x="3" y="10" width="18" height="11" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" /></svg>;
}

export function DiscountIcon() {
  return <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true"><path d="M4 20 20 4M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /></svg>;
}
