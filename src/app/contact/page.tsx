"use client";

import { useState, useEffect, useRef } from "react";

const CAL_LINK = "tiago-strammiello-d57dr3/claireai-consultation";
const CAL_NS = "claireai-consultation";
const FORMSPREE_URL = "https://formspree.io/f/mpqolvpw";

export default function BookDemo() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    firmName: "",
    firmSize: "",
    practiceArea: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const calLoaded = useRef(false);

  useEffect(() => {
    if (calLoaded.current) return;
    calLoaded.current = true;

    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          (api as any).q = (api as any).q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    Cal("init", CAL_NS, { origin: "https://app.cal.com" });
    Cal.ns[CAL_NS]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          firmName: form.firmName,
          firmSize: form.firmSize,
          practiceArea: form.practiceArea,
        }),
      });
    } catch {
      // Still open Cal even if Formspree fails
    }

    setSubmitting(false);

    const Cal = (window as any).Cal;
    if (Cal?.ns?.[CAL_NS]) {
      Cal.ns[CAL_NS]("modal", {
        calLink: CAL_LINK,
        config: {
          layout: "month_view",
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          notes: `Firm: ${form.firmName}\nSize: ${form.firmSize}\nPractice Area: ${form.practiceArea}`,
        },
      });
    }
  };

  const inputBox: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    fontSize: 15,
    fontFamily: "inherit",
    border: "1px solid #d1d1d6",
    borderRadius: 4,
    outline: "none",
    backgroundColor: "#fff",
    color: "#0a0a0a",
  };

  const selectBox: React.CSSProperties = {
    ...inputBox,
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 14px center",
  };

  const label: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#0a0a0a",
    marginBottom: 8,
  };

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "52fr 48fr",
        minHeight: "100vh",
      }}
    >
      {/* ── LEFT: Green textured panel with white form card ── */}
      <div
        style={{
          backgroundColor: "#1b4332",
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.03) 0px,
              rgba(255,255,255,0.03) 1px,
              transparent 1px,
              transparent 4px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.02) 0px,
              rgba(255,255,255,0.02) 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          padding: "120px 48px 60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: "44px 44px 48px",
            width: "100%",
            maxWidth: 520,
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* First / Last Name */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={label}>First Name *</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  style={inputBox}
                />
              </div>
              <div>
                <label style={label}>Last Name *</label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  style={inputBox}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginTop: 24 }}>
              <label style={label}>Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                style={inputBox}
              />
            </div>

            {/* Firm Name */}
            <div style={{ marginTop: 24 }}>
              <label style={label}>Firm Name *</label>
              <input
                type="text"
                required
                value={form.firmName}
                onChange={(e) => update("firmName", e.target.value)}
                style={inputBox}
              />
            </div>

            {/* Firm Size */}
            <div style={{ marginTop: 24 }}>
              <label style={label}>Firm Size *</label>
              <select
                required
                value={form.firmSize}
                onChange={(e) => update("firmSize", e.target.value)}
                style={selectBox}
              >
                <option value=""></option>
                <option value="Solo Practitioner">Solo Practitioner</option>
                <option value="2-5 Attorneys">2-5 Attorneys</option>
                <option value="6-20 Attorneys">6-20 Attorneys</option>
                <option value="21-50 Attorneys">21-50 Attorneys</option>
                <option value="50+ Attorneys">50+ Attorneys</option>
              </select>
            </div>

            {/* Practice Area */}
            <div style={{ marginTop: 24 }}>
              <label style={label}>Practice Area *</label>
              <select
                required
                value={form.practiceArea}
                onChange={(e) => update("practiceArea", e.target.value)}
                style={selectBox}
              >
                <option value=""></option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Criminal Defense">Criminal Defense</option>
                <option value="Family Law">Family Law</option>
                <option value="Immigration">Immigration</option>
                <option value="Estate Planning">Estate Planning</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Privacy */}
            <p style={{ marginTop: 28, fontSize: 13, lineHeight: 1.6, color: "rgba(10,10,10,0.45)" }}>
              ClaireAI will use your information to provide the content or service you requested.
            </p>
            <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "rgba(10,10,10,0.45)" }}>
              We may use your information to send you marketing emails. You can unsubscribe at any time using
              the link in our emails. Learn more in our{" "}
              <a href="/privacy-policy" style={{ color: "#2563eb", textDecoration: "none" }}>
                Privacy Policy
              </a>
              .
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 24,
                padding: "15px 44px",
                backgroundColor: "#0a0a0a",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "inherit",
                border: "none",
                borderRadius: 4,
                cursor: submitting ? "wait" : "pointer",
                opacity: submitting ? 0.6 : 1,
              }}
            >
              {submitting ? "Sending..." : "Book a Demo"}
            </button>
          </form>
        </div>
      </div>

      {/* ── RIGHT: White panel with centered copy ── */}
      <div
        style={{
          backgroundColor: "#fefefc",
          padding: "0 64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(3rem, 5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#0a0a0a",
            }}
          >
            Book a demo
          </h1>
          <p
            style={{
              marginTop: 20,
              fontSize: 19,
              lineHeight: 1.5,
              color: "rgba(10,10,10,0.35)",
              fontWeight: 400,
            }}
          >
            Take a demo with Claire to see how you can stop losing $1,200 every time the phone rings after hours.
          </p>

          {/* Stats row */}
          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 24,
              textAlign: "center",
            }}
          >
            {[
              { stat: "$0", label: "Missed revenue" },
              { stat: "24/7", label: "Availability" },
              { stat: "50+", label: "Firms trust us" },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontSize: 28, fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.02em" }}>
                  {item.stat}
                </p>
                <p style={{ marginTop: 4, fontSize: 11, color: "rgba(10,10,10,0.25)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
