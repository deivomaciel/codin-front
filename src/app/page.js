'use client'
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react'
import { FaQrcode } from "react-icons/fa6"
import Logo from './assets/logo.png'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const qrCodeRef = useRef(null)
  const inputRef = useRef(null)

  const getCode = async link => {
    const url = 'https://codin-api-code.cyclic.app/getqrcode'
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'link': link })
    }

    const response = await fetch(url, options)
    if(!response.ok) throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`)
    const result = await response.json()
    return result
  }

  const handleButton = async event => {
    event.preventDefault()

    if(inputValue.trim().length == 0) return

    const codeResult = await getCode(inputValue)
    if(codeResult) {
      qrCodeRef.current.innerHTML = `<img src="data:image/png;base64, ${codeResult.qr_code_base64}" alt="QR code"/>`
      qrCodeRef.current.style.display = "flex"
    }

    inputRef.current.value = ""
    inputRef.current.focus()
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <>
      <main className="h-screen flex flex-col justify-center items-center gap-8 p-6 lg:p-32">
        <section className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl text-main-text font-bold">Instant <span className="text-blue-500">QR codes</span> Generation.</h1>
          <p className="lg:text-2xl text-slate-700">The ultimate QR code generator to connect <br className='hidden sm:block'/> your physical and digital worlds seamlessly.</p>
        </section>

        <section className='hidden' ref={qrCodeRef}>
          efdwefew
        </section>

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

      <footer className='p-8 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 border-t'>
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
    </>
  );
}
