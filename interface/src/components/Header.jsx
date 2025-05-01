import { Link } from "react-router-dom"

export default function Header () {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><Link to="/">DASHBOARD</Link></li>
                    <li><Link to="/adicionar_produto">ADICIONAR PRODUTO</Link></li>
                </ul>
            </nav>
        </header>
    )
}
