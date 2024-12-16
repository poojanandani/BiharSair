import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';
import packageRoute from './routes/package.js';
import customTourRoute from './routes/customeTour.js';
import foodRoute from './routes/food.js';
import vechicalRoute from './routes/vechical.js';
// import hotelRoute from './routes/hotel.js';
import packageBookingRoute from './routes/packageBooking.js';

//stripe
//const stripe = require("stripe")("sk_test_51OrbEMSEd6sw44xevyckCWntQQRFhKsFAMY2uPPdv56XQJa0WUTu8OMudblAvAyZt2dP52xsulcBTIJgdI84OQ94006RReqYF9");
import stripePackage from "stripe";

const stripe = stripePackage("sk_test_51OrbEMSEd6sw44xevyckCWntQQRFhKsFAMY2uPPdv56XQJa0WUTu8OMudblAvAyZt2dP52xsulcBTIJgdI84OQ94006RReqYF9");



dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true,
}

//database connection 
mongoose.set("strictQuery",false);
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('mongodb database connection failed');
    }
}

//middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);
app.use('/api/v1/package', packageRoute);
app.use('/api/v1/food', foodRoute);
app.use('/api/v1/vechical', vechicalRoute);
// app.use('/api/v1/hotel', hotelRoute);
app.use('/api/v1/customtour', customTourRoute);
app.use('/api/v1/packagebooking',packageBookingRoute);

//checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const products = req.body.products;

    const serviceCharge = { title: 'Service Charge', price: 300 };
    products.push(serviceCharge);
    
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title,   
            },
            unit_amount:product.price*100,
        },
        quantity:1,  
    }));
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        billing_address_collection: 'required',
        success_url:"http://localhost:3000/sucess",
        cancel_url:"http://localhost:3000/cancel",
    })

    res.json({id:session.id})
})

app.listen(port, ()=>{
    connect();
    console.log('server listening on port', port);
});