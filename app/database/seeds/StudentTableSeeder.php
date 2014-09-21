<?php

class StudentTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('students')->delete();
        Student::create(array(
            'name'          => 'Bryan',
            'user_id'       => '1',
            'reading_level' => '16'
        ));
    }

}