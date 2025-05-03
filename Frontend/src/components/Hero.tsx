const Hero = () => {
  return (
    <div className="relative pt-32 pb-12 md:pb-24 lg:pb-24 px-4 overflow-y-hidden">
      {/* Animated background elements */}
      <div className="floating-circles">
        <div className="floating-circle bg-openup-teal animate-wave-motion" style={{ width: '300px', height: '300px', top: '10%', left: '5%', animationDelay: '0s' }}></div>
        <div className="floating-circle bg-openup-mint animate-wave-motion" style={{ width: '250px', height: '250px', top: '60%', left: '15%', animationDelay: '2s' }}></div>
        <div className="floating-circle bg-openup-sage animate-wave-motion" style={{ width: '200px', height: '200px', top: '20%', right: '10%', animationDelay: '1s' }}></div>
        <div className="floating-circle bg-openup-blush animate-wave-motion" style={{ width: '350px', height: '350px', bottom: '5%', right: '5%', animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-fade-in overflow-y-hidden p-3" style={{ animationDelay: '0.1s' }}>
          <span className="bg-clip-text text-color-gradient">
            Bringing you the right support.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Get personalised professional care to fit your needs.
        </p>

        <h2 className="text-xl md:text-2xl font-medium text-gray-200 mb-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          What are you looking for?
        </h2>
      </div>
    </div>
  );
};

export default Hero;
