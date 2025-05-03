import ServiceCard from './ServiceCard';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Therapy for Self',
      subtitle: '18 years and above',
      description: 'Professional therapy sessions tailored to your individual needs',
      imageSrc: 'https://images.unsplash.com/vector-1743801050909-7ae0816daa96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVudGFsJTIwY2FyZXxlbnwwfHwwfHx8MA%3D%3D',
      delay: 0.1
    },
    {
      id: 2, 
      title: 'Psychiatry for Self',
      subtitle: '18 years and above',
      description: 'Expert psychiatric care with personalized treatment plans',
      imageSrc: 'https://images.unsplash.com/photo-1551292831-023188e78222?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      delay: 0.3
    },
    {
      id: 3,
      title: 'Support for Children',
      subtitle: 'Explore Children First',
      description: 'Specialized care and therapy designed for children\'s unique needs',
      imageSrc: 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3',
      delay: 0.5
    },
    {
      id: 4,
      title: 'Couples Therapy',
      subtitle: 'For you and your partner',
      description: 'Build stronger relationships with professional guidance and support',
      imageSrc: 'https://plus.unsplash.com/premium_vector-1723326082146-01686cb2dc33?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cGxlfGVufDB8fDB8fHww',
      delay: 0.7
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            subtitle={service.subtitle}
            description={service.description}
            imageSrc={service.imageSrc}
            delay={service.delay}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;