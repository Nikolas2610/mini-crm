<?php

namespace App\Http\Controllers;

use App\Http\Requests\Client\CreateClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Http\Resources\AllClientsResource;
use App\Models\Client;
use App\Http\Resources\ClientResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\TransactionResource;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Get all clients with pagination
     */
    public function index()
    {
        // Return paginate clients
        return ClientResource::collection(Client::paginate(10));
    }

    /**
     * Get all clients details for the transaction form
     */
    public function getAllClients()
    {
        return AllClientsResource::collection(Client::all());
    }

    /**
     * Store client
     */
    public function store(CreateClientRequest $request)
    {
        // Validate data
        $validated = $request->validated();
        // Create image name base on timestamp
        $imageName = time() . '.' . $request->avatar->extension();
        // Save the image to storage/app/public
        $validated['avatar']->storeAs('public', $imageName);
        // Add the filename to the avatar
        $validated['avatar'] = $imageName;
        // Save the client
        $client = Client::create($validated);
        // Return client
        return new ClientResource($client);
    }

    /**
     * Update client
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        //             'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        $validated = $request->validated();

        if ($request->hasFile('avatar')) {
            // Delete the previous image file if it exists
            Storage::delete('public/' . $client->avatar);
            // Create image name base on timestamp
            $imageName = time() . '.' . $request->avatar->extension();
            // Save the image to storage/app/public
            $validated['avatar']->storeAs('public', $imageName);
            // Add the filename to the avatar
            $validated['avatar'] = $imageName;
        }

        $client->update($validated);

        return new ClientResource($client);
    }

    /**
     * Display a listing of the transactions for the specified client.
     */
    public function transactions(Client $client)
    {
        $transactions = $client->transactions()->paginate(10);

        return TransactionResource::collection($transactions);
    }

    /**
     * Delete client
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(['message' => 'Client deleted successfully']);
    }
}
