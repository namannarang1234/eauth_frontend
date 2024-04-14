import { Link } from "react-router-dom"

export default function Index() {
    return (
        <div className="mt-10 h-2/6 w-5/6 flex flex-row text-4xl justify-evenly items-center bg-gray-800">
            <Link
                to="/login"
                className="h-full w-1/2 text-center border-2 border-gray-700 hover:bg-gray-900 hover:border-blue-900 transition-all flex items-center justify-center"
            >
                <span>Login</span>
            </Link>
            <Link
                to="/register"
                className="h-full w-1/2 text-center border-2 border-gray-700 hover:bg-gray-900 hover:border-blue-900 transition-all flex items-center justify-center"
            >
                <span>Register</span>
            </Link>
        </div>
    )
}
