import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';

// TODO: Design store layout
export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
