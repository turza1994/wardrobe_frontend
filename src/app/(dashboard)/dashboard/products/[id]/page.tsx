'use client';
// TODO: Design edit product form page with RHF + Zod
// params.id must be awaited per Next.js 15+ async patterns
type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  return (
    <div>
      <h1>Edit Product: {id}</h1>
    </div>
  );
}
