"use client";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="state-page">
      <h1>Something went wrong</h1>

      <p>
        {error.message ||
          "The application could not load this page. Please try again."}
      </p>

      <button type="button" className="primary-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
