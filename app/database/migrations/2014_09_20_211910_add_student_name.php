<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStudentName extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::table('students', function($table)
        {
            $table->string('name');
            $table->string('reading_level');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::table('students', function($table)
        {
            $table->dropColumn('name');
            $table->dropColumn('reading_level');
        });
	}

}
