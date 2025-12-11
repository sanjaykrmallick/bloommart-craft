import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: 'Men', href: '/categories/men' },
      { name: 'Women', href: '/categories/women' },
      { name: 'Kids', href: '/categories/kids' },
      { name: 'Footwear', href: '/categories/footwear' },
      { name: 'Accessories', href: '/categories/accessories' },
    ],
    help: [
      { name: 'Track Order', href: '/orders' },
      { name: 'Returns & Refunds', href: '/returns' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Sell on ShopKart', href: '/vendor/register' },
    ],
    legal: [
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-foreground text-background/80 mt-auto">
      {/* Newsletter */}
      <div className="bg-gradient-primary py-10">
        <div className="container text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">
            Get Exclusive Offers & Updates
          </h3>
          <p className="text-primary-foreground/80 mb-6">
            Subscribe to our newsletter for the latest deals
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg bg-background/10 backdrop-blur border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:border-primary-foreground/50"
            />
            <Button variant="hero-accent" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-background">
              ShopKart
            </Link>
            <p className="mt-4 text-sm text-background/60">
              Your one-stop destination for fashion, lifestyle, and more.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-background mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-background mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                1800-123-4567
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                help@shopkart.com
              </li>
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5" />
                123 Commerce Street, Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2024 ShopKart. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-background/60 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
