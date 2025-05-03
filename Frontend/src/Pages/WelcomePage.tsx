import BackgroundAnimation from '../components/BackgroundAnimation';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { Toaster } from '../components/ui/toaster'

const WelcomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[#111827]">
      {/* <BackgroundAnimation /> */}
      <Navbar />
      <main>
        <Hero />
        <Services />
      </main>
      <Toaster />
    </div>
  );
};

export default WelcomePage;