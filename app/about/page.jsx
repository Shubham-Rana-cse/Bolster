import React from 'react'

const page = () => {
  return (
    <>
      <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
              <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                  <div
                      className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                      <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                          <img className=" rounded-xl object-cover" src="/documents/image2.png" alt="about Us image" />
                      </div>
                      <img className="sm:ml-0 ml-auto rounded-xl object-cover" src="/documents/ppSizePhoto.jpeg"
                          alt="about Us image" />
                  </div>
                  <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                      <div className="w-full flex-col justify-center items-start gap-8 flex">
                          <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                              <h2
                                  className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                  Hello, I'm Shubham Rana</h2>
                              <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                                I'm a passionate Computer Science Engineering undergraduate from Graphic Era deemed to be University, Dehradun, India. I possess strong interest in full-stack development, problem solving, and building impactful digital products. Over the past few years, I have worked on projects involving modern web technologies such as React, Next.js, Tailwind CSS, Node.js, and databases, while also strengthening my understanding of data structures and algorithms. Academically my areas of interest are computer networking, data structures and algorithms and object orinted programming.
                              </p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4">

                        <a target='_blank' href="/documents/myresume5.1.1.pdf" className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-violet-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-violet-400 rounded-full">
                              <svg height={24} width={24} viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path className='fill-white' opacity="0.15" d="M5 21H19V9H15C13.8954 9 13 8.10457 13 7V3H5V21Z" fill="#000000"/>
                                <path className='fill-white' d="M8 13H14M8 17H16M13 3H5V21H19V9M13 3H14L19 8V9M13 3V7C13 8 14 9 15 9H19" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </button>
                        </a>

                        <a href="https://github.com/Shubham-Rana-cse" target='_blank' className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full">
                              <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:fill-[#171543] fill-white duration-300" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </button>
                        </a>

                        <a target='_blank' href="https://www.linkedin.com/in/shubham-rana45/" className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full">
                              <svg height={24} width={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:fill-[#171543] fill-white duration-300" d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8.5,19H6V10h2.5V19z M7.3,9 h-0.1C6.4,9,6,8.6,6,8.1V7.9c0-0.5,0.4-0.9,0.9-0.9h0.1C7.6,7,8,7.4,8,7.9v0.1C8,8.6,7.6,9,7.3,9z M19,19h-2.5v-4.9 c0-1.2-0.4-2-1.4-2c-0.8,0-1.3,0.6-1.5,1.2h-0.1V19H10V10h2.3v1.3h0C12.7,10.7,14,9.9,15.5,9.9c2.1,0,3.5,1.4,3.5,3.8V19z" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </button>
                        </a>

                        <a target='_blank' href="https://mail.google.com/mail/?view=cm&fs=1&to=shubhamrana181945@gmail.com&su=Let's%20Connect" className="social-button">
                          <button className="relative w-12 h-12 rounded-full group">
                            <div className="floater w-full h-full absolute top-0 left-0 bg-red-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl" />
                            <div className="cursor-pointer icon relative z-10 w-full h-full flex items-center justify-center border-2 border-red-400 rounded-full">
                              <svg height={32} width={32} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path className="group-hover:fill-[#171543] fill-white duration-300" d="M28 5H4c-1.104 0-2 .896-2 2v18c0 1.104.896 2 2 2h24c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2zm0 4.879L16 18 4 9.879V7l12 8 12-8v2.879zM4 23V11.885l11.446 7.63c.269.18.594.274.921.274s.652-.094.92-.274L28 11.885V23H4z" fill="#FFFFFF" />
                              </svg>
                            </div>
                          </button>
                        </a>

                      </div>

                  </div>
              </div>
          </div>
      </section>
    </>
  )
}

export default page
