import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
// ─── Types ────────────────────────────────────────────────────────────────────
type Page = "home" | "generate" | "upload";

interface GenerateForm {
  customerName: string;
  max_servers: string;
  expiryDate: Dayjs | null;
}

interface UploadForm {
  root_key: string;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const PURPLE = "#7e60cd";
const PURPLE_DARK = "#6448b8";
const PURPLE_LIGHT = "#a48be0";

// ─── Shared styles ────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    minHeight: "100vh",
    background: "#ffffff",
    color: "#1a1a2e",
  },

  // ── Nav ──
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 40px",
    borderBottom: "1px solid #ede8f8",
    background: "#fff",
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    userSelect: "none" as const,
  },

  navLogoText: {
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: "-0.3px",
    color: PURPLE,
  },
  navBack: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    color: PURPLE,
    fontWeight: 600,
    fontSize: 12,
    border: "none",
    background: "none",
    padding: 0,
  },

  // ── Landing ──
  hero: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 65px)",
    padding: "60px 20px",
    textAlign: "center" as const,
    background: "radial-gradient(ellipse 80% 60% at 50% -10%, #ede8f8 0%, #fff 70%)",
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "#f0ebff",
    border: "1px solid #d4c6f5",
    borderRadius: 100,
    padding: "5px 14px",
    fontSize: 12,
    fontWeight: 600,
    color: PURPLE,
    marginBottom: 28,
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
  },
  heroTitle: {
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: 800,
    letterSpacing: "-2px",
    lineHeight: 1.1,
    marginBottom: 18,
    color: "#0f0c1e",
  },
  heroAccent: {
    color: PURPLE,
    display: "block",
  },
  heroSub: {
    fontSize: 18,
    color: "#6b6680",
    maxWidth: 480,
    lineHeight: 1.6,
    marginBottom: 52,
  },
  buttonRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },
  btnPrimary: {
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.18s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: `0 4px 20px ${PURPLE}55`,
  },
  btnSecondary: {
    background: "#fff",
    color: PURPLE,
    border: `2px solid ${PURPLE}`,
    borderRadius: 12,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.18s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  // ── Page shell ──
  pageShell: {
    minHeight: "calc(100vh - 65px)",
    background: "#f8f6ff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "60px 20px",
  },
  card: {
    background: "#fff",
    borderRadius: 20,
    padding: "44px 48px",
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 2px 40px rgba(126,96,205,0.10)",
    border: "1px solid #ede8f8",
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: "-0.8px",
    color: "#0f0c1e",
    marginBottom: 6,
  },
  cardSub: {
    fontSize: 14,
    color: "#8b85a0",
    marginBottom: 32,
    lineHeight: 1.5,
  },
  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#3d3756",
    marginBottom: 6,
    letterSpacing: "0.2px",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid #ddd8f0",
    fontSize: 14,
    color: "#1a1a2e",
    background: "#faf9ff",
    outline: "none",
    transition: "border 0.15s",
    boxSizing: "border-box" as const,
    marginBottom: 20,
  },

  textarea: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid #ddd8f0",
    fontSize: 13,
    color: "#1a1a2e",
    background: "#faf9ff",
    outline: "none",
    transition: "border 0.15s",
    boxSizing: "border-box" as const,
    marginBottom: 20,
    resize: "vertical" as const,
    minHeight: 110,
    fontFamily: "monospace",
    lineHeight: 1.5,
  },
  submitBtn: {
    width: "100%",
    background: PURPLE,
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.18s ease",
    marginTop: 4,
    boxShadow: `0 4px 18px ${PURPLE}44`,
  },

  // ── Response box ──
  responseBox: {
    marginTop: 24,
    padding: "16px 18px",
    borderRadius: 12,
    fontSize: 13,
    lineHeight: 1.6,
    fontFamily: "monospace",
    wordBreak: "break-all" as const,
  },
  successBox: {
    background: "#f0fff4",
    border: "1.5px solid #86efac",
    color: "#166534",
  },
  errorBox: {
    background: "#fff1f2",
    border: "1.5px solid #fca5a5",
    color: "#991b1b",
  },
  loadingBox: {
    background: "#f0ebff",
    border: `1.5px solid ${PURPLE_LIGHT}`,
    color: PURPLE_DARK,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  divider: {
    borderTop: "1px solid #ede8f8",
    margin: "28px 0",
  },
  tokenLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#8b85a0",
    marginBottom: 6,
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
  },
  tokenBox: {
    background: "#f8f6ff",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 11,
    fontFamily: "monospace",
    color: "#3d3756",
    wordBreak: "break-all" as const,
    lineHeight: 1.6,
    border: "1px solid #ede8f8",
  },
  copyBtn: {
    marginTop: 8,
    background: "none",
    border: `1px solid ${PURPLE}`,
    borderRadius: 8,
    padding: "6px 14px",
    fontSize: 12,
    fontWeight: 600,
    color: PURPLE,
    cursor: "pointer",
  },
  logoimg: {
    width: "70px",
    height: "auto",
    display: "block",
  },
  line: {
    borderRight: "2px solid #ccc",
    height: "25px"
  }
};

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span
      style={{
        width: 16, height: 16, border: `2px solid ${PURPLE_LIGHT}`,
        borderTop: `2px solid ${PURPLE}`, borderRadius: "50%",
        display: "inline-block",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ page, onHome }: { page: Page; onHome: () => void }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.navLogo} onClick={onHome}>
        <img src="https://platform.aiops-dev.aifalabs.com/images/Logo.44ea0da417e3439dd7a48ee10d73ffe7.svg" alt="AIFA" style={styles.logoimg} />
        <span style={styles.line} />
        <span style={styles.navLogoText}>AI OPS</span>
      </div>
      {page !== "home" && (
        <button style={styles.navBack} onClick={onHome}>
          Back to Home
        </button>
      )}
    </nav>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function Landing({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [hoverGen, setHoverGen] = useState(false);
  const [hoverUp, setHoverUp] = useState(false);

  return (
    <div style={styles.hero}>
      <div style={styles.badge}>⚡ License Management Portal</div>
      <h1 style={styles.heroTitle}>
        Manage your
        <span style={styles.heroAccent}>software licenses</span>
      </h1>
      <p style={styles.heroSub}>
        Generate new root licenses for customers or upload and activate existing
        license keys on your server — all in one place.
      </p>
      <div style={styles.buttonRow}>
        <button
          style={{
            ...styles.btnPrimary,
            ...(hoverGen ? { background: PURPLE_DARK, transform: "translateY(-2px)" } : {}),
          }}
          onMouseEnter={() => setHoverGen(true)}
          onMouseLeave={() => setHoverGen(false)}
          onClick={() => onNavigate("generate")}
        >
          ✦ Generate Licence
        </button>
        <button
          style={{
            ...styles.btnSecondary,
            ...(hoverUp ? { background: "#f5f0ff", transform: "translateY(-2px)" } : {}),
          }}
          onMouseEnter={() => setHoverUp(true)}
          onMouseLeave={() => setHoverUp(false)}
          onClick={() => onNavigate("upload")}
        >
          ↑ Upload Licence
        </button>
      </div>
    </div>
  );
}

// ─── Generate Licence Page ────────────────────────────────────────────────────
type Result = {
  token?: string;
  error?: string;
  details?: string;
};

function GeneratePage() {
  const [form, setForm] = useState<GenerateForm>({
    customerName: "",
    max_servers: "",
    expiryDate: null,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleDateChange = (value: Dayjs | null) => {
    setForm((f) => ({
      ...f,
      expiryDate: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.customerName || !form.max_servers || !form.expiryDate) {
      setResult({ error: "All fields are required." });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        "https://license-server-ix3y.onrender.com/api/generate-root-license",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: form.customerName,
            max_servers: parseInt(form.max_servers, 10),
            expiryDate: form.expiryDate.toISOString(),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setResult({
          error: data.error || "Request failed",
          details: data.details,
        });
      } else {
        setResult({ token: data.token });
      }
    } catch (err) {
      setResult({
        error: "Network error",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToken = () => {
    if (result?.token) {
      navigator.clipboard.writeText(result.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={styles.pageShell}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Generate Root Licence</h2>

        <p style={styles.cardSub}>
          Create a signed JWT licence token for a customer with seat limits and
          an expiry date.
        </p>

        <label style={styles.label}>Customer Name</label>
        <input
          style={styles.input}
          name="customerName"
          placeholder="e.g. Manohar Gajangi"
          value={form.customerName}
          onChange={handleChange}
        />

        <label style={styles.label}>Max servers</label>
        <input
          style={styles.input}
          name="max_servers"
          type="number"
          placeholder="e.g. 5"
          value={form.max_servers}
          onChange={handleChange}
          min={1}
        />

        <label style={styles.label}>Expire Date</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={form.expiryDate}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                variant: "outlined",
                sx: {
                  width: "100%",
                  marginBottom: "20px",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    background: "#faf9ff",
                    fontSize: "14px",
                    color: "#1a1a2e",
                    padding: 0,

                    "& input": {
                      padding: "11px 14px",
                    },

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ddd8f0",
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#7e60cd",
                      borderWidth: "1.5px",
                    },
                  },

                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1.5px solid #ddd8f0",
                  },
                },
              },
            }}
          />
        </LocalizationProvider>

        <button
          style={{
            ...styles.submitBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Generating…" : "✦ Generate Licence"}
        </button>

        {loading && (
          <div style={{ ...styles.responseBox, ...styles.loadingBox }}>
            Contacting server…
          </div>
        )}

        {result?.error && (
          <div style={{ ...styles.responseBox, ...styles.errorBox }}>
            <strong>Error:</strong> {result.error}
            {result.details && (
              <>
                <br />
                <span style={{ opacity: 0.75 }}>{result.details}</span>
              </>
            )}
          </div>
        )}

        {result?.token && (
          <>
            <div style={{ ...styles.responseBox, ...styles.successBox }}>
              ✓ Licence generated successfully!
            </div>

            <div style={styles.divider} />

            <div style={styles.tokenLabel}>Generated Token</div>

            <div style={styles.tokenBox}>{result.token}</div>

            <button style={styles.copyBtn} onClick={copyToken}>
              {copied ? "✓ Copied!" : "Copy Token"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Upload Licence Page ──────────────────────────────────────────────────────
function UploadPage() {
  const [form, setForm] = useState<UploadForm>({ root_key: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ message?: string; error?: string; details?: string } | null>(null);

  const handleSubmit = async () => {
    if (!form.root_key.trim()) {
      setResult({ error: "root_key is required." });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("https://license-server-ix3y.onrender.com/api/admin/upload-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ root_key: form.root_key.trim() }),
      });
      const data = await res.json();
      if (!res.ok) setResult({ error: data.error || "Request failed", details: data.details });
      else setResult({ message: data.message });
    } catch (err) {
      setResult({ error: "Network error — is the server running on localhost:3000?" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageShell}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Upload Root Licence</h2>
        <p style={styles.cardSub}>
          Paste your signed JWT root licence key below to install it on the
          server and activate servers.
        </p>

        <label style={styles.label}>Root Licence Key (JWT)</label>
        <textarea
          style={styles.textarea}
          placeholder="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9…"
          value={form.root_key}
          onChange={(e) => setForm({ root_key: e.target.value })}
        />

        <button
          style={{
            ...styles.submitBtn,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Uploading…" : "↑ Upload Licence"}
        </button>

        {loading && (
          <div style={{ ...styles.responseBox, ...styles.loadingBox }}>
            <Spinner /> Verifying licence…
          </div>
        )}

        {result?.error && (
          <div style={{ ...styles.responseBox, ...styles.errorBox }}>
            <strong>Error:</strong> {result.error}
            {result.details && <><br /><span style={{ opacity: 0.75 }}>{result.details}</span></>}
          </div>
        )}

        {result?.message && (
          <div style={{ ...styles.responseBox, ...styles.successBox }}>
            ✓ {result.message}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; }
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus, textarea:focus { border-color: #7e60cd !important; box-shadow: 0 0 0 3px rgba(126,96,205,0.12); }
      `}</style>
      <div style={styles.app}>
        <Nav page={page} onHome={() => setPage("upload")} />
        {page === "home" && <Landing onNavigate={setPage} />}
        {page === "generate" && <GeneratePage />}
        {page === "upload" && <UploadPage />}
      </div>
    </>
  );
}
