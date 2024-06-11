import { FieldError } from 'react-hook-form';

interface ZodErrorsProps {
  error: FieldError | undefined;
}

export function ZodErrors({ error }: ZodErrorsProps) {
  if (!error) return null;

  const errorMessages = error.message ? [error.message] : [];

  return (
    <>
      {errorMessages.map((err: string, index: number) => (
        <div key={index} className="text-pink-500 text-xs italic mt-1 py-2">
          {err}
        </div>
      ))}
    </>
  );
}
