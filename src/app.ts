import express, { Request, Response } from 'express';
import userRouter from './module/user/user.router';
import authRouter from './module/auth/auth.router';
import blogRouter from './module/blog/blog.router';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import adminRouter from './module/admin/admin.router';
import notFound from './middlewares/notFound';
import { ProductRoutes } from './module/product/product.routes';
import { OrderRoutes } from './module/order/order.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CheckoutRoutes } from './module/checkout/checkout.routes';
import { experienceRoutes } from './module/experience/experience.router';

const app = express();

// CORS configuration has solved the issue
const allowedOrigins = ['http://localhost:5173','http://localhost:3000', 'http://localhost:5174', 'https://boitoi-admin.vercel.app', 'https://boitoi-marketplace.vercel.app','https://nextjs-blogs-sigma.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, 
}));

// Parsers
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/blogs', blogRouter);
// app.use('/api/products', ProductRoutes);
// app.use('/api/orders', OrderRoutes);
// app.use('/api/checkouts', CheckoutRoutes);
app.use('/api/experience', experienceRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Portfolio Server is now Live - Alhamdulillah',
  });
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;