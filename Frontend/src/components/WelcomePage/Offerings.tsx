import { Button } from '../ui/Button';

const Offerings = () => {
  return (
    <section id="offerings" className="py-24 px-4 bg-[#111827]">
      <div className="max-w-6xl mx-auto text-white">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent text-color-gradient py-2">
            Our mental healthcare offerings
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We are a mental health ecosystem that brings together multiple treatment options to create an experience that makes getting
            help easy and seamless. From assessment to treatment, we're with you every step of the way.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <img src="./OpenUpVC.webp" alt="" />
          </div>

          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-3xl font-bold text-foreground p-2">Therapy & Psychiatry</h3>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Our professionals are highly qualified and trained to deliver quality and compassionate clinical
                treatment across ages through therapy, psychiatry, mental health support for your child
                and couples therapy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                They follow proprietary protocols & undergo peer supervision to ensure you get exceptional care,
                now in person too. Meet your mental health expert today.
              </p>
            </div>
            <div>
              <Button className="border-gradient text-xl overflow-hidden hover:bg-teal-500">
                EXPLORE EXPERTS
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-3xl font-bold text-foreground p-2">Self-Care</h3>
            <div className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                The Amaha app is a digital powerhouse of mental health resources.
                Get access to a personalised plan with 600+ tools, activities, articles & daily reminders to make mental health care a part of your routine.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                They follow proprietary protocols & undergo peer supervision to ensure you get exceptional care,
                now in person too. Meet your mental health expert today.
              </p>
            </div>
            <div className='flex justify-end'>
              <Button className="border-gradient text-xl overflow-hidden hover:bg-teal-500 mx-14">
                Try Tips
              </Button>
            </div>
          </div>

          <div>
            <img src="./OpenUpVC.webp" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offerings;