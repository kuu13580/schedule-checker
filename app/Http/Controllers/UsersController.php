<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UsersController extends Controller
{
    //
    public function index(){
        $users = User::all();
        return response()->json(
            $users, 
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }
}
