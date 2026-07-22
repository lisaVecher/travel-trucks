import styles from "./Loader.module.css";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = "Loading tracks..." }: LoaderProps) {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />

      <strong>{message}</strong>

      <p>Please wait while we fetch the best travel trucks for you</p>
    </div>
  );
}
