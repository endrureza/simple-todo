import React, { useEffect, Fragment } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Layout({ title, activeDom, children }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className="container">
            <h1 className="text-secondary my-4">Simple Todo List</h1>
            <p className="text-secondary mb-4">
                Using Laravel and React
            </p>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Fragment>
                                {
                                    activeDom == '/' ?
                                    <InertiaLink className="nav-link active" href="#">Demo</InertiaLink> :
                                    <InertiaLink className="nav-link" href="/">Demo</InertiaLink>
                                }
                            </Fragment>
                        </li>
                        <li className="nav-item">
                            <Fragment>
                                {
                                    activeDom == 'code' ?
                                    <InertiaLink className="nav-link active" href="#">Code</InertiaLink> :
                                    <InertiaLink className="nav-link" href="/code">Code</InertiaLink>
                                }
                            </Fragment>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
        </div>
    )
}
