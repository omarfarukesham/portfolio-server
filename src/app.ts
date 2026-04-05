import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";

import userRouter from "./module/user/user.router";
import authRouter from "./module/auth/auth.router";
import blogRouter from "./module/blog/blog.router";
import adminRouter from "./module/admin/admin.router";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { experienceRoutes } from "./module/experience/experience.router";
import { projectRoutes } from "./module/projects/project.routes";
import { skillRoutes } from "./module/skills/skill.routes";

// eBook commerce modules
import { ebookRoutes } from "./module/ebook/ebook.routes";
import { identityRoutes } from "./module/identity/identity.routes";
import { wishlistRoutes } from "./module/wishlist/wishlist.routes";
import { shopCheckoutRoutes } from "./module/shop-checkout/checkout.routes";
import { dashboardRoutes } from "./module/dashboard/dashboard.routes";
import { downloadRoutes } from "./module/download/download.routes";
import { fireProductRoutes } from "./module/fire-product/fireProduct.routes";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://learnsafety.pro",
  "https://www.learnsafety.pro",
  "https://portfolio-server-mocha-omega.vercel.app",
  "https://sandbox.sslcommerz.com",
  "https://securepay.sslcommerz.com",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // allow server-to-server, postman, curl, mobile apps, same-origin requests
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  exposedHeaders: ["set-cookie"],
  optionsSuccessStatus: 204,
};

// Allow SSLCOMMERZ payment gateway callbacks without CORS restriction
app.use("/api/shop-checkout/success", cors());
app.use("/api/shop-checkout/fail", cors());
app.use("/api/shop-checkout/cancel", cors());
app.use("/api/shop-checkout/ipn", cors());

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Parsers
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/experience", experienceRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/skill", skillRoutes);

// eBook commerce routes
app.use("/api/ebooks", ebookRoutes);
app.use("/api/identity", identityRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/shop-checkout", shopCheckoutRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/download", downloadRoutes);
app.use("/api/fire-products", fireProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    status: true,
    message: "Learn Safety Server is now Live - Alhamdulillah",
  });
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
