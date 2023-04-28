<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventOwnerRel;

class EventsController extends Controller
{
    //
    public function index(){
        $events = Event::all();
        return response()->json(
            $events, 
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }

    public function getEventById($id){
        $event = Event::find($id);
        $owner_id = EventOwnerRel::where('event_id', $id)->first()->owner_id;
        $event['owner_id'] = $owner_id;
        return response()->json(
            $event, 
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }
}
