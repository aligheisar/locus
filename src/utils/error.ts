type Result<S, E extends { reason: string }> = [E, null] | [null, S];

const ok = <S>(data: S): Result<S, never> => {
  return [null, data];
};

const err = <const R extends string, E extends { reason: R }>(
  error: E,
): Result<never, E> => {
  return [error, null];
};

const handleError = <R extends string>(
  reason: R,
  handlers: Record<R, () => void>,
) => {
  const handler = handlers[reason];
  handler();
};

export { err, handleError, ok };
