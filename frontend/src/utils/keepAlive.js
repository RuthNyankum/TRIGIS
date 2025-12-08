const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const startKeepAlive = () => {
  // Ping backend every 10 minutes (600000 ms)
  setInterval(async () => {
    try {
      await fetch(`${BACKEND_URL}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Backend pinged successfully");
    } catch (error) {
      console.log("⚠️ Backend ping failed:", error.message);
    }
  }, 600000); // 10 minutes

  // Initial ping on app load
  fetch(`${BACKEND_URL}/health`)
    .then(() => console.log("✅ Initial backend ping successful"))
    .catch((err) =>
      console.log("⚠️ Initial backend ping failed:", err.message)
    );
};
