"use client";

/**
 * Last-resort error boundary: catches errors thrown by the ROOT LAYOUT
 * itself (error.tsx cannot wrap the layout above it). Replaces the whole
 * document, so it must render its own <html> and <body> tags and cannot
 * rely on globals.css — styles here are inline on purpose.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#F0FDF4",
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <section
          style={{
            width: "100%",
            maxWidth: "420px",
            padding: "32px",
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            border: "1px solid #DCE9DF",
            borderRadius: "24px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: 700,
              color: "#102A24",
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#64756B",
            }}
          >
            Equiply hit an unexpected error. Please try again — if it keeps
            happening, come back in a few minutes.
          </p>

          {error?.digest ? (
            <p
              style={{
                marginTop: "12px",
                fontSize: "12px",
                color: "#94A49A",
              }}
            >
              Error ID: {error.digest}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => retry()}
            style={{
              marginTop: "24px",
              height: "44px",
              padding: "0 24px",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#166534",
              color: "#FFFFFF",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </section>
      </body>
    </html>
  );
}
