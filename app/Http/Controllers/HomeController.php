<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display home page
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        $todos = Todo::get();

        return Inertia::render('Home', [
            'todos' => $todos,
        ]);
    }

    /**
     * Create new todo
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        Todo::create([
            'name' => $request->name,
            'created_at' => now(),
        ]);

        return redirect('/');
    }

    /**
     * Display code page
     *
     * @param Request $request
     * @return void
     */
    public function showCode(Request $request)
    {
        return Inertia::render('Code');
    }

    /**
     * Delete single todo
     *
     * @param Request $request
     * @param integer $todoId
     * @return void
     */
    public function destroy(Request $request, int $todoId)
    {
        Todo::find($todoId)->delete();

        return redirect('/');
    }

    /**
     * Delete multi todo
     *
     * @param Request $request
     * @return void
     */
    public function massDestroy(Request $request)
    {
        Todo::destroy($request->all());

        return redirect('/');
    }
}
