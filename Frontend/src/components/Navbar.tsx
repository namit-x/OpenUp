import { useState, useEffect } from 'react';
import { Button} from '../components/ui/Button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-color-gradient">
                OpenUp
              </span>
              <span className="ml-2 text-xs text-muted-foreground mt-2">
                
              </span>
            </Link>
          </div>
          
          <div className={`flex gap-8 items-center space-x-1 ${isScrolled? "text-gray-900" :"text-gray-200" } `}>
            <a href="#about-us">ABOUT US</a>
            <a href="#services">SERVICES</a>
            <a href="#experts">EXPERTS</a>
            <div className="ml-6 flex space-x-4">
              <Button variant="ghost" size="sm" className="rounded-full  hover:bg-openup-mint/20 hover:text-primary">
                <PhoneIcon />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full  hover:bg-openup-mint/20 hover:text-primary">
                <WhatsappIcon />
              </Button>
              <Button variant="default" className="rounded-full">
                SIGN IN
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <MobileNavLink href="#about-us">ABOUT US</MobileNavLink>
              <MobileNavLink href="#services">SERVICES</MobileNavLink>
              <MobileNavLink href="#experts">EXPERTS</MobileNavLink>
              <div className="pt-4 flex justify-between">
                <Button variant="ghost" size="sm" className="rounded-full">
                  <PhoneIcon />
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full">
                  <WhatsappIcon />
                </Button>
                <Button variant="default" className="bg-gradient-to-r from-openup-teal to-openup-mint hover:opacity-90 text-white rounded-full">
                  SIGN IN
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-muted"
    >
      {children}
    </a>
  );
};

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

export default Navbar;