// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Head from 'next/head';

// export default function PaymentPage() {
//     const [courseId, setCourseId] = useState('');
//     const [userId, setUserId] = useState('');
//     const [couponCode, setCouponCode] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [paymentDetails, setPaymentDetails] = useState<any>(null);
//     const router = useRouter();

//     // Check authentication status
//     // useEffect(() => {
//     //     const checkAuth = async () => {
//     //         try {
//     //             await axios.get(
//     //                 `http://localhost:3001/api/v1/auth/user/me`,
//     //                 { withCredentials: true }
//     //             );
//     //         } catch (err) {
//     //             router.push('/signin');
//     //         }
//     //     };
//     //     checkAuth();
//     // }, [router]);

//     const getUserData = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:3001/api/v1/auth/user/me`,
//                 { withCredentials: true }
//             );

//             console.log(response.data);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     useEffect(() => {
//         getUserData();
//     }, []);

    

//     const initiatePayment = async () => {
//         try {
//             setLoading(true);
//             setError('');
//             setSuccess(false);

//             // Step 1: Initiate payment with backend
//             const response = await axios.post(
//                 `http://localhost:3001/api/v1/sws/payment/initiate`,
//                 {
//                     courseId: parseInt(courseId),
//                     userId: userId,
//                     couponCode: couponCode || undefined
//                 },
//                 { withCredentials: true }
//             );

//             const { order, paymentId } = response.data;

//             // Step 2: Load Razorpay script dynamically
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.async = true;

//             script.onload = () => {
//                 const options = {
//                     key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                     amount: order.amount,
//                     currency: order.currency,
//                     name: 'Course Purchase',
//                     description: `Payment for Course ID: ${courseId}`,
//                     order_id: order.id,
//                     handler: async function (response: any) {
//                         try {
//                             // Step 3: Verify payment with backend
//                             const verificationResponse = await axios.post(
//                                 `http://localhost:3001/api/v1/sws/payment/verify/${paymentId}`, 
//                                 {
//                                     razorpay_payment_id: response.razorpay_payment_id,
//                                     razorpay_order_id: response.razorpay_order_id,
//                                     razorpay_signature: response.razorpay_signature
//                                 },
//                                 { withCredentials: true }
//                             );

//                             setSuccess(true);
//                             setPaymentDetails(verificationResponse.data.payment);
//                         } catch (err: any) {
//                             setError('Payment verification failed: ' + (err.response?.data?.message || 'Unknown error'));
//                         }
//                     },
//                     prefill: {
//                         name: 'Student Name', // You can fetch this from user data
//                         email: 'student@example.com', // You can fetch this from user data
//                         contact: '9999999999' // You can fetch this from user data
//                     },
//                     theme: {
//                         color: '#3399cc'
//                     },
//                     modal: {
//                         ondismiss: function () {
//                             setError('Payment was cancelled by user');
//                         }
//                     }
//                 };

//                 const rzp = new (window as any).Razorpay(options);
//                 rzp.open();
//             };

//             document.body.appendChild(script);

//         } catch (err: any) {
//             setError(err.response?.data?.message || 'Payment initiation failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-mainBgColor text-white p-4">
//             <Head>
//                 <title>Course Payment</title>
//             </Head>

//             <h1>
//             CHECK THE LOGS AND CHECK WHETHER LOGGED IN OR NOT
//             </h1>
//             <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-bold mb-6 text-center">Course Payment</h1>

//                 {error && (
//                     <div className="mb-4 p-2 bg-red-500 text-white rounded">
//                         {error}
//                     </div>
//                 )}

//                 {success && paymentDetails && (
//                     <div className="mb-4 p-2 bg-green-500 text-white rounded">
//                         <p>Payment successful!</p>
//                         <p className="text-sm mt-1">Amount: ₹{paymentDetails.amount}</p>
//                         <p className="text-sm">Payment ID: {paymentDetails.id}</p>
//                     </div>
//                 )}

//                 <div className="mb-4">
//                     <label className="block mb-1">Course ID</label>
//                     <input
//                         type="text"
//                         value={courseId}
//                         onChange={(e) => setCourseId(e.target.value)}
//                         className="w-full p-2 rounded bg-gray-700 text-white"
//                         placeholder="Enter Course ID"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block mb-1">User ID</label>
//                     <input
//                         type="text"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         className="w-full p-2 rounded bg-gray-700 text-white"
//                         placeholder="Enter Course ID"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block mb-1">Coupon Code (Optional)</label>
//                     <input
//                         type="text"
//                         value={couponCode}
//                         onChange={(e) => setCouponCode(e.target.value)}
//                         className="w-full p-2 rounded bg-gray-700 text-white"
//                         placeholder="Enter Coupon Code"
//                     />
//                 </div>

//                 <button
//                     onClick={initiatePayment}
//                     disabled={loading || !courseId}
//                     className={`w-full py-2 px-4 rounded font-medium ${loading || !courseId
//                             ? 'bg-gray-600 cursor-not-allowed'
//                             : 'bg-blue-600 hover:bg-blue-700'
//                         }`}
//                 >
//                     {loading ? 'Processing...' : 'Pay Now'}
//                 </button>
//             </div>
//         </div>
//     );
// }

export default function PaymentPage() {
    return (
        <>
            Payment Page, UnderContruction That was only for testing!
        </>
    )
}