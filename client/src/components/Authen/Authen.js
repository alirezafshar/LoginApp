import React from "react";


const Authen = ({ history, location }) => {

    const logout = () => {
        history.push("/")
    }

    return (
        <>
            {(typeof location.state === "undefined") ? (logout()) : (
                <>
                    <nav className="nav">
                        <button className="btn btn--nav" onClick={logout}>Logout</button>
                    </nav>
                    <main className="main">
                        <div className="main__thumbnail">
                            <img className="main__img" src={`/images/${location.state.data.image}`} alt="user info" />
                        </div>
                        <p className="main__user">{location.state.data.email}</p>
                        <h2 className="main__title"> WELCOM TO YOUR ACCOUNT</h2>
                    </main>
                </>
            )}
        </>
    )
}

export default Authen;