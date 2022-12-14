<?php

namespace Database\Seeders;

use App\Models\Card;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Card::create([
            "titulo" => "Planejar reunião com equipe",
            "conteudo" => "Definir data e horário para reunião com a equipe para discutir o progresso do projeto atual",
            "lista" => "To Do"
        ]);

        Card::create([
            "titulo" => "Criar proposta para novo cliente",
            "conteudo" => "Elaborar proposta detalhada para o novo cliente, incluindo orçamento e prazos de entrega",
            "lista" => "Doing"
        ]);

        Card::create([
            "titulo" => "Entregar relatório de progresso",
            "conteudo" => "Enviar relatório detalhado do progresso do projeto atual para o gerente de projeto",
            "lista" => "Done"
        ]);
    }
}
