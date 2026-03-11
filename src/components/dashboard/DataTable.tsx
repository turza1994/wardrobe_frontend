'use client';
// TODO: Implement DataTable (reusable table with sorting/pagination)
export function DataTable<TData>({ data }: { data: TData[] }) {
  return <div>DataTable ({data.length} rows)</div>;
}
