import Blocks from "./Blocks"

const WhyOpenUp = () => {
  return (
    <div className='w-screen h-[550px] overflow-hidden bg-[#234E52]'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col'>
          <span className='text-4xl text-color-gradient font-bold w-min text-nowrap p-2'>Why OpenUp?</span>
        </div>
        <p className='text-gray-200 mt-3 mb-8 text-[18px]'>Our platform is built by psychiatrists, therapists and mental health experts with immense global experience.</p>
        <div className='flex gap-8'>
          <Blocks/>
        </div>
      </div>
    </div>
  )
}

export default WhyOpenUp
