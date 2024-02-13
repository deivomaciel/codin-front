import { HiDownload } from "react-icons/hi";

export default async function QRCode(props) {
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

    const downloadCode = () => {
        const qrCode = document.querySelector('#qrcode')
        const link = document.createElement('a')
        link.href = qrCode.src
        link.download = 'qrcode.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const codeData = await getCode(props.qrContent)

    return (
        <div className="bg-white flex flex-col justify-center items-center rounded-xl pb-8">
            <img src={`data:image/png;base64, ${codeData.qr_code_base64}`} alt="QR code" id="qrcode" />
            <button 
              type="submit" 
              className="w-40 flex gap-2 justify-center items-center transition duration-300 ease-in-out hover:bg-blue-600 bg-blue-500 p-2 rounded-lg text-white ml-2"
              onClick={() => {downloadCode()}}
            >
              Download
              <HiDownload />
            </button>
        </div>
    )
}