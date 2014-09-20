<?php

class Student extends \Eloquent
{

    public function teacher()
    {
        return $this->belongsTo('User');
    }


}
