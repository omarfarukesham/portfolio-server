import { Order } from "./order.interface";
import { OrderModel } from "./order.model";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a new Order
const createOrderIntoDB = async (payload:Order) => {
  const result = await OrderModel.create(payload);
  return result;
};

// const CheckoutOrderIntert = async (payload: Order) => {
//   const result = new OrderModel(payload);
//   const stripeBuyPrices = Number(result?.totalPrice);
//   const amount = Number((stripeBuyPrices  * 100))
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount,
//     payment_method_types: ["card"],
//     currency: "usd",
//   });
//   return {paymentIntent,result};
// };
const CheckoutOrderIntert = async (payload: Order) => {
  const result = new OrderModel(payload);
  const stripeBuyPrices = Number(result?.totalPrice);
  // console.log(payload)

  // Check if totalPrice is valid
  if (isNaN(stripeBuyPrices) || stripeBuyPrices <= 0) {
    throw new Error("Invalid totalPrice value. It must be a valid number greater than zero.");
  }

  const amount = Math.round(stripeBuyPrices * 100); 

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    payment_method_types: ["card"],
    currency: "usd",
  });

  return { paymentIntent, result };

};


// Get all Orders 
const getAlOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// Get single Order following by id
const getSingleOrderFromDB = async (id: string) => {
  const result = await OrderModel.findById({_id: id}); 
  return result;
};


// Update a Order by ID
const updateOrderFromDB = async (id: string, data: Order) => {
  const result = await OrderModel.findByIdAndUpdate(id, data, {new: true})
  return result;
};

// Delete a ORDER by ID
const deleteOrderFromDB = async (id: string): Promise<Order | null> => {
  const result = await OrderModel.findOneAndDelete({ _id: id }); 
  return result;
};


const getTotalPriceFromDB = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null, 
        totalRevenue: { $sum: "$totalPrice" }, 
      },
    },
    {
      $project: {
        _id: 0, 
        totalRevenue: 1,
      },
    },
  ]);

  return result.length > 0 ? result[0].totalRevenue : 0;
};


//all service is exported from this function
export const OrderServices = {
    createOrderIntoDB,
    CheckoutOrderIntert,
    getAlOrdersFromDB,
    getSingleOrderFromDB,
    updateOrderFromDB,
    deleteOrderFromDB,
    getTotalPriceFromDB
};
