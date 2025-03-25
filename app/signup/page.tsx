// "use client";
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     contactNumber: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post(
//         `http://localhost:3001/api/v1/auth/user/signup`,
//         formData,
//         { withCredentials: true } // Important for cookie-based auth
//       );

//       if (response.status === 201) {
//         router.push('/signin');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-mainBgColor text-white flex items-center justify-center">
//       <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
//         <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        
//         {error && <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               required
//               minLength={6}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-2 px-4 rounded font-medium ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
//           >
//             {loading ? 'Creating Account...' : 'Sign Up'}
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Already have an account?{' '}
//           <a href="/signin" className="text-blue-400 hover:underline">Sign In</a>
//         </p>
//       </div>
//     </div>
//   );
// }

export default function Signup() {
  return (
      <>
          SignUp Page, UnderContruction That was only for testing!
      </>
  )
}