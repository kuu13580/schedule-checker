<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\User;
use App\Models\Event;

class SchedulesController extends Controller
{
    public function getSchedulesByUserId($user_id, $hash, Request $request)
    {
        // ハッシュチェック
        $user = User::where('id', $user_id)->first();
        $event_id = $user->event_id;
        if ($hash != Event::where('id', $event_id)->first()->hash) return $this->SendError('Hash is invalid.');

        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);
        $schedules = Schedule::where('user_id', $user_id)->get();

        // パスワードを確認
        if (!password_verify($attr['password'], $user->password)) return $this->SendError('password is incorrect.');

        $data = [
          'schedules' => $schedules,
          'message' => $user->message
        ];
        return $this->successData($data);
    }

    public function updateSchedulesByUserId($user_id, $hash, Request $request)
    {
        // ハッシュチェック
        $user = User::where('id', $user_id)->first();
        $event_id = $user->event_id;
        if ($hash != Event::where('id', $event_id)->first()->hash) return $this->SendError('Hash is invalid.');

        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);
        $schedules = Schedule::where('user_id', $user_id)->get();

        // パスワードを確認
        if (!password_verify($attr['password'], $user->password)) return $this->SendError('password is incorrect.');

        try {
          foreach ($request->scheduleArray as $schedule) {
              Schedule::updateOrCreate(
                ['event_id' => $event_id, 'user_id' => $user_id, 'date' => $schedule['date']],
                ['status' => $schedule['status']]
              );
          }
          $user->message = $request->message;
          $user->save();
        } catch (\Exception $e) {
          return $this->SendError($e);
        }
        return $this->successData("update sccessful.");
    }

    public function getSchedulesByEventId($event_id, $hash, Request $request)
    {
      // ハッシュチェック
      $event = Event::where('id', $event_id)->first();
      if ($hash != $event->hash) return $this->SendError('Hash is invalid.');

      $attr = $request->validate([
          'password' => 'required|numeric|digits:4'
      ]);
      // パスワードを確認
      if (!password_verify($attr['password'], $event->password)) return $this->SendError('password is incorrect.');

      $users = User::where('event_id', $event_id)->get();
      $data = [];
      foreach ($users as $user) {
        $schedules = Schedule::select('date', 'status')->where('user_id', $user->id)->get();
        $data[] = [
          'user_id' => $user->id,
          'schedules' => $schedules,
        ];
      }
      return $this->successData($data);
    }
}
