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
}
