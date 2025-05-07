import { Heart, Mail, Phone, Linkedin, Instagram, Twitter } from 'lucide-react';
import { Separator } from '../components/ui/Separator';
import { Button } from '../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-4 text-white bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Mission */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4 p-2">
              <span className="text-2xl font-bold text-color-gradient">OpenUp</span>
              <div className='heartbeat text-xl'> ❤️</div>
            </div>
            <p className="text-sm text-center md:text-left">
              Empowering individuals with accessible mental health support, personalized care plans, and professional guidance.
            </p>
          </div>

          {/* Links */}
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm">Home</a></li>
              <li><a href="#services" className="text-sm">Services</a></li>
              <li><a href="#offerings" className="text-sm">Offerings</a></li>
              <li><a href="#why-openup" className="text-sm">Why OpenUp</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-4 text-primary">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-openup-teal" />
                <span className="text-sm text-muted-foreground">+1 (800) 555-OPEN</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-openup-teal" />
                <span className="text-sm text-muted-foreground">support@openup.care</span>
              </div>
              <div className="flex gap-3 mt-4">
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-muted hover:bg-muted/80">
                  <Linkedin size={16} />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-muted hover:bg-muted/80">
                  <Twitter size={16} />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-muted hover:bg-muted/80">
                  <Instagram size={16} />
                  <span className="sr-only">Instagram</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-muted" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p className="mb-4 md:mb-0">© {currentYear} OpenUp. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;