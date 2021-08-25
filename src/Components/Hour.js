import React from 'react';
import { Line } from "react-chartjs-2";
import '../Components/Style/Hour.css';

function Hour({onecall}) {

    const hours = [];
    const temp = [];
    const feel = [];
    const setHours = onecall.hourly.map(el => [...hours, new Date(el.dt * 1000).toLocaleDateString("en-GB", {
        hour24: true,
        hour: "numeric",
        minute: "2-digit",
      }).split(',')[1]]);
    const setTemp = onecall.hourly.map(el => [...temp, el.temp]);
    const setFeel = onecall.hourly.map(el => [...feel, el.feels_like]);

    return (
        

            <div>
                <div className=" chart bg-white rounded-3">
                    <Line
                        data={{
                            labels:  setHours,
                            datasets:
                                [
                                    {
                                        data: setTemp.flat(),
                                        label: " Temp (°C)",
                                        borderColor: "lightblue",
                                        fill: false
                                    },
                                    {
                                        data: setFeel.flat(),
                                        label: " Feel like (°C)",
                                        borderColor: "orange",
                                        fill: false
                                    }
                                ]
                        }}
                        

                    />
        </div>
            </div>
    )
}

export default Hour;
