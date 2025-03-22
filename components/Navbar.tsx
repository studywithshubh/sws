import axios from 'axios';

export const Navbar = async () => {
    const res = await axios.get("http://82.25.105.99/api/v1/auth/user/data");
    
    return (
        <div className="flex justify-center">
            <div className="w-290 cursor-pointer h-36 border-2 mt-2 border-blue-300 rounded-2xl flex flex-col md:flex-row md:justify-around items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-500">
                {JSON.stringify(res.data)}
            </div>
        </div>
    )
}