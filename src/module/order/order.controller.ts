/* eslint-disable no-console */
import { Request, Response, NextFunction} from 'express';
import { OrderServices } from './order.service';
import { Order } from './order.interface';
import { stripe } from '../../config/stripe';

export const OrderControllers = {
  // boiOrder: async (req: Request, res: Response, next: NextFunction) => {
  //   try  {
  //     const { email, product, quantity, totalPrice, paymentMethodId } = req.body;
  //     if(!email || !product || !quantity || !totalPrice || !paymentMethodId) {
  //       res.status(400).json({
  //         success: false,
  //         message: "Missing required fields"
  //       })
  //     }

  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: Math.round(totalPrice * 100),
  //       currency: "usd",
  //       payment_method: paymentMethodId,
  //       confirmation_method: "manual",
  //       confirm: true,
  //     });

  //     const orderPayload: Order = {
  //       id: paymentIntent.id,
  //       email,
  //       products,
  //       quantity,
  //       totalPrice,
  //       paymentStatus: "pending",
  //       paymentIntentId: paymentIntent.id,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     };

  //     const order = await OrderServices.createOrderIntoDB(orderPayload);
  //     res.status(201).json({
  //       success: true,
  //       message: "Order created successfully",
  //       data: order,
  //     });

  //   }catch (err) {
  //     next(err);
  //   }
  // },

  checkout: async (req: Request, res: Response) => {
    try {
      const payload = req.body;
      console.log(payload)
      const result = await OrderServices.CheckoutOrderIntert(payload);
      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to create Order',
      });
    }

  },

  getAllOrder: async (req: Request, res: Response) => {
    try {
      const result = await OrderServices.getAlOrdersFromDB();
  
      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve Order',
      });
    }
  },

  getSingleOrder: async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;
      const result = await OrderServices.getSingleOrderFromDB(orderId);
      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve order',
      });
    }
  },
  updateOrder: async (req: Request, res: Response): Promise<void> => {
    try {
      const  orderId  = req.params.orderId;
      const data = req.body;
  
  
      const result = await OrderServices.updateOrderFromDB(orderId, data);
  
      if (!result) {
         res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to update Order',
      });
    }
  },
  deleteOrder: async (req: Request, res: Response): Promise<void>  => {
    try {
      const { orderId } = req.params;
  
      const result = await OrderServices.deleteOrderFromDB(orderId);
  
      if (!result) {
          res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        data: result,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: 'Failed to delete Order',
      });
    }
  },
  getTotalOrderRevenue: async (req: Request, res: Response) => {
    try {
      const result = await OrderServices.getTotalPriceFromDB();
      res.status(200).json({
        success: true,
        message: 'Revenue calculated successfully',
        data: { totalRevenue: result },
      });
    } catch (err) {
      console.error('Error calculating total revenue:', err);
      res.status(500).json({
        success: false,
        message: 'Failed to calculate revenue. Please try again later.',
      });
    }
  }

};






// export const OrderControllers = {
//     // createOrder1,
//     // createOrder,
//     getAllOrder,
//     getSingleOrder,
//     updateOrder,
//     deleteOrder,
//     getTotalOrderRevenue
// };
