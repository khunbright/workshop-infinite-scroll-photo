import './App.css';
import PhotoComponent from './components/PhotoComponent';
import { useEffect, useState } from 'react';

function App() {
  const apiKey = `5b2sNERnm6LiCcTMrDEQ2auF9r-pxHVHg3uiUN9NifU`
  

  const [photo,setPhoto] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading,setIsLoading] = useState(false)

  const fetchImage=async()=>{
    setIsLoading(true)
    try {
      const apiURL = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`
      const response = await fetch(apiURL)
      const data = await response.json()
      setPhoto((oldData)=>{
        return [...oldData,...data]
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  
  useEffect(() => {
    fetchImage()
    // eslint-disable-next-line
  }, [page])

  useEffect(() => {
    const event = window.addEventListener('scroll',()=>{
        if(window.innerHeight+window.scrollY>document.body.offsetHeight-500 && !isLoading){
            setPage((oldPage)=>{
                return oldPage+1
            })
        }
    })
    return ()=>window.removeEventListener('scroll',event)
    // eslint-disable-next-line
  }, [])
  
  return (
    <main>
      <h1>Infinite Scroll Photo</h1>
      <section className='photos'>
        <div className='display-photo'>
          {photo.map((data,index)=>{
            return <PhotoComponent key={index} {...data}/>
          })}
        </div>
      </section>
    </main>
  );
}

export default App;

