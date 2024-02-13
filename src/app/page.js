'use client'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react'
import { Suspense } from 'react'
import { FaQrcode } from "react-icons/fa6"
import Logo from './assets/logo.png'
import QRCode from './components/qrcode';
import Loading from './components/loading/Loading';

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [redyToCall, setRedyToCall] = useState(false)
  const [codeInView, setCodeInView] = useState(false)
  const inputRef = useRef(null)

  const handleButton = async event => {
    event.preventDefault()
    if(inputValue.trim().length == 0) return
    setCodeInView(true)
    setRedyToCall(true)
    inputRef.current.value = ""
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  useEffect(() => {
    setRedyToCall(false)
  }, [inputValue])

  return (
    <div className='relative br-blue-200'>
      <main className="flex flex-col items-center gap-8 p-6 lg:p-32">
        <section className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl text-main-text font-bold">Instant <span className="text-blue-500">QR codes</span> Generation.</h1>
          <p className="lg:text-2xl text-slate-700">The ultimate QR code generator to connect <br className='hidden sm:block'/> your physical and digital worlds seamlessly.</p>
        </section>

        {
          (codeInView && redyToCall) && 
          <Suspense fallback={<Loading />}>
            <QRCode qrContent={inputValue} />
          </Suspense>
        }

        <form className="p-4 lg:w-606">
          <div className="drop-shadow-lg rounded-xl p-2 border-2 border-blue-500 flex justify-between bg-white">
            <input 
              type="text" 
              placeholder="Ex.: https://codin.vercel.app" 
              className="w-full px-2 outline-none"
              onChange={e => {setInputValue(e.target.value)}}
              ref={inputRef}
            />
            <button 
              type="submit" 
              className="w-40 flex gap-2 justify-center items-center transition duration-300 ease-in-out hover:bg-blue-600 bg-blue-500 p-2 rounded-lg text-white ml-2"
              onClick={event => {handleButton(event)}}
            >
              Generate
              <FaQrcode />
            </button>
          </div>
        </form>
      </main>

      <footer className='p-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 border-t mt-32'>
        <div className='flex items-center justify-center gap-4'>
          <Image src={Logo} alt='Codin logo' width={80}/>
          <p>&copy; 2024 Codin Software.</p>
        </div>

        <div className='flex gap-3'>
          <a href="#">Privacy Policy</a>
          <span>/</span>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
}
