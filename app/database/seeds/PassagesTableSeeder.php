<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PassagesTableSeeder extends Seeder
{

    public function run()
    {
        $faker = Faker::create();

        DB::table('passages')->truncate();
        foreach (range(1, 40) as $index) {
            Passage::create([
                'title'         => $faker->realText(40, 1),
                'text'          => $faker->realText(rand(10,2000)),
                'reading_level' => $faker->numberBetween(0, 20)
            ]);
        }
    }

}