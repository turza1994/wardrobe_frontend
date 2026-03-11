// TODO: Implement StatCard (analytics stat card)
interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
      {description && <p>{description}</p>}
    </div>
  );
}
