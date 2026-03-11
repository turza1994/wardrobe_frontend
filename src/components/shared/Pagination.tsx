'use client';
// TODO: Implement Pagination component
export function Pagination({ totalPages }: { totalPages: number }) {
  return <nav aria-label="Pagination">{totalPages} pages</nav>;
}
