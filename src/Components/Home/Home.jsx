import React, {useEffect} from "react";
import SimpleSlider from "../Carousel/Carousel";
import Products from "../Products/Products";
import {useDispatch, useSelector} from "react-redux";
import Banner from "../Banner/Banner";
import {filterByPrice} from "../features/products/productsSlice";

const Home = () => {
    const dispatch = useDispatch();
    const {products: {list, filtered}} = useSelector((state) => state);

    useEffect(() =>{
        if (!list.length) return;
        dispatch(filterByPrice(100));
    }, [dispatch, list.length]);

    return (
        <>
            <SimpleSlider/>
            <Products products={list} amount={5} title="Trending"/>
            <Banner />
            <Products products={filtered} amount={5} title="Less than 100$"/>
        </>
    )
}

export default Home;
