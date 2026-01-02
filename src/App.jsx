
import React, { useState, useCallback , useEffect, useRef} from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  let [password, setpassword]=useState()

   //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "1234567890"
    if(characterAllowed) str +="!@#$%^&*_+[]\|/"

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length +1)
     
      pass += str.charAt(char)

    }
    setpassword(pass)


  },[length,numberAllowed,characterAllowed])

 const passwordCopyToClipboard = useCallback(()=> {
  passwordRef.current?.select()     // if clicked copy button than password are select
  passwordRef.current?.setSelectionRange(0,3)    //set index how much value select
  window.navigator.clipboard.writeText(password)
 }, [password])

  //useEffect Hook

useEffect(() => {
  passwordGenerator ()
}, [length,numberAllowed,characterAllowed,passwordGenerator])
return (
  <>
    {/* Full Screen Modern Background */}
    <div className="min-h-screen w-full flex items-center justify-center
      bg-gradient-to-br from-slate-900 via-gray-900 to-black">

      {/* Glassmorphism Card */}
      <div
        className="w-full max-w-md rounded-2xl px-6 py-5
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_0_40px_rgba(59,130,246,0.25)]"
      >
        <h1 className="text-white text-center my-3 text-2xl font-semibold">
          Password Generator
        </h1>

        {/* Password Input */}
        <div className="flex shadow rounded-lg overflow-hidden mb-5">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="outline-none w-full bg-white text-gray-900 px-4 py-2"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={passwordCopyToClipboard}
            className="text-white bg-blue-500 hover:bg-blue-600
            transition px-4 py-2 shrink-0 font-medium"
          >
            copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-y-4 text-sm text-white">

          {/* Length */}
          <div className="flex items-center justify-center gap-x-3">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setlength(e.target.value)}
              className="cursor-pointer w-40"
            />
            <label className="whitespace-nowrap">
              length: <span className="font-semibold">{length}</span>
            </label>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center justify-center gap-x-6">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="inputNumber"
                onChange={() => setnumberAllowed((prev) => !prev)}
              />
              <label htmlFor="inputNumber">number</label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="inputCharacter"
                onChange={() => setcharacterAllowed((prev) => !prev)}
              />
              <label htmlFor="inputCharacter">character</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  </>
)
}


export default App
