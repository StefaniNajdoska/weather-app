import React from "react";
import "./Weather.style.css";

const Weather = (props) => {
    const { cityName, icon, celsius, min, max, description, feelsLike } = props;

    const maxMinTemp = (min, max) => {
        if (max && min) {
            return (
                <h3>
                    <span className="px-4">{min}&deg;</span>
                    <span className="px-4">{max}&deg;</span>
                </h3>
            );
        }
    }

    return (
        <div className="container text-light">
            <div className="Card">
                <h1 className="text-white py-3">{cityName}</h1>
                <h5 className="py-4">
                    <i className={`wi ${icon} display-1`} />
                </h5>

                {celsius && 
                    <h1 className="py-2">{celsius}&deg;</h1>
                }

                {maxMinTemp(min, max)}

                <h4 className="py-3">
                    {description.charAt(0).toUpperCase() + description.slice(1)}
                </h4>
                {feelsLike && <h6 className="py-3">
                    Feels like: {feelsLike}&deg;
                </h6>}
            </div>
        </div>
    );
};

export default Weather