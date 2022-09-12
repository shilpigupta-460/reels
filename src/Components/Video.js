import React,{ useState} from 'react'
import ReactDOM from 'react-dom'
function video({...props}) {
     const [ mute, setMute]= useState( true)
    //  const handleMute =(e)=>{
    //     e.preventDefault();
       
    //      e.taeget.muted = ! e.taeget.muted
    //  } 

     // to jump on to the next video on feed
     const handleScroll =(e)=>{
        let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
        
        if( next){
             next.scrollIntoView()
             setMute(true)
        }
        
      
    }
  return (
    <video width="400" src={props.src} type="video/mp4" muted="muted" onClick={(e)=>setMute(!e.target.mute)} onEnded={handleScroll} >
</video>
    
  )
}

export default video