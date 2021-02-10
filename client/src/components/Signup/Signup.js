import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { validation } from "../Services/Services";

class Signup extends Component {

    state = {
        email: "",
        password: "",
        configPass: "",
        image: "",
        err: {
            emptyErr: "",
            emailErr: "",
            passErr: "",
            imgErr: ""
        }
    }

    baseState = this.state;

    emailHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const trusted = validation("email", value);

        if (value === "") {
            this.setState({
                [name]: value,
                err: { ...this.state.err, emptyErr: "", emailErr: "Email is required" }
            })
        } else if (!trusted) {
            this.setState({
                [name]: value,
                err: { ...this.state.err, emptyErr: "", emailErr: "Email pattern is not corrent" }

            })
        } else {
            this.setState({
                [name]: value,
                err: { ...this.state.err, emptyErr: "", emailErr: "" }
            })
        }
    }

    passwordHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const trusted = validation("password", value);

        if (value === "") {
            this.setState({
                [name]: value,
                err: { ...this.state.err, emptyErr: "", passErr: "Password is requierd" }
            })
        } else if (!trusted) {
            this.setState({
                [name]: value,
                err: { ...this.state.err, emptyErr: "", passErr: "Password should English and have at least 1 upper letter, 1 lower letter, 1 number, and between 8 to 16 characters" }
            })
        } else {
            if (name === "configPass" && value === this.state.password) {
                this.setState({
                    [name]: value,
                    err: { ...this.state.err, emptyErr: "", passErr: "" }
                })
            } else if (name === "password" && value === this.state.configPass) {
                this.setState({
                    [name]: value,
                    err: { ...this.state.err, emptyErr: "", passErr: "" }
                })
            } else {
                this.setState({
                    [name]: value,
                    err: { ...this.state.err, emptyErr: "", passErr: "Passwords not match" }
                })
            }
        }
    }

    imageHandler = (e) => {
        if (typeof e.target.files[0] === "undefined") {
            this.setState({
                err: { ...this.state.err, emptyErr: "", imgErr: "Image should be upload" }
            })
        } else {
            const file = e.target.files[0];
            const format = e.target.files[0].type
            const trusted = validation("iamge", format)

            if (!trusted) {
                this.setState({
                    err: { ...this.state.err, emptyErr: "", imgErr: "Only jpeg, GIF, PNG, and TIFF iamge format is acceptable" }
                })
            } else {
                this.setState({
                    image: file,
                    err: { ...this.state.err, emptyErr: "", imgErr: "" }
                })
            }
        }
    }

    submitHandler = (e) => {
        e.preventDefault();
        const { email, password, configPass, image, err } = this.state;
        const { history } = this.props;
        const printErr = Object.values(err).find(item => item !== "")
        if (email === "" || password === "" || configPass === "" || image === "") {
            this.setState({
                err: { ...this.state.err, emptyErr: "All the fields are required" }
            })
        } else if (typeof printErr !== "undefined") {
            return false
        } else {
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);
            data.append("image", image);

            axios.post("/signup", data, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            })
                .then(res => {
                    if (res.data === "added") {
                        this.setState(this.baseState)
                        history.push({
                            pathname: "/",
                            state: { successMsg: "You have successfully registered" }
                        })
                    } else {
                        this.setState({
                            err: { ...this.state.err, emptyErr: "A account already exists with this email address" }
                        })
                    }
                })
        }
    }

    resetHadler = () => {
        this.setState(this.baseState);
    }

    render() {
        const { email, password, configPass, err } = this.state;
        const printErr = Object.values(err).find(item => item !== "")
        return (
            <>
                {(typeof printErr !== "undefined") ? (<p className="err">{printErr}</p>) : ("")}
                <form className="form__block">
                    <fieldset className="form__group">
                        <legend className="form__title">PLEASE CREATE YOUR ACCOUNT</legend>
                        <input
                            className="form__control"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email || ""}
                            onChange={this.emailHandler}
                            autoComplete="on"
                        />
                        <input
                            className="form__control"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password || ""}
                            onChange={this.passwordHandler}
                            autoComplete="off"
                        />
                        <input
                            className="form__control"
                            type="password"
                            placeholder="Confirm Password"
                            name="configPass"
                            value={configPass || ""}
                            onChange={this.passwordHandler}
                            autoComplete="off"
                        />
                        <input
                            className="from__control"
                            type="file"
                            placeholder="Select Your file"
                            name="image"
                            onChange={this.imageHandler}
                        />
                        <div className="btn__group">
                            <button className="btn" type="submit" onClick={this.submitHandler}>Submit</button>
                            <button className="btn" type="reset" onClick={this.resetHadler}>Clear</button>
                        </div>
                        <Link className="link" to="/">Back To Login</Link>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default Signup;