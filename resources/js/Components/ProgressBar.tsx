import { ceil } from "lodash";
import React from "react";

interface Props {
    value: number
}

export default function ProgressBar({ value }: Props) {
    return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-600">
            <div className="my-2">
                <div style={{width: value + '%'}} className="bg-blue-700 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full">{ceil(value)}%</div>
            </div>
        </div>
    )
}

{/* <progress max={100} value={value} color="0000" className="w-full">

</progress> */}
