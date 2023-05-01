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
          'id' => 1,
          'name' => 'Test Event1',
          'start_date' => '2021-01-26',
          'end_date' => '2021-04-27',
          'hash' => hash('sha256','testhash1'),
      ]);
      Event::create([
          'id' => 2,
          'name' => 'Test Event2',
          'start_date' => '2021-03-26',
          'end_date' => '2021-05-27',
          'hash' => hash('sha256','testhash2'),
      ]);

      User::create([
          'id' => 1,
          'event_id' => 1,
          'name' => 'Test User1',
          'password' => password_hash('testpass', PASSWORD_DEFAULT),
      ]);
      User::create([
          'id' => 2,
          'event_id' => 1,
          'name' => 'Test User2',
          'password' => null,
      ]);
      User::create([
          'id' => 3,
          'event_id' => 2,
          'name' => 'Test User3',
          'password' => password_hash('testpass2', PASSWORD_DEFAULT),
      ]);

      Schedule::create([
          'id' => 1,
          'user_id' => 1,
          'date' => '2021-01-26',
          'event_id' => 1,
          'status' => 'busy',
      ]);
      Schedule::create([
          'user_id' => 1,
          'date' => '2021-01-27',
          'event_id' => 1,
          'status' => 'danger',
      ]);
      
      EventOwnerRel::create([
          'event_id' => 1,
          'owner_id' => 1,
      ]);
      EventOwnerRel::create([
        'event_id' => 2,
        'owner_id' => 3,
    ]);
    }
}