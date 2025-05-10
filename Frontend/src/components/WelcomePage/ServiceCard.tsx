import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, subtitle, description, imageSrc, delay }) => {
  return (
    <div
      className="openup-gradient-card rounded-2xl overflow-hidden animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="h-64 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex justify-end">
          <button className="p-2 rounded-full bg-openup-teal/10 text-primary transition-colors hover:bg-openup-teal/20">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;