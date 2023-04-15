<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;
use Faker\Factory as Faker;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
    
        // Create 50 clients with faker data
        for ($i = 0; $i < 25; $i++) {
            // Generate a new avatar image using Faker and save it to storage
            $imageName = $faker->image(storage_path('app/public/'), 150, 150, 'avatar', false, true);
            // Create a new client with the Faker data and the timestamp-based image filename
            Client::create([
                'firstName' => $faker->firstName(),
                'lastName' => $faker->lastName(),
                'email' => $faker->unique()->email(),
                'avatar' => $imageName,
            ]);
        }
    }
}
