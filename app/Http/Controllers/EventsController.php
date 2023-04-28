<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventOwnerRel;

class EventsController extends Controller
{
    //
    public function index(){
        $events = Event::all()->ToArray();
        return response()->json(
            $events, 
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }

    public function getEventById($id, Request $request){
        $event = Event::leftjoin('event_owner_rel', 'events.id', '=', 'event_owner_rel.event_id')
            ->find($id);
        // ハッシュ値チェック
        if (!$this->isHashMatch($request->hash, $event->hash)) return $this->SendHashError();
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
