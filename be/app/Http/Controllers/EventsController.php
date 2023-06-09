<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\User;

class EventsController extends Controller
{
    public function getEventById($id, $hash){
        $event = Event::where('id', $id)->first();
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');
        $user_count = User::where('event_id', $id)->count();
        $event['user_count'] = $user_count;
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
        $event->password = password_hash($attr['password'], PASSWORD_DEFAULT);
        $event->save();

        // ownerユーザーの作成
        $owner = new User;
        $owner->event_id = $event->id;
        $owner->name = $attr['ownerName'];
        $owner->password = password_hash($attr['password'], PASSWORD_DEFAULT);
        $owner->save();

        return $this->successData(['event_id' => $event->id, 'hash' => $event->hash]);
    }

    public function authenticate($id, $hash, Request $request)
    {
      // ハッシュ値チェック
      $event = Event::where('id', $id)->first();
      if ($hash != $event->hash) return $this->SendError('Hash is invalid.');

      // 認証
      $attr = $request->validate([
          'password' => 'required|numeric|digits:4'
      ]);
      if (!password_verify($attr['password'], $event->password)) return $this->successData([ 'result' => false ]);

      return $this->successData([
        'result' => true
      ]);
    }

    public function getUserMessagesByEventId($id, $hash, Request $request)
    {
      // ハッシュ値チェック
      $event = Event::where('id', $id)->first();
      if ($hash != $event->hash) return $this->SendError('Hash is invalid.');

      // 認証
      $attr = $request->validate([
          'password' => 'required|numeric|digits:4'
      ]);
      if (!password_verify($attr['password'], $event->password)) return $this->SendError('password is incorrect.');

      $users = User::where('event_id', $id)->get();
      $data = [];
      foreach ($users as $user) {
        $data[] = [
          'user_id' => $user->id,
          'name' => $user->name,
          'message' => $user->message
        ];
      }
      return $this->successData($data);
    }
}
