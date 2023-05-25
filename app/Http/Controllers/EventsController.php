<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventOwnerRel;
use App\Models\User;

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

    public function createEvent(Request $request){
        $attr = $request->validate([
            'name' => 'required|string|max:256',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'ownerName' => 'required|string|max:256',
            'password' => 'required|numeric|digits:4'
        ]);

        // TODO: 日付の順序チェック
        

        // Eventの作成
        $event = new Event;
        $event->name = $attr['name'];
        $event->start_date = $attr['startDate'];
        $event->end_date = $attr['endDate'];
        $pass = substr(hash('sha256', $attr['name'].date('Y-m-d-H-i-s')), 0, 5);
        $event->hash = hash('sha256', $pass);
        $event->save();

        // ownerユーザーの作成
        $owner = new User;
        $owner->event_id = $event->id;
        $owner->name = $attr['ownerName'];
        $owner->password = password_hash($attr['password'], PASSWORD_DEFAULT);
        $owner->save();

        // EventOwnerRelの作成
        $rel = new EventOwnerRel;
        $rel->event_id = $event->id;
        $rel->owner_id = $owner->id;
        $rel->save();

        return response()->json(
            ['event_id' => $event->id, 'pass' => $pass],
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }
}
