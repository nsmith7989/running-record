<?php

class UserTableSeeder extends Seeder
{

    public function run()
    {
        DB::table('users')->delete();
        User::create(array(
            'name'  => 'Nathanael',
            'email' => 'nathanael@gorocketfuel.com',
        ));
        User::create(array(
            'name'  => 'IndiAna',
            'email' => 'indiana.gowland@gmail.com',
        ));

    }

}