import React from 'react'
import { createReservation } from '../../../redux/actions/reservations';
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { Button, notification } from 'antd';
import moment from 'moment';
import {useHistory} from 'react-router-dom';





const CreateReservation = ({room, user, totalP, reserDate, hour}) => {
    const history = useHistory();
    

    const id = useParams().id

            
    const totalA = (a) => {
         if (totalP = 3) {
             return a * 18
         }
         if (totalP = 4) {
            return a * 15
        }
        if (totalP = 2) {
            return a * 20
        }
    }
   
    const handleSubmit = event => {
        event.preventDefault();
        const reservation = {
            persons: totalP,
            date: moment(reserDate).format('YYYY/MM/DD'),
            hour: `${hour}` ,
            user_id: user?.id,
            room_id: id,
            price: totalA(totalP) 
        }
        
        createReservation(reservation, id)
        .then(res => {
            notification.success({message:'Reservation created. Check your email!'})
            setTimeout(() => {
                history.push('/profile')
            }, 2000);
        })
        .catch(()=>{
           
        })
    }
 
    return ( 
        
        <Button className="primaryButton"  type="dashed" onClick={handleSubmit}>
        Reserve
      </Button>
        
       
    )
}

const mapStateToProps = ({rooms, user}) =>({room:rooms?.roomId, totalP:rooms?.price, reserDate:rooms?.date, hour:rooms?.hour ,user: user?.user});
export default connect(mapStateToProps)  (CreateReservation);

