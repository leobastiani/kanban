<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return response()->json(Card::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'lista' => 'required|string|max:255',
        ]);

        $card = Card::create([
            'titulo' => $request->titulo,
            'conteudo' => $request->conteudo,
            'lista' => $request->lista,
        ]);

        return response()->json($card, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'conteudo' => 'required|string',
            'lista' => 'required|string|max:255',
        ]);

        $card = Card::findOrFail($id);
        $card->titulo = $request->titulo;
        $card->conteudo = $request->conteudo;
        $card->lista = $request->lista;

        $card->save();

        return response()->json($card);
    }

    public function destroy($id)
    {
        $card = Card::findOrFail($id);
        $card->delete();

        return response()->json(Card::all());
    }


}
