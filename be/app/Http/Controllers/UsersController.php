<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Event;
use App\Models\AuthHistory;

const MAX_AUTH = 5;
class UsersController extends Controller
{
    public function getUsersByEventId($event_id, $hash){
        $event = Event::find($event_id);
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');
        $users = User::select('id', 'name')->where('event_id', $event_id)->get();
        return $this->successData($users);
    }

    public function authenticate($user_id, $hash, Request $request){
        $event_id = User::where('id', $user_id)->first()->event_id;
        $event = Event::find($event_id);
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');
        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);

        // 認証回数情報取得
        $ip_addr =$request->ip();
        $authHistory = AuthHistory::firstOrNew(['user_id' => $user_id, 'ip_addr' => $ip_addr, 'date' => date('Y-m-d')]);

        // 認証失敗が5回以上の場合は失敗として処理
        if ($authHistory->count >= MAX_AUTH) {
          return $this->successData([
            'result' => false,
            'remain' => MAX_AUTH - $authHistory->count,
          ]);
        }

        // パスワードを確認
        if (password_verify($attr['password'], User::where('id', $user_id)->first()->password)) {
          $tmp = AuthHistory::where([['user_id', $user_id], ['ip_addr', $ip_addr]])->first();
          if ($tmp) {
            $tmp->delete();
          }
          return $this->successData([
            'result' => true
          ]);
        }

        // 認証失敗
        $authHistory->count += 1;
        $authHistory->save();

        return $this->successData([
            'result' => false,
            'remain' => MAX_AUTH - $authHistory->count,
        ]);
    }

    public function createUser($event_id, $hash, Request $request){
        $event = Event::find($event_id);
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');

        // リクエストボディのバリデーション
        $attr = $request->validate([
            'userName' => 'required|string|max:10',
            'password' => 'required|numeric|digits:4'
        ]);

        // ユーザーの作成
        $user = new User;
        $user->name = trim($attr['userName']);
        $user->password = password_hash($attr['password'], PASSWORD_DEFAULT);
        $user->event_id = $event_id;
        $user->save();

        return $this->successData([
            'id' => $user->id
        ]);
    }

    public function deleteUser($user_id, $hash, Request $request){
        $event_id = User::where('id', $user_id)->first()->event_id;
        $event = Event::find($event_id);
        // ハッシュ値チェック
        if ($hash != $event->hash) return $this->SendError('Hash is invalid.');

        // パスワードのチェック
        $attr = $request->validate([
            'password' => 'required|numeric|digits:4'
        ]);
        if (!password_verify($attr['password'], User::where('id', $user_id)->first()->password)) return $this->SendError('Password is invalid.');

        // ユーザーの削除
        User::where('id', $user_id)->delete();

        return $this->successData([
            'result' => true
        ]);
    }
}
