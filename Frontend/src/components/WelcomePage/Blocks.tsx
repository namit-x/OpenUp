// it will be used inside WhyOpenUp.tsx
import { Blocks as LucideBlocks, Brain, HeartPlus, CalendarClock, LucideIcon } from 'lucide-react';

interface BlockInt {
  title: string;
  description: string;
  icon: LucideIcon;
}

const cards = [
  {
    title: 'Integrated Care',
    description: 'From self-care & therapy, to peer support & medication management, we can help with it all.',
    icon: LucideBlocks,
  },
  {
    title: 'Grounded in Science',
    description: 'Our care options are based on scientifically proven treatments & clinically validated approaches.',
    icon: Brain,
  },
  {
    title: 'Personalised Support',
    description: 'Our treatment plans are tailored to your unique needs, so you can get the right care at the right time.',
    icon: HeartPlus,
  },
  {
    title: 'Round the clock support',
    description: 'Our treatment options can be accessed from wherever you might be, all 7 days a week.',
    icon: CalendarClock,
  },
];

const Blocks = () => {
  return (
    <div className='flex justify-center gap-4 w-screen'>
      {cards.map(({ title, description, icon: Icon }, index) => (
        <div key={index} className='flex flex-col justify-center text-white w-80 h-96 rounded-3xl p-2 border-gradient'>
          <div className='mx-auto'><Icon size={80} /></div>
          <div className='text-center text-2xl text-subHeading font-semibold p-2'>{title}</div>
          <p className='text-comment text-[16px] p-3'>{description}</p>
        </div>
      ))}
    </div>
  )
}

export default Blocks
