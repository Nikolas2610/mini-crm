<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\Client;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $clients = Client::all();

        for ($i = 0; $i < 50; $i++) {
            $client = $clients->random();

            Transaction::create([
                'client_id' => $client->id,
                'transaction_date' => now()->subDays(rand(1, 365)),
                'amount' => rand(1000, 10000) / 100,
            ]);
        }
    }
}
