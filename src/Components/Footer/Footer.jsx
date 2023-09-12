import React from "react";
import s from "../../styles/Footer.module.css";
import {Link, NavLink} from "react-router-dom";
import {ROUTES} from "../Utils/routes";
import {useSelector} from "react-redux";

const Footer = () => {
    const {list} = useSelector(({categories}) => categories);
    return (
        <section className={s.footer}>
            <div className={s.logo}>
                <Link to={ROUTES.HOME}>
                    <div><span>e</span>Shop</div>
                </Link>
            </div>

            <nav>
                <ul className={s.catalog}>
                    <h2>Catalog</h2>
                    {list.map(({id, name}) => (
                        <li key={id}>
                            <NavLink to={`/categories/${id}`}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <nav>
                <ul className={s.catalog}>
                <h2>Company</h2>
                    <li>
                        <NavLink to={""}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to={""}>Support</NavLink>
                    </li>
                </ul>
            </nav>

            <div className={s.catalog}>
                <h2>Developed by <span>AAA</span></h2>
            </div>

            <div className={s.socials}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
                    </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                    <svg className="facebook">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
                    </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer">
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
                    </svg>
                </a>
            </div>
        </section>
    )
};

export default Footer;