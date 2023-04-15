<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        try {
            // Validate the login request
            $validated = $request->validated();

            // Attempt to authenticate the user
            if (!Auth::attempt($validated)) {
                // If authentication fails, return a 422 response
                return response([
                    'error' => 'The provided credentials are not correct'
                ], 422);
            }

            // Retrieve the authenticated user and create a token
            $user = Auth::user();
            /** @var User $user */
            $token = $user->createToken('main')->plainTextToken;

            // Return the user and token in the response
            return response([
                'user' => $user,
                'token' => $token
            ]);
        } catch (\Exception $e) {
            // If an exception is thrown, return a 404 response with the error message
            return response([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function logout()
    {
        try {
            // Get the currently authenticated user
            /** @var User $user */
            $user = Auth::user();

            // Delete the user's current access token
            $user->currentAccessToken()->delete();

            // Return a success response
            return response([
                'success' => true
            ]);
        } catch (\Exception $e) {
            // If an exception occurs, return an error response with the message
            return response([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
