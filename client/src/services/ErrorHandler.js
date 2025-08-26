function ErrorHandler(err, fallback = "Something Went Wrong") {
  console.error(err);

  if (
    err.response?.data?.message &&
    typeof err.response.data.message === "string"
  ) {
    return err.response.data.message;
  }
  if (err?.message && typeof err.message === "string") {
    return err.message;
  }
  return fallback;
}
export default ErrorHandler;
