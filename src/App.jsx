import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlenght] = useState(8);
  const[number, setnumber] = useState(false)
  const[char, setchar] = useState(false)
  const[password, setpassword] = useState("")
  const[date , setdate] = useState(new Date())
    
  const passwordRef = useRef(null)

   const copypassword = useCallback(() => {
    passwordRef.current ?.select()
    // passwordRef.current ?.setSelectionRange(0, 7);
    window.navigator.clipboard.writeText(password)
   },[password])

    let k = "0123456789"
    function fn(){
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if(number) str += k;
      if(char) str += "!@#$%^&*()"
      for(let i=1; i<=length; i++){
        let ind = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(ind);
      }
      setpassword(pass);
    }
    const passwordGenrator = useCallback(fn, [length, number, char, setpassword])
     
    useEffect(() =>{
      passwordGenrator()
   },
    [length, number, char, passwordGenrator])



  return (
    <>
    <div className='max-w-md h-48 mx-auto my-32 rounded-lg 
     shadow-md px-4 py-3 text-yellow-500 bg-gray-700'>
     <h1 className='text-white text-center my-3 '>Time and Date : {date.toString()}</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className="outline-none w-full py-1 px-3"
      placeholder="Password"
      readOnly
      ref={passwordRef}
      />
      <button 
      onClick={copypassword}
      className='outline-none bg-blue-500 text-white
       px-3 py-0.5 shrink-0 hover:bg-blue-700 '>copy</button>
     </div>
       
       <div className=' py-6 flex text-sm gap-x-4'>
  
          <div className='flex w-64 items-center gap-x-2 '>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setlenght(e.target.value)}}
            />
            <label> Lenght: {length}</label>
          </div>

            <div className="flex items-center gap-x-2">
              <input 
              className='hover:cursor-pointer'
              type="checkbox"
              defaultChecked={number}
              id='numberInput'
              onChange={() => {
                setnumber((prev) => !prev);
              }}
               />
               <label htmlFor="NumberInput"> Number</label>
            </div>

            
            <div className="flex items-center gap-x-2">
              <input 
              className='hover:cursor-pointer'
              type="checkbox"
              defaultChecked={char}
              id='characterInput'
              onChange={() => {
                setchar((prev) => !prev);
              }}
               />
               <label htmlFor="NumberInput">Character</label>
            </div>
       </div>
     </div>

     <h1 className='text-white text-center text-6xl'> Password Genrator</h1>
   </>
  )
}

export default App
