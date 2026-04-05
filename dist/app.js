"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const blog_router_1 = __importDefault(require("./module/blog/blog.router"));
const admin_router_1 = __importDefault(require("./module/admin/admin.router"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const experience_router_1 = require("./module/experience/experience.router");
const project_routes_1 = require("./module/projects/project.routes");
const skill_routes_1 = require("./module/skills/skill.routes");
// eBook commerce modules
const ebook_routes_1 = require("./module/ebook/ebook.routes");
const identity_routes_1 = require("./module/identity/identity.routes");
const wishlist_routes_1 = require("./module/wishlist/wishlist.routes");
const checkout_routes_1 = require("./module/shop-checkout/checkout.routes");
const dashboard_routes_1 = require("./module/dashboard/dashboard.routes");
const download_routes_1 = require("./module/download/download.routes");
const fireProduct_routes_1 = require("./module/fire-product/fireProduct.routes");
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://learnsafety.pro",
    "https://www.learnsafety.pro",
    "https://portfolio-server-mocha-omega.vercel.app",
    "https://sandbox.sslcommerz.com",
    "https://securepay.sslcommerz.com",
];
const corsOptions = {
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
app.use("/api/shop-checkout/success", (0, cors_1.default)());
app.use("/api/shop-checkout/fail", (0, cors_1.default)());
app.use("/api/shop-checkout/cancel", (0, cors_1.default)());
app.use("/api/shop-checkout/ipn", (0, cors_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
// Parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/api/auth", auth_router_1.default);
app.use("/api/admin", admin_router_1.default);
app.use("/api/user", user_router_1.default);
app.use("/api/blogs", blog_router_1.default);
app.use("/api/experience", experience_router_1.experienceRoutes);
app.use("/api/project", project_routes_1.projectRoutes);
app.use("/api/skill", skill_routes_1.skillRoutes);
// eBook commerce routes
app.use("/api/ebooks", ebook_routes_1.ebookRoutes);
app.use("/api/identity", identity_routes_1.identityRoutes);
app.use("/api/wishlist", wishlist_routes_1.wishlistRoutes);
app.use("/api/shop-checkout", checkout_routes_1.shopCheckoutRoutes);
app.use("/api/dashboard", dashboard_routes_1.dashboardRoutes);
app.use("/api/download", download_routes_1.downloadRoutes);
app.use("/api/fire-products", fireProduct_routes_1.fireProductRoutes);
app.get("/", (req, res) => {
    res.send({
        status: true,
        message: "Learn Safety Server is now Live - Alhamdulillah",
    });
});
// Error handling
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
