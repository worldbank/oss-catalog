import type { CSSProperties } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  style?: CSSProperties;
}

const SIBLINGS = 2;

function pageItems(page: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const items: (number | "...")[] = [1];
  if (page > SIBLINGS + 2) items.push("...");
  for (let p = Math.max(2, page - SIBLINGS); p <= Math.min(totalPages - 1, page + SIBLINGS); p++) items.push(p);
  if (page < totalPages - SIBLINGS - 1) items.push("...");
  items.push(totalPages);
  return items;
}

export default function Pagination({ page, totalPages, onChange, style }: PaginationProps) {
  if (totalPages <= 1) return null;

  const link = (target: number, label: string | number, disabled: boolean, current = false) => (
    <a
      href="#"
      aria-current={current ? "page" : undefined}
      aria-disabled={disabled || undefined}
      onClick={e => { e.preventDefault(); if (!disabled) onChange(target); }}
      style={{
        pointerEvents: disabled ? "none" : "auto",
        opacity: current ? 0.7 : disabled ? 0.5 : 1,
        fontWeight: current ? 700 : undefined,
        background: current ? "#e3eaf2" : undefined,
      }}
    >{label}</a>
  );

  return (
    <ul className="pagination" style={style}>
      <li>{link(page - 1, "Previous", page === 1)}</li>
      {pageItems(page, totalPages).map((p, idx) =>
        p === "..."
          ? <li key={`ellipsis-${idx}`}><span style={{ padding: "0.5rem 0.75rem", color: "#888", fontWeight: 600 }}>...</span></li>
          : <li key={p}>{link(p, p, p === page, p === page)}</li>
      )}
      <li>{link(page + 1, "Next", page === totalPages)}</li>
    </ul>
  );
}
