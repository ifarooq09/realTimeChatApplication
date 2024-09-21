import Lottie from "react-lottie"
import { animationDefaultOptions } from "@/lib/utils"

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
        <Lottie 
        isClickToPauseDisabled={true}
        height={400}
        width={400}
        options={animationDefaultOptions}
        />
        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-1 lg:text-4xl text-3xl transition-all duration-300 text-center">
            <h3 className="playpen-sans"> 
                Hi <span className="text-yellow-500">!</span> Welcome to 
                <span className="text-yellow-500"> SyncChat </span> App
                <span className="text-yellow-500">.</span>
            </h3>
        </div>
    </div>
  )
}

export default EmptyChatContainer