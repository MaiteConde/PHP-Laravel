import React, { useEffect, Fragment } from 'react'
import { getAllRooms, deleteRoom } from '../../redux/actions/rooms'
import { getAllUsers, deleteUser} from '../../redux/actions/users'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from 'antd';
import './Admin.scss'
import { Card } from 'antd';

// import '../containers/home/Home.scss'
const { Meta } = Card;

const Admin = ({rooms, users}) => {
    useEffect(() => {
        getAllRooms()
        getAllUsers()
     }, [])
     
     if(!rooms){
         return   <div id="preloader">
         <div id="loader"></div>
       </div> 
              
     }
     return (
       
       <div className="full">
       
              
       <h2>Rooms</h2>
       <div className="rooms">
            { rooms?.map(room => {
                return (
                  <Card
                  
                  style={{ width: 240 }}
                  cover={<img alt="example" src={room?.image_path} />}
                >
                  <Meta title={room?.name}  />
                  <span>  {room?.persons} players / {room?.category.name} / {room?.time} </span>    
                  <div className="buttons">
                  
                  <Button  onClick={() => deleteRoom(room?.id)} className="secondButton" type="dashed">Delete</Button>
                  <NavLink to= {`/editroom/${room?.id}`} activeClassName="isActive" exact>
                  <Button className="primaryButton" type="primary">Edit</Button></NavLink>
                  </div> 
                </Card>
    )
    
    
  })
  
}
</div>
<h2>Users:</h2>
             {users?.map((user=> {
               return (
                 <div className="users">
                  <p>
                   Name: {user.name}
                    </p> 
                    <p>
                      Mail: {user.email}
                    </p>
                    <Button onClick={() => deleteUser(user.id)}  className="secondButton" type="dashed">Delete</Button>
                 </div>
               )
             }))}
             </div>       
           
     )
 }
 
const mapStateToProps = ({rooms, user}) =>({rooms:rooms?.rooms, users: user?.users});
export default connect(mapStateToProps)  (Admin);