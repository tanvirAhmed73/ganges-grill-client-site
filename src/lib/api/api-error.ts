/** Extract message from axios-style API errors */
export function getApiErrorMessage(err: unknown, fallback = "Something went wrong") {
  if (err == null || typeof err !== "object") return fallback;
  const ax = err as {
    response?: { data?: { message?: string } };
    message?: string;
  };
  return ax.response?.data?.message ?? ax.message ?? fallback;
}
