"use client"; 

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 200px)',
      textAlign: 'center',
      padding: '1rem',
      fontFamily: 'sans-serif',
      color: 'hsl(var(--foreground))'
    }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'hsl(var(--destructive))' }}>
        An Error Occurred
      </h1>
      <p style={{ marginTop: '1rem', marginBottom: '2rem', color: 'hsl(var(--muted-foreground))' }}>
        Something went wrong while trying to render this page.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: 'hsl(var(--primary))',
          color: 'hsl(var(--primary-foreground))',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500'
        }}
      >
        Try again
      </button>
    </div>
  );
}
