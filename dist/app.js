"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./module/user/user.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const blog_router_1 = __importDefault(require("./module/blog/blog.router"));
const globalErrorHandler_1 = require("./middlewares/globalErrorHandler");
const admin_router_1 = __importDefault(require("./module/admin/admin.router"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const experience_router_1 = require("./module/experience/experience.router");
const project_routes_1 = require("./module/projects/project.routes");
const skill_routes_1 = require("./module/skills/skill.routes");
const app = (0, express_1.default)();
// CORS configuration has solved the issue
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5174', 'https://portfolio-frontend-flame-kappa.vercel.app', 'https://frontend-dashboard-drab.vercel.app'];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));
// Parsers
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', auth_router_1.default);
app.use('/api/admin', admin_router_1.default);
app.use('/api/user', user_router_1.default);
app.use('/api/blogs', blog_router_1.default);
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes);
// app.use('/api/checkouts', CheckoutRoutes);
app.use('/api/experience', experience_router_1.experienceRoutes);
app.use('/api/project', project_routes_1.projectRoutes);
app.use('/api/skill', skill_routes_1.skillRoutes);
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'Portfolio Server is now Live - Alhamdulillah',
    });
});
// Error handling
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
