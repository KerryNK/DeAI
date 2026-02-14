import { useAuth } from '../lib/authContext';
import { Link } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    // If user is authenticated, render the protected content
    if (user) {
        return children;
    }

    // Otherwise, show authentication required UI
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Authentication Card */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center backdrop-blur-sm">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Authentication Required
                    </h2>
                    <p className="text-sm text-gray-400 uppercase tracking-wide mb-6">
                        SIGN IN TO CONTINUE
                    </p>

                    {/* Description */}
                    <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                        Sign in to your account to access the dashboard and manage your investments.
                    </p>

                    {/* Status Indicators */}
                    <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-500 text-xs mb-1">STATUS</p>
                            <p className="text-gray-300 font-medium flex items-center justify-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Not Signed In
                            </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-500 text-xs mb-1">ACCESS</p>
                            <p className="text-gray-300 font-medium">Limited</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link
                            to="/login"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            Sign In
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        <Link
                            to="/signup"
                            className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            Create Account
                        </Link>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-xs text-gray-500">
                        New to DeAI? Create an account to get started
                    </p>
                </div>
            </div>
        </div>
    );
}
