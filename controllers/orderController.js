const Order = require('../models/order');

const addNewOrder = async (req, res) => {
    try {
      
        const order = req.body; // Directly use the entire order object
        
        // Extract the user ID from the request (assuming it comes from JWT middleware)
        const userId = req.user.id;

        // Create a new order instance
        const newOrder = new Order({
            user: userId,  // Use 'user' instead of 'id' for storing user reference in the order
            items: order.items,  // Directly map 'items' from the order object
            totalAmount: order.totalAmount,  // Assuming totalAmount is part of the order data
            shippingAddress: order.shippingAddress,  // Assuming shippingAddress is part of the order data
            paymentMethod: order.paymentMethod,  // Assuming paymentMethod is part of the order data
        });

        // Save the new order
        await newOrder.save();

        res.status(201).json({ msg: 'Order placed successfully', order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllOrders = async(req,res)=>{
    try{
        console.log('hit');
        const userId =  '6773d010ab3705325ed9e5d1';
        const orders = await Order.find({'user':userId}).populate('user items.product');
        console.log('orders yours');
        console.log(orders);
        res.status(200).json({'Orders':orders});


    }catch(e){
        console.log(e.message);

    }
}
module.exports = {
    addNewOrder,
    getAllOrders
}