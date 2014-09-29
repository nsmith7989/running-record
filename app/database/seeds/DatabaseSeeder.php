<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		 $this->call('StudentTableSeeder');
		 $this->call('PassagesTableSeeder');
		 $this->call('UserTableSeeder');
	}

}
