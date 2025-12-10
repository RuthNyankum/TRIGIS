// import rateLimit from "express-rate-limit";

// /**
//  * Rate limiter for contact form submissions
//  * Prevents spam and abuse
//  */
// export const rateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 3, // Limit each IP to 3 requests per windowMs
//   message: {
//     success: false,
//     message:
//       "Too many contact form submissions from this IP. Please try again after 15 minutes.",
//   },
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   handler: (req, res) => {
//     res.status(429).json({
//       success: false,
//       message:
//         "Too many requests. Please try again after 15 minutes or contact us directly at hello@trigisconsult.com",
//     });
//   },
// });

// /**
//  * General API rate limiter
//  */
// export const generalRateLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per windowMs
//   standardHeaders: true,
//   legacyHeaders: false,
// });

import rateLimit from "express-rate-limit";

/**
 * Rate limiter for contact form submissions
 * Prevents spam and abuse
 */
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    success: false,
    message:
      "Too many contact form submissions from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message:
        "Too many requests. Please try again after 15 minutes or contact us directly at hello@trigisconsult.com",
    });
  },
});

/**
 * General API rate limiter
 * ✅ FIXED: Increased limit and skip health checks
 */
export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // ✅ Increased from 100 to 1000 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  // ✅ Skip rate limiting for health checks (keepAlive pings)
  skip: (req) => req.path === "/api/health",
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});
