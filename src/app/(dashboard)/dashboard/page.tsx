import { StatCard } from '@/components/dashboard/StatCard';

// TODO: Design dashboard overview page with stats
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <StatCard title="Total Orders" value={0} />
        <StatCard title="Revenue" value="৳0" />
        <StatCard title="Products" value={0} />
        <StatCard title="Customers" value={0} />
      </div>
    </div>
  );
}
