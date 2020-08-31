import React from 'react';
import {ShowError} from '../ShowError.jsx';
import '../Form/Form.style.css';

const Form = (props) => {
    const { error, submit } = props;
    return (
        <div className="container h-100">
            <form onSubmit={submit}>
                <div>{error ? ShowError() : ""}</div>
                <div className="row">
                    <div className="col-md-3 offset-md-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                            name="city"
                            autoComplete="off"
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                            name="country"
                            autoComplete="off"
                        />
                    </div>
                    <div className="col-md-3 mt-md-0 mt-2 text-md-left ">
                        <button className="btn btn-warning">Get Weather</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form;
