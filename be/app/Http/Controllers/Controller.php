<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function SendError($message) {
        return response()->json(
                ['error_message' => $message],
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
