import React, {useEffect, useState} from "react";
import s from "../../styles/Header.module.css";
import {Link, } from "react-router-dom";
import {ROUTES} from "../Utils/routes";
import avatar from "../../assets/user_login.png";
import {useDispatch, useSelector} from "react-redux";
import {toggleForm} from "../features/user/userSlice";
import {useGetProductsQuery} from "../features/api/apiSlice";
const Header = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const {currentUser, cart, favorite} = useSelector(({user}) => user);
    const [values, setValues] = useState({name: "Guest", avatar: avatar});
    const {data, isLoading} = useGetProductsQuery({title: searchValue});

    useEffect(() => {
       if(!currentUser) return;

        setValues(currentUser)
    },[currentUser])

    const handleClick = () => {
        if(!currentUser) dispatch(toggleForm(true));
    }

    const handleSearch = ({target: {value}}) => {
        setSearchValue(value)
    }

    return(
        <div className={s.header}>
            <div className={s.logo}>
                <Link to={ROUTES.HOME}>
                    <div><span>e</span>Shop</div>
                </Link>
            </div>

            <form className={s.form}>
                <div className={s.icon}>
                    <svg className="icon">
                        <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
                    </svg>
                </div>
                <div className={s.input}>
                    <input type="search" name="search"
                    placeholder="Search"
                    autoComplete="off"
                    onChange={handleSearch}
                    value={searchValue}
                    />
                </div>

                {searchValue && (
                    <div className={s.box}>
                        {isLoading ? "Loading" : !data.length ? "No results" : data.map(({ title, images, id }) => {
                                    return (
                                        <Link key={id} onClick={() => setSearchValue("")} className={s.item} to={`/products/${id}`}>
                                            <div className={s.image} style={{ backgroundImage: `url(${images[0]})` }}/>
                                            <div className={s.title}>{title}</div>
                                        </Link>
                                    );
                                })}
                    </div>
                )}
            </form>

            <div className={s.info}>
                <div className={s.user} onClick={handleClick}>
                    <div className={s.avatar} style={{backgroundImage: `url(${values.avatar})`}}/>
                    <div className={s.username}>{values.name}</div>
                </div>
            </div>

                <div className={s.account}>
                    <Link to={ROUTES.FAVORITE} className={s.cart}>
                        <svg className={s["icon-fav"]}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                        </svg>
                        {!!favorite.length && <span className={s.count}>{favorite.length}</span>}
                    </Link>
                    <Link to={ROUTES.CART} className={s.cart}>
                        <svg className={s["icon-cart"]}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                        </svg>
                        {!!cart.length && <span className={s.count}>{cart.length}</span>}
                    </Link>
                </div>
        </div>
    )
};

export default Header;