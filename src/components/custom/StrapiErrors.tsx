interface ErrorData {
  message: string; // Error message
  code?: number; // Optional error code
  details?: any; // Additional details about the error (can be any type)
}

interface StrapiErrorsProps {
  error: ErrorData | null;
  message: string | null;
  name: string;
  status: string | null;
}

export function StrapiErrors({ error }: { readonly error: StrapiErrorsProps }) {
  if (!error?.message) return null;
  return <div className="text-pink-500 text-md italic py-2">{error.message}</div>;
}