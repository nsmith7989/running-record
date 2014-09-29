<?php

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();
        DB::table('users')->truncate();
        User::create(array(
            'email'    => 'nathanael@gorocketfuel.com',
            'password' => Hash::make('alfa5465')
        ));
        User::create(array(
            'email' => 'indiana.gowland@gmail.com',
            'password' => Hash::make('hollyboo')
        ));

    }

}