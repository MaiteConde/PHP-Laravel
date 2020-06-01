<?php

namespace App\Http\Controllers;

use App\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function getAll()
    { 
        $reservations = Reservation::with('room', 'user')->get();
        return $reservations;
    }
   
    public function insert(Request $request, $id)
    {
        try {
            $body = $request->all(); //req.body
            
           
            $body['room_id'] = $id;
            $body['user_id'] = Auth::id();
            $reservation = Reservation::create($body);
            return $reservation;
      } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function delete($id)
    {
        try {
            $reservation = Reservation::find($id) ;
            
            if (Auth::id() !== $reservation -> id) {
                return response([
                    'message' => 'You are not the author',

                ]);
            }
            $reservation->delete();
            
            return response([
                'message' => 'Reservation deleted',
                'reservation' => $reservation
            ]);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage()
            ], 500);
        
        }
    }
}
