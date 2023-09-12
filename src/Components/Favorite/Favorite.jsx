import React from "react";
import s from "../../styles/Favorite.module.css";
import {removeItemFromFavoriteCart} from "../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";


const FavoriteCart = () => {
    const dispatch = useDispatch();
    const {favorite} = useSelector(({user}) => user);


    const removeItem = (id) => {
        dispatch(removeItemFromFavoriteCart(id));
    };

    return (
        <section className={s.carts}>
            <h2 className={s.title}>Your favourite cart</h2>
            {!favorite.length ? (
                <div className={s.empty}>Here is empty</div>
            ) : (
                <>
                    <div className={s.list}>
                        {favorite.map((item) => {
                            const {title, category, images, price, id} = item;
                            return (
                                <div className={s.item} key={id}>
                                    <div className={s.image} style={{backgroundImage: `url(${images[0]})`}}/>
                                    <div className={s.info}>
                                        <h3 className={s.name}>{title}</h3>
                                        <div className={s.category}>{category.name}</div>
                                    </div>
                                    <div className={s.price}>{price}$</div>
                                    <div className={s.close} onClick={() => removeItem(item.id)}>
                                        <svg>
                                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
                                        </svg>
                                    </div>
                                </div>
                            );
                            }
                        )}
                    </div>
                </>
            )}
        </section>
    );
};

export default FavoriteCart;