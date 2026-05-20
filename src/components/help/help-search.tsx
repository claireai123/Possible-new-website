"use client";

import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { HelpSearchEntry } from "@/data/help-articles";

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark key={i} className="bg-[#fff6c2] text-[#0a0a0a] px-0.5 rounded-sm">
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function scoreEntry(entry: HelpSearchEntry, terms: string[]): number {
  let score = 0;
  const title = entry.title.toLowerCase();
  const lead = entry.lead.toLowerCase();
  for (const t of terms) {
    if (!t) continue;
    if (title.includes(t)) score += 10;
    if (lead.includes(t)) score += 4;
    if (entry.keywords.some((k) => k.toLowerCase().includes(t))) score += 6;
    if (entry.haystack.includes(t)) score += 1;
  }
  return score;
}

export function HelpSearch({ index }: { index: HelpSearchEntry[] }) {
  const params = useSearchParams();
  const initialQ = params?.get("q") ?? "";
  const [q, setQ] = useState(initialQ);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync URL ?q= without a full navigation, so deep links work.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.toString());
  }, [q]);

  // Keyboard shortcut: "/" focuses the input.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        setQ("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const terms = useMemo(
    () =>
      q
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean),
    [q]
  );

  const results = useMemo(() => {
    if (terms.length === 0) return [];
    return index
      .map((e) => ({ entry: e, score: scoreEntry(e, terms) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [index, terms]);

  const showDropdown = q.trim().length > 0;

  return (
    <div className="relative max-w-[640px]">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-3 rounded-md border border-[#0a0a0a]/12 bg-white px-4 py-3 shadow-[0_1px_0_rgba(10,10,10,0.04)] focus-within:border-[#0a0a0a]/30 focus-within:shadow-[0_1px_0_rgba(10,10,10,0.06),0_4px_24px_-12px_rgba(10,10,10,0.18)] transition-shadow"
      >
        <svg className="h-4 w-4 text-[#0a0a0a]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 110-16 8 8 0 010 16z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search articles, integrations, error messages…"
          className="flex-1 bg-transparent text-[14px] text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:outline-none"
          aria-label="Search the help center"
          autoComplete="off"
          spellCheck={false}
        />
        <kbd className="hidden sm:inline-flex items-center rounded border border-[#0a0a0a]/12 bg-[#fafaf9] px-1.5 py-0.5 text-[10px] font-mono text-[#0a0a0a]/40">
          /
        </kbd>
      </form>

      {showDropdown && (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 z-30 mt-2 max-h-[480px] overflow-y-auto rounded-md border border-[#0a0a0a]/10 bg-white shadow-[0_24px_48px_-24px_rgba(10,10,10,0.25),0_1px_0_rgba(10,10,10,0.04)]"
        >
          {results.length === 0 ? (
            <div className="p-6">
              <p className="text-[14px] text-[#0a0a0a]/55">
                No articles match <span className="text-[#0a0a0a]">&ldquo;{q}&rdquo;</span>.
              </p>
              <p className="mt-2 text-[13px] text-[#0a0a0a]/40">
                Try a different keyword, or{" "}
                <Link href="/contact" className="text-[#0a0a0a] underline underline-offset-2">
                  contact support
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#0a0a0a]/[0.06]">
              {results.map(({ entry }) => (
                <li key={entry.slug}>
                  <Link
                    href={`/help/${entry.slug}`}
                    className="group flex items-start gap-4 px-5 py-4 hover:bg-[#fafaf9] transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.12em] text-[#0a0a0a]/40">
                        {entry.categoryName}
                      </p>
                      <p
                        className="mt-1 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                        style={{ fontSize: "15px", lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: 450 }}
                      >
                        {highlight(entry.title, q)}
                      </p>
                      <p className="mt-1 line-clamp-2 text-[13px] text-[#0a0a0a]/55 leading-[1.45]">
                        {highlight(entry.lead, q)}
                      </p>
                    </div>
                    <span className="mt-1 shrink-0 text-[11px] text-[#0a0a0a]/35">
                      {entry.readingTime}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
