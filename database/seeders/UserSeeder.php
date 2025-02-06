<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = ['name' => 'John Doe', 'email' => 'john.doe@example.com', 'password' => bcrypt('password')];

        User::insert($user);
    }
}
