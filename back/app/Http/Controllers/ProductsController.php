<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller {
    public function create(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'serie' => 'required|string',
                'width' => 'required|numeric',
                'height' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['data' => $validator->errors()], 422);
            }

            $toCreate = $request->only([
                'name',
                'serie',
                'width',
                'height',
            ]);

            $toCreate["user_id"] = auth()->user()->id;

            Products::create($toCreate);

            return ['data' => 'success'];
        } catch (\Throwable $th) {
            return response()->json(['data' => [$th->getMessage()]], 500);
        }
    }

    public function list(Request $request) {
        return Products::latest()->with('user')->get();
    }

    public function delete($id) {
        Products::findOrFail($id)->delete();
        return ['data' => 'success'];
    }

    public function update(Request $request) {
        try {
            //code...
            $validator = Validator::make($request->all(), [
                'id' => 'required|exists:products,id',
                'name' => 'required|string',
                'serie' => 'required|string',
                'width' => 'required|numeric',
                'height' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return response()->json(['data' => $validator->errors()], 422);
            }

            $toUpdate = $request->only([
                'name',
                'serie',
                'width',
                'height',
            ]);

            Products::find($request->get('id'))->fill($toUpdate)->save();

            return ['data' => 'success'];
        } catch (\Throwable $th) {
            return response()->json(['data' => [$th->getMessage()]], 500);
        }
    }
}
