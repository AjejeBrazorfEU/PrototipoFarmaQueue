

export default function Header({Logout}) {
    return (
        <div className="header">
            <h1 className="testoHeader">FarmaQueue</h1>
            <button onClick={Logout}>Logout</button>
        </div>
    )
}