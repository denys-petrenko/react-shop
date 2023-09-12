import React, {useState} from "react";
import s from "../../styles/Sidebar.module.css";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
    const {list} = useSelector(({categories}) => categories);
    const [nav, setNav] = useState(false);

    return (
        <section className={s.sidebar}>
            <nav>
                <ul className={nav ? [s.menu, s.active].join(' ') : [s.menu]}>
                    {list.map(({id, name}) => (
                        <li key={id}>
                            <NavLink onClick={() => setNav(!nav)}
                              className={({isActive}) => `${s.link} ${isActive ? s.active : ""}`}
                                to={`/categories/${id}`}>{name}</NavLink>
                        </li>
                    ))}
                </ul>
                <div onClick={() => setNav(!nav)} className={s.mobile_btn}>
                    {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
                </div>
            </nav>
        </section>
    )
};

export default Sidebar;