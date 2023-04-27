<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventsController extends Controller
{
    //
    public function index(){
        $events = Event::all();
        return response()->json(
            $events, 
            200, 
            [], 
            JSON_UNESCAPED_UNICODE
        );
    }
}
