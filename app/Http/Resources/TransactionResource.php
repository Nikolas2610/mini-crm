<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'client' => [
                'id' => $this->client_id,
                'firstName' => $this->client->firstName,
                'lastName' => $this->client->lastName,
            ],
            'transaction_date' => $this->transaction_date,
            'amount' => $this->amount,
        ];
    }
}
