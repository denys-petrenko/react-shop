import React, {useEffect, useState} from "react";
import s from "../../styles/Product.module.css";
import {Link} from "react-router-dom";
import {ROUTES} from "../Utils/routes";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../features/user/userSlice";
import {addItemToFavoriteCart} from "../features/user/userSlice";

const Product = (item) => {
    const { title, price, images, description } = item;
    const [currentImage, setCurrentImage] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0]);
    }, [images]);

    const addToCart = () => {
        dispatch(addItemToCart(item));
    }
    const addToFavCart = () => {
        dispatch(addItemToFavoriteCart(item));
    }

    return (
        <section className={s.product}>
            <div className={s.images}>
                <div className={s.current} style={{backgroundImage: `url(${currentImage})`}}
                />
                <div className={s["images-list"]}>
                {images.map((image, i) => (
                    <div key={i} className={s.image} style={{backgroundImage: `url(${image})`}} onClick={() => setCurrentImage(image)}
                    />
                ))}
                </div>
            </div>
            <div className={s.info}>
                <h1 className={s.title}>{title}</h1>
                <div className={s.price}>{price} $</div>
                <p className={s.description}>{description}</p>
                <div className={s.actions}>
                    <button onClick={addToCart} className={s.btn_add}>Add to cart</button>
                   <button onClick={addToFavCart} className={s.favourite}>Add to favourites</button>
                </div>
                <div className={s.bottom}>
                    <div className={s.purchase}>
                        {Math.floor(Math.random() * 20 + 1)} purchases
                    </div>
                    <Link to={ROUTES.HOME}>
                        Return to store
                    </Link>
                </div>
            </div>
        </section>
    );
};
export default Product;