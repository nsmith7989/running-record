<?php
// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class StudentTableSeeder extends Seeder
{

    public function run()
    {

        $faker = Faker::create();
        DB::table('students')->delete();
        DB::table('students')->truncate();
        Student::create([
            'name'          => 'Bryan',
            'user_id'       => rand(1,2),
            'reading_level' => '16'
        ]);

        foreach (range(1, 30) as $index) {
            Student::create([
                'name'          => $faker->name,
                'user_id'       => rand(1,2),
                'reading_level' => $faker->numberBetween(1, 10) * 2
            ]);
        }

    }

}