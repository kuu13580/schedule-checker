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

    protected $hash_error_responce = response()->json(
        ['message' => 'Hash is not valid'],
        403,
        [],
        JSON_UNESCAPED_UNICODE
    );
}
