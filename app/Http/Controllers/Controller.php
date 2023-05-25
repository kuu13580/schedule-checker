<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function isHashMatch($target, $hash){
        $hashed_target = hash('sha256', $target);
        if($hashed_target === $hash){
            return true;
        }else{
            return false;
        }
    }

    protected function SendError($message) {
        return response()->json(
                ['message' => $message],
                400,
                [],
                JSON_UNESCAPED_UNICODE
        );
    }

    protected function successData($data) {
        return response()->json(
                $data,
                200,
                [],
                JSON_UNESCAPED_UNICODE
        );
    }
}
