<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\{
    JWTException,
    TokenExpiredException,
    TokenInvalidException,
};
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {
    public function test() {
        return User::all();
    }

    public function login(Request $request) {
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['data' => ['error' => 'invalid_credentials']], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['data' => ['error' => 'could_not_create_token']], 500);
        }
        $user = auth()->user();
        return response()->json(compact('token', 'user'));
    }

    public function getAuthenticatedUser() {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['data' => ['token_expired']], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['data' => ['token_invalid']], 401);
        } catch (JWTException $e) {
            return response()->json(['data' => ['token_absent']], 401);
        }
        return response()->json(compact('user'));
    }

    public function register(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'birthdate' => 'required',
                'cellphone' => 'required',
                'cpf' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['data' => $validator->errors()], 422);
            }

            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
                'birthdate' => Carbon::parse($request->get('birthdate'))->format('Y-m-d'),
                'cellphone' => $request->get('cellphone'),
                'cpf' => $request->get('cpf'),
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(['data' => compact('user', 'token')], 201);
        } catch (\Throwable $th) {
            return response()->json(['data' => $th->getMessage()], 500);
        }
    }
}
