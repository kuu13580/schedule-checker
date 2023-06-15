<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\User;
use App\Models\Schedule;

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
          'start_date' => '2021-01-15',
          'end_date' => '2021-03-15',
          'hash' => substr(hash('sha256','testhash1'), 0, 20),
          'password' => password_hash('1234', PASSWORD_DEFAULT),
      ]);
      Event::create([
          'id' => 2,
          'name' => 'Test Event2',
          'start_date' => '2021-03-26',
          'end_date' => '2021-05-27',
          'hash' => substr(hash('sha256','testhash2'), 0, 20),
          'password' => password_hash('1234', PASSWORD_DEFAULT),
      ]);

      User::create([
          'id' => 1,
          'event_id' => 1,
          'name' => 'Test User1',
          'password' => password_hash('1234', PASSWORD_DEFAULT),
      ]);
      User::create([
          'id' => 2,
          'event_id' => 1,
          'name' => 'Test User2',
          'password' => password_hash('0000', PASSWORD_DEFAULT),
      ]);
      User::create([
          'id' => 3,
          'event_id' => 2,
          'name' => 'Test User3',
          'password' => password_hash('5678', PASSWORD_DEFAULT),
      ]);

      Schedule::create([
          'id' => 1,
          'user_id' => 1,
          'date' => '2021-01-26',
          'event_id' => 1,
          'status' => 'unavailable',
      ]);
      Schedule::create([
          'user_id' => 1,
          'date' => '2021-02-27',
          'event_id' => 1,
          'status' => 'potential',
      ]);
    }
}
