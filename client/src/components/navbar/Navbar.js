import "./navbar.css";
import Notification from "../../img/mh11a3sgsn5tbvgdk4upaei0m9.png";
import Message from "../../img/message.svg";
import Settings from "../../img/settings.svg";
import {useEffect, useState} from "react"

const Navbar = ({socket}) => {
 const [notifications,setNotifications] = useState([]); 
 const [open,setOpen] = useState(false); 

  useEffect(() => { 
  //  socket.on("getNotification",(data) => {
  //   setNotifications((prev)=>[...prev,data]);
  //  });

   socket.on("getText",(data) => {
    setNotifications((prev)=>[...prev,data]);
   });
   },[socket])

   console.log(notifications)
 
   const displayNotification = ({senderName, text}) =>{
    let action;

    // if(type===1){
    //   action="liked"
    // } else if(type === 2){
    //   action="commented"
    // } else {
    //   action="shared"
    // }
    // return(
    //   <span className="notification">{`${senderName} ${action} your post`}</span>
    // )

    return(
      <span className="notification">{`${senderName} ${text} `}</span>
    )
   }

   const handleRead = () => {
    setNotifications([]);
    setOpen(false);
   }

  return (
    <header className='navbar'>
      <span className="logo">Deyaa App</span>
      <nav className="icons">
        <div className="icon" onClick={()=>setOpen(!open)}>
          <img src={Notification} className="iconImg" alt="" />
          {
            notifications.length>0 &&
            <div className="counter">{notifications.length}</div>
          }
        </div>
        <div className="icon" onClick={()=>setOpen(!open)}>
          <img src={Message} className="iconImg" alt="" />
          
        </div>
        <div className="icon" onClick={()=>setOpen(!open)}>
          <img src={Settings} className="iconImg" alt="" />
          
        </div>
         {open && 
        <div className="notifications">
          {notifications.map( n => displayNotification(n) )}
          <button className="nButton" onClick={handleRead}>Mark as read</button>
        </div>
        }
      </nav>
    </header>
  )
}

export default Navbar