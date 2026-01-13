/**
 * Ululato Premium - Footer
 * Pie de página con enlaces y información
 */
import { Link } from 'wouter';
import Logo from './Logo';
import { 
  Facebook, Twitter, Instagram, Linkedin, Youtube, 
  Mail, Phone, MapPin, Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explorar: [
      { label: 'Todos los Cursos', href: '/cursos' },
      { label: 'Categorías', href: '/categorias' },
      { label: 'Instructores', href: '/instructores' },
      { label: 'Certificaciones', href: '/certificaciones' },
    ],
    comunidad: [
      { label: 'Blog', href: '/blog' },
      { label: 'Foro', href: '/foro-general' },
      { label: 'Eventos', href: '/eventos' },
      { label: 'Embajadores', href: '/embajadores' },
    ],
    soporte: [
      { label: 'Centro de Ayuda', href: '/ayuda' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Términos', href: '/terminos' },
      { label: 'Privacidad', href: '/privacidad' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="text-muted-foreground mt-4 text-sm max-w-xs">
              El tejido que nos une. Aprende, crece y conecta con una comunidad 
              global de estudiantes apasionados.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#FFD700] hover:text-black transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explorar */}
          <div>
            <h4 className="font-bold mb-4">Explorar</h4>
            <ul className="space-y-3">
              {footerLinks.explorar.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-[#FFD700] transition-colors text-sm">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="font-bold mb-4">Comunidad</h4>
            <ul className="space-y-3">
              {footerLinks.comunidad.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-[#FFD700] transition-colors text-sm">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4 className="font-bold mb-4">Soporte</h4>
            <ul className="space-y-3">
              {footerLinks.soporte.map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-muted-foreground hover:text-[#FFD700] transition-colors text-sm">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FFD700]" />
                <a href="mailto:hola@ululato.com" className="hover:text-[#FFD700] transition-colors">
                  hola@ululato.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD700] mt-0.5" />
                <span>La Guajira, Colombia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Ululato. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-[#DC143C] fill-[#DC143C]" /> en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
