import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { validation } from "../Services/Services";

class Login extends Component {

    state = {
        email: "",
        password: "",
        err: "",
        success: (this.props.location.state) ? (this.props.location.state.successMsg) : ""
    }

    changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const trusted = validation("email", value)

        if (!trusted) {
            this.setState({
                [name]: value,
                err: "Email pattern is not corrent",
                success: ""
            })
        } else {
            this.setState({
                [name]: value,
                err: "",
                success: ""
            })
        }
    }

    passHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const trusted = value.trim().replace(/(<([^>]+)>)/gi, "");

        this.setState({
            [name]: trusted,
            err: "",
            success: ""
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { history } = this.props
        if (email === "" || password === "") {
            this.setState({
                err: "All the fields are required"
            })
        } else {
            axios.post("/login", {
                email: this.state.email,
                password: this.state.password
            })
                .then(res => {
                    if (res.data === "wrong") {
                        this.setState({
                            err: "Your email or password is wrong"
                        })
                    } else {
                        history.push({
                            pathname: "/authen",
                            state: { data: res.data }
                        })
                    }
                })
        }

    }

    render() {
        const { email, password, err, success } = this.state;
        return (
            <>
                {(err) ? (<p className="err">{err}</p>) : ""}
                {(success) ? (<p className="success">{success}</p>) : ""}
                <form className="form__block">
                    <fieldset className="form__group">
                        <legend className="form__title">LOGIN TO YOUR ACCOUNT</legend>
                        <input
                            className="form__control"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email || ""}
                            onChange={this.changeHandler}
                            autoComplete="on"
                        />
                        <input
                            className="form__control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password || ""}
                            onChange={this.passHandler}
                            autoComplete="off"
                        />
                        <button className="btn" type="submit" onClick={this.submitHandler}>Login</button>
                        <Link className="link" to="Signup">Create Your Account</Link>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default Login;