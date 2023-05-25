<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\User;

class SchedulesController extends Controller
{
    public function getSchedulesByUserId($user_id, Request $request)
    {
        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);
        $schedules = Schedule::where('user_id', $user_id)->get();

        // パスワードを確認
        if (User::where('id', $user_id)->first()->password != password_hash($attr['password'], PASSWORD_DEFAULT)) return $this->SendError('password is incorrect.');

        return response()->json($schedules);
    }
}
