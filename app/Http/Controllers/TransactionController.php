<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\CreateTransactionRequest;
use App\Http\Requests\Transaction\UpdateTransactionRequest;
use App\Models\Transaction;
use App\Http\Resources\TransactionResource;

class TransactionController extends Controller
{
    /**
     * Get transactions with pagination 
     */
    public function index()
    {
        return TransactionResource::collection(Transaction::paginate(10));
    }

    /**
     * Store transaction
     */
    public function store(CreateTransactionRequest $request)
    {
        $validated = $request->validated();

        $transaction = Transaction::create($validated);

        return new TransactionResource($transaction);
    }

    /**
     * Update transaction
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $validated = $request->validated();

        $transaction->update($validated);

        return new TransactionResource($transaction);
    }

    /**
     * Delete transaction
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully'
        ]);
    }
}
