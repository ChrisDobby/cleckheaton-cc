import { useCatch } from 'remix';

export const idCatchBoundary = (item: string) => () => {
  const { status, statusText } = useCatch();

  if (status === 404) {
    return <h4>The {item} was not found</h4>;
  }

  return (
    <h4>
      {status}: {statusText}
    </h4>
  );
};
