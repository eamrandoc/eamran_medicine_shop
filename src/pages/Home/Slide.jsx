/* eslint-disable react/prop-types */
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Slide = ({ image, headline, text, buttonText }) => {
    return (
        <div
            className='w-full bg-center bg-cover h-[38rem]'
            style={{
                backgroundImage: `url(${image})`,
            }}
        >
            <div className='flex items-center justify-center w-full h-full bg-gray-900/70'>
                <div className='text-center'>
                    <h1 className='text-3xl lg:text-4xl font-bold text-white'>
                        {headline}
                    </h1>
                    <p className="text-lg sm:text-xl mb-8 text-white">
                        {text}
                    </p>
                    <br />
                    <Link
                        to='/add-job'
                        className='inline-flex items-center w-full px-8 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'
                    >
                        {buttonText}
                        <FaArrowRight className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Slide