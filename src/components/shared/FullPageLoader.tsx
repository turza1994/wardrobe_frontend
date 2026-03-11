import { Spinner } from "./Spinner";

interface FullPageLoaderProps {
  message?: string;
}

export function FullPageLoader({ message = "Loading..." }: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <Spinner size="2xl" className="mb-4 text-primary" />
      <p className="text-lg font-medium text-foreground animate-pulse">
        {message}
      </p>
    </div>
  );
}
