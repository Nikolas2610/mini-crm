<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        try {
            // Check if the authenticated user is an admin
            if (!Auth::user()->isAdmin()) {
                return response([
                    'error' => 'You do not have permission to access this resource'
                ], 403);
            }

            // Get all users
            $users = User::all();

            return response([
                'users' => $users
            ]);
        } catch (\Exception $e) {
            return response([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
