<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventsController extends Controller
{
    //
    public function index(){
        $event = Event::all();
        return response()->json(
            $event
            , 200, [], JSON_UNESCAPED_UNICODE);
    }
}
