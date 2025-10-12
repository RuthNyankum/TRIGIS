import { Outlet, Link } from "react-router";

const AuthLayout = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* ===== Left Section (Illustration) ===== */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-purple-600 to-yellow-500 items-center justify-center p-6 relative">
          <div className="text-center space-y-4 z-10">
            <img
              src="https://gallery.manypixels.co/illustrations/flat-500/education.svg"
              alt="Learning Illustration"
              className="w-full max-w-xs mx-auto drop-shadow-2xl"
            />
            <div className="text-white space-y-2">
              {/* <h2 className="text-xl font-bold">Start Your Journey</h2>
              <p className="text-xs opacity-90 leading-relaxed px-4">
                Learn, grow, and achieve your dreams with us
              </p> */}
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* ===== Right Section (Form Area) ===== */}
        <div className="flex-1 md:w-7/12 relative">
          {/* ===== Back to Home Link ===== */}
          <Link
            to="/"
            className="absolute top-4 right-4 text-purple-600 font-medium hover:text-purple-800 transition-colors text-sm flex items-center gap-1 z-20"
          >
            <span>←</span> Back to Home
          </Link>

          <Outlet />

          {/* ===== Footer text ===== */}
          <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 text-center whitespace-nowrap">
            © {new Date().getFullYear()} EduTrack. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
