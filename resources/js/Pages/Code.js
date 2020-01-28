import React, { useEffect } from 'react';
import Layout from './Layout';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';

const frontendCode = `
import { Inertia } from '@inertiajs/inertia';
import React, { useState } from 'react';
import Layout from './Layout';

export default function Home({todos}) {

    const [values, setValues] = useState({
        'name': "",
        'selectedTodos': []
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;

        setValues(values => ({
            ...values,
            [key]:value
        }));
    }

    function handleClick(e) {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            let latestTodos = values.selectedTodos.concat(value);
            setValues({
                selectedTodos: latestTodos
            });
        } else {
            let latestTodos = values.selectedTodos.filter(todo => todo !== value);
            setValues({
                selectedTodos: latestTodos
            });
        }
    }

    function store() {
        Inertia.post('/', values)
        .then(() => {
            setValues({
                'name': ''
            });
        });
    }

    function destroy(todoId) {
        Inertia.delete('/' + todoId);
    }

    function massDestroy() {
        console.log(values.selectedTodos);

        Inertia.post('/mass_destroy', values.selectedTodos);
    }

    return (
        <Layout title="Demo Todo" activeDom="/">
            <div className="row mb-3">
                <div className="col-md-6">
                    <input id="name" type="text" className="form-control" value={values.name} onChange={(e) => handleChange(e)} placeholder="type any to do name here..."/>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-secondary" onClick={() => store()}>Add Todo</button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-12">
                    {
                        todos.map((todo) =>
                            <div className="form-check" key={todo.id}>
                                <input type="checkbox" className="form-check-input" value={todo.id} onClick={(e) => handleClick(e)}/>
                                <label className="form-check-label">{todo.name}</label>
                                <a href="#" onClick={() => destroy(todo.id)}>
                                    <i className="fa fa-trash ml-2 text-danger"></i>
                                </a>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-danger" onClick={() => massDestroy()}>Delete Selected</button>
                </div>
            </div>
        </Layout>
    )
}`;

const backendCode = `
<?php

namespace App\\Http\\Controllers;

use App\\Todo;
use Illuminate\\Http\\Request;
use Inertia\\Inertia;

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
}`;

export default function Code() {

    useEffect(() => {
        hljs.initHighlightingOnLoad();
    });

    return (
        <Layout title="Demo Todo" activeDom="code">
            <div className="row mb-3">
                <div className="col-md-12">
                    <p className="text-secondary">
                        There will be two core codes to create this application. The code will consist frontend (react code) and backend (laravel code).
                    </p>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-12">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a href="#frontend" id="pills-frontend-tab" className="nav-link active" data-toggle="pill" role="tab" aria-controls="frontend" aria-selected="true">Frontend</a>
                        </li>
                        <li className="nav-item">
                            <a href="#backend" id="pills-backend-tab" className="nav-link" data-toggle="pill" role="tab" aria-controls="backend" aria-selected="false">Backend</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="frontend" role="tabpanel" aria-labelledby="pills-frontend-tab">
                            <pre>
                                <code className="language-javascript">
                                    {frontendCode}
                                </code>
                            </pre>
                        </div>
                        <div className="tab-pane fade" id="backend" role="tabpanel" aria-labelledby="pills-backend-tab">
                            <pre>
                                <code className="language-php">
                                    {backendCode}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
