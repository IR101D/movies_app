import Button from "@/components/commons/Button";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    { icon: "🎬", title: "10,000+ Movies", description: "From classics to latest releases" },
    { icon: "⭐", title: "AI Recommendations", description: "Personalized just for you" },
    { icon: "🎭", title: "All Genres", description: "Action, romance, horror & more" },
   // { icon: "📱", title: "Watch Anywhere", description: "Stream on all your devices" }
  ];

  const stats = [
    { number: "500K+", label: "Active Users" },
    { number: "50K+", label: "Movie Reviews" },
   // { number: "24/7", label: "Streaming" },
    { number: "100+", label: "Countries" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0F0B15] text-white overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="min-h-screen relative flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F0B15] via-[#1A1326] to-[#2D1B45]">
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#E2D609] rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Movie Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {["🎬", "🎥", "🌟", "📽️", "🎭", "✨"].map((emoji, i) => (
            <div
              key={i}
              className="absolute text-2xl opacity-20 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + i * 2}s`
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E2D609] bg-opacity-20 text-black px-4 py-2 rounded-full mb-8 animate-pulse">
              <span className="w-2 h-2 bg-[#E2D609] rounded-full animate-ping"></span>
              🎉 #1 Movie Discovery Platform
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight">
              Discover{" "}
              <span className="text-5xl md:text-8xl font-black mb-6 leading-tight">
                Epic
              </span>{" "}
              Stories
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-300">
              Dive into a universe of <span className="text-[#E2D609] font-semibold">10,000+ movies</span>, 
              where every click unveils a new adventure waiting to be explored.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                title="🚀 Explore Movies"
                action={() => router.push("/movies")}
             //   className="transform hover:scale-105 transition-transform duration-300 text-lg px-8 py-4"
              />
              <button
                onClick={() => router.push("/generate-movie")}
                className="border-2 border-[#E2D609] text-[#E2D609] px-8 py-4 rounded-full font-semibold hover:bg-[#E2D609] hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                🎨 Generate Movie Title
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center transform hover:scale-110 transition-transform duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-[#E2D609]">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#E2D609] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#E2D609] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0F0B15] to-[#1A1326]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              Why Choose <span className="text-[#E2D609]">CineSeek</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience movie discovery like never before with our cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-[#171D22] p-6 rounded-2xl border-2 border-transparent hover:border-[#E2D609] transition-all duration-500 transform hover:-translate-y-2 ${
                  currentFeature === index ? 'border-[#E2D609] scale-105' : ''
                }`}
                onMouseEnter={() => setCurrentFeature(index)}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#1A1326] to-[#2D1B45] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#E2D609] rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#E2D609] rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready for Your Next <span className="text-[#E2D609]">Movie</span> Adventure?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of movie lovers who discover their next favorite film with CineSeek every day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              title="🎬 Start Exploring Now"
              action={() => router.push("/movies")}
            //  className="transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4 bg-gradient-to-r from-[#E2D609] to-[#FFD700] text-black font-bold"
            />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 border-white text-white px-6 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              ⬆️ Back to Top
            </button>
          </div>

          {/* Fun Interactive Element */}
          <div className="mt-12 p-6 bg-[#171D22] bg-opacity-50 rounded-2xl border border-gray-800">
            <p className="text-lg mb-4">✨ <span className="text-[#E2D609]">Fun Fact:</span> Our users discover an average of 3 new favorite movies per week!</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[#E2D609] to-[#FFD700] h-2 rounded-full animate-pulse"
                style={{ width: '85%' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background: linear-gradient(-45deg, #E2D609, #FFD700, #E2D609);
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;