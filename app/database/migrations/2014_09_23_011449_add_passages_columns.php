<?php

use Illuminate\Database\Migrations\Migration;

class AddPassagesColumns extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('passages', function ($table) {
            $table->string('title');
            $table->longText('text');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('passages', function ($table) {
            $table->dropColumn('title');
            $table->dropColumn('text');
        });
    }

}
