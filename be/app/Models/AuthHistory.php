<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuthHistory extends Model
{
    use HasFactory;
    protected $table = 'authenticate_history';
}
