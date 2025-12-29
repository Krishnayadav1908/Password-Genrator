
import React, { useState, useCallback , useEffect, useRef} from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  let [password, setpassword]=useState()

   //useRef Hook
 //const passwordRef = useRef(null)    //initialization with zero

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
 //passwordRef.current?.select()     // if clicked copy button than password are select
  //passwordRef.current?.setSelectionRange(0,3)    //set index how much value select
  window.navigator.clipboard.writeText(password)
 }, [password])

  //useEffect Hook

useEffect(() => {
  passwordGenerator ()
}, [length,numberAllowed,characterAllowed,passwordGenerator])

  return (
 <>
<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-800 '  > 
  <h1 className='text-white text-center  my-2 text-2xl' > Password Generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4' >
    <input 
    type="text"
    value={password}
    placeholder='password'
    className='outline-none w-full bg-white text-gray-900 px-3 py-1'
    readOnly
    //ref={passwordRef}
    />
    <button 
    onClick={passwordCopyToClipboard}
    className='text-white bg-blue-500 outline-none px-2 py-2 shrink-0'>copy</button>    
  </div>

 <div className='flex text-sm gap-x-4 justify-center text-white py-1'>
    <div className='flex items-center gap-x-1 '>
        <input 
            type="range"
            min ={6}
            max ={100}
            value ={length} 
            onChange={(e)=>{setlength(e.target.value)}}
            className='cursor-pointer'/>
        <label>length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1 '>
        <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id ="inputNumber"
            onChange={ ()=> {
              setnumberAllowed ((prev) => !prev);  // prev means previous state (false, true)
            }}
            
          />
        <label htmlFor="inputNumber">number</label>
    </div>
    <div className='flex items-center gap-x-1 '>
          <input 
              type="checkbox"
              defaultChecked={characterAllowed}
              id ="inputCharacter"
              onChange={ ()=> {
                setcharacterAllowed ((prev) => !prev);  // prev means previous state false, true)
              }}
          />
          <label htmlFor='inputCharacter'>character</label>
    </div>

  </div>
 </div>
</> 
  )
}

export default App
