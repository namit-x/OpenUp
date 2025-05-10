import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/WelcomePage/Services';
import { Toaster } from '../components/ui/toaster'
import WhyOpenUp from '../components/WelcomePage/WhyOpenUp';
import Offerings from '../components/WelcomePage/Offerings';
import Footer from '../components/Footer';

const WelcomePage = () => {

  return (
    <div className="min-h-screen flex flex-col bg-[#111827]">

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
