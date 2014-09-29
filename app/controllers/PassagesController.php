<?php

class PassagesController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 * GET /passages
	 *
	 * @return Response
	 */
	public function index()
	{
        $passages = Passage::all();

        //load in the view and pass in all users
        return Response::json($passages);

	}

	/**
	 * Show the form for creating a new resource.
	 * GET /passages/create
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('passages.create');
	}

	/**
	 * Store a newly created resource in storage.
	 * POST /passages
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 * GET /passages/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$passage = Passage::find($id);
        return Response::json($passage);
	}

	/**
	 * Show the form for editing the specified resource.
	 * GET /passages/{id}/edit
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 * PUT /passages/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 * DELETE /passages/{id}
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}