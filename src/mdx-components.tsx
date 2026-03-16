import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-secondary">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold text-secondary">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-secondary">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 leading-7 text-muted">{children}</p>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-primary hover:text-primary-dark underline">
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted">{children}</ol>
    ),
    ...components,
  };
}
