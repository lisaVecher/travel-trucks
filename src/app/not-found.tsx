import Link from "next/link";

export default function NotFound() {
  return (
    <main className="state-page">
      <h1>Camper not found</h1>

      <p>The camper may have been removed or the link may be incorrect.</p>

      <Link href="/catalog" className="primary-button">
        Back to catalog
      </Link>
    </main>
  );
}
