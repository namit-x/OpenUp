import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import { Toaster } from '../components/ui/toaster'
import WhyOpenUp from '../components/WhyOpenUp';
import Offerings from '../components/Offerings';
import Footer from '../components/Footer';

const WelcomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[#111827]">
      {/* <BackgroundAnimation /> */}
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyOpenUp />
        <Offerings />
        <Footer />
      </main>
      <Toaster />
    </div>
  );
};

export default WelcomePage;
