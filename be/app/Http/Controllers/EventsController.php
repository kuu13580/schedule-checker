<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\EventOwnerRel;
use App\Models\User;

class EventsController extends Controller
{
    public function getEventById($id, $hash){
        $event = Event::leftjoin('event_owner_rel', 'events.id', '=', 'event_owner_rel.event_id')
            ->find($id);
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');
        $owner_id = EventOwnerRel::where('event_id', $id)->first()->owner_id;
        $event['owner_id'] = $owner_id;
        return $this->successData($event);
    }

    public function createEvent(Request $request){
        $attr = $request->validate([
            'name' => 'required|string|max:256',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'ownerName' => 'required|string|max:256',
            'password' => 'required|numeric|digits:4'
        ]);

        // 日付の順序チェック
        if (strtotime($attr['startDate']) > strtotime($attr['endDate'])) return $this->SendError('Start date is later than end date.');

        // Eventの作成
        $event = new Event;
        $event->name = $attr['name'];
        $event->start_date = $attr['startDate'];
        $event->end_date = $attr['endDate'];
        $event->hash = substr(hash('sha256', $attr['name'].date('Y-m-d-H-i-s')), 0, 20);
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

        return $this->successData(['event_id' => $event->id, 'pass' => $event->hash]);
    }
}
