<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;

class UsersController extends Controller
{
    public function getUsersByEventId($event_id, $hash){
        $event = Event::find($event_id);
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');
        $users = User::where('event_id', $event_id)->get();
        return response()->json(
            $users, 
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }
}
