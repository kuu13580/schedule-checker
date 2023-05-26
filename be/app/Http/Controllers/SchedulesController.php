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
        $event_id = User::where('id', $user_id)->first()->event_id;
        if ($hash != Event::where('id', $event_id)->first()->hash) return $this->SendError('Hash is invalid.');

        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);
        $schedules = Schedule::where('user_id', $user_id)->get();

        // パスワードを確認
        if (password_verify(User::where('id', $user_id)->first()->password, $attr['password'])) return $this->SendError('password is incorrect.');

        return response()->json($schedules);
    }

    public function updateSchedulesByUserId($user_id, $hash, Request $request)
    {
        // ハッシュチェック
        $event_id = User::where('id', $user_id)->first()->event_id;
        if ($hash != Event::where('id', $event_id)->first()->hash) return $this->SendError('Hash is invalid.');

        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);
        $schedules = Schedule::where('user_id', $user_id)->get();

        // パスワードを確認
        if (password_verify(User::where('id', $user_id)->first()->password, $attr['password'])) return $this->SendError('password is incorrect.');

        // TODO:更新処理
        return $this->successData($request->scheduleArray);
    }
}
