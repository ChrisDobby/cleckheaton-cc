import { useCatch } from '@remix-run/react';

export const idCatchBoundary = (item: string) => () => {
  const { status, statusText } = useCatch();

  if (status === 404) {
    return (
      <div className="error-message-box">
        <h4>The {item} was not found</h4>
      </div>
    );
  }

  return (
    <div className="error-message-box">
      <h4>
        {status}: {statusText}
      </h4>
    </div>
  );
};
