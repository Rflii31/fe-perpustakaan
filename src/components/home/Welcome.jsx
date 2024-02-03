import React from "react";
import logo from "../../image/logo.png";

const WelcomePage = () => {

    return (
        <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center" style={{ height: "90vh" }}>
            <div>
                <img src={logo} width="200" height="50" alt="logo" />
            </div>
            <div>
                <h1 className="title">Welcome to the library app</h1>
            </div>
            <div className="mt-5">
                <button className="button is-success has-text-white mr-3">
                    <a href="/login" className="has-text-white">
                        login
                    </a>
                </button>
                <button className="button is-success has-text-white">
                    <a href="/register" className="has-text-white">
                        register
                    </a>
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
