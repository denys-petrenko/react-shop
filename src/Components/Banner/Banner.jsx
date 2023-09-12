import React from "react";
import s from "../../styles/Home.module.css";

const  Banner = () => (
    <section className={s.banner}>
        <div className={s.left}>
            <p className={s.content}>
                The new phones are here take a look
            </p>
            <button className={s.more}>See more</button>
        </div>
        <div className={s.right} >
        </div>
    </section>
);

export default Banner;
