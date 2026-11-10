/** Builds the mailto link for the contact form. Every user-typed value is URL-encoded. */
export function buildMailto(email: string, name: string, from: string, message: string): string {
  const subject = `Portfolio contact from ${name}`;
  const body = `${message}\n\nFrom: ${name} (${from})`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
