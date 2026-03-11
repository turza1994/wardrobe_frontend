// TODO: Design product detail page
// params.slug must be awaited per Next.js 15+ async patterns
type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1>Product: {id}</h1>
    </div>
  );
}
