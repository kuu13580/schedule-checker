<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\User;
use App\Models\Schedule;
use App\Models\EventOwnerRel;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      Event::create([
          'id' => 'hash-1',
          'name' => 'Test Event1',
          'start_date' => '2021-01-26',
          'end_date' => '2021-04-27',
      ]);
      Event::create([
          'id' => 'hash-2',
          'name' => 'Test Event2',
          'start_date' => '2021-03-26',
          'end_date' => '2021-05-27',
      ]);

      User::create([
          'event_id' => 'hash-1',
          'name' => 'Test User1',
      ]);
      User::create([
          'event_id' => 'hash-1',
          'name' => 'Test User2',
      ]);
      User::create([
          'event_id' => 'hash-2',
          'name' => 'Test User3',
      ]);

      Schedule::create([
          'user_id' => 1,
          'date' => '2021-01-26',
          'event_id' => 'hash-1',
          'status' => 'busy',
      ]);
      Schedule::create([
          'user_id' => 1,
          'date' => '2021-01-27',
          'event_id' => 'hash-1',
          'status' => 'danger',
      ]);
      
      EventOwnerRel::create([
          'event_id' => 'hash-1',
          'owner_id' => 1,
      ]);
    }
}