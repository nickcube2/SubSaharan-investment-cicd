import React from "react";
import clsx from "clsx";


interface AnimatedLinesProps {
    className?: string;
    svgRef?: React.Ref<SVGSVGElement>;
}

const AnimatedLines: React.FC<AnimatedLinesProps> = ({ className, svgRef }) => {
    return (
        <svg
            ref={svgRef}
            className={clsx(className)}
            width="100%"
            height="100%"
            viewBox="0 0 5481.88 4095.58"
            preserveAspectRatio="none"
        >
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "#ff0000", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#0000ff", stopOpacity: 1 }} />
                </linearGradient>
            </defs>
                   <g id="Layer_1-2" data-name="Layer 1">
                    <path d="M3017.45,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82C106.85,2391.04,14.82,2732.14,5.84,2889.54c-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M4496.03,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82-1210.23,612.23-1302.26,953.32-1311.24,1110.72-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M4249.6,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82-1210.23,612.23-1302.26,953.32-1311.24,1110.72-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M4003.17,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82-1210.23,612.23-1302.26,953.32-1311.24,1110.72-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M3756.74,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82-1210.23,612.23-1302.26,953.32-1311.24,1110.72-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M3510.31,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82-1210.23,612.23-1302.26,953.32-1311.24,1110.72-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M3263.88,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82C353.28,2391.04,261.25,2732.14,252.27,2889.54c-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                    <path d="M4742.45,1.18c-103.09,424.57-320.06,997.78-833.29,1365.82-226.42,162.37-257.81,103.6-867.09,411.82-1210.23,612.23-1302.26,953.32-1311.24,1110.72-4.49,78.67,9.92,143.89,21.96,185" fill="none" stroke="#70cbd3" stroke-miterlimit="10" stroke-width="10"/>
                </g>



            {/* Removed animateTransform and animate elements for static lines */}
        </svg>
    );
};

export default AnimatedLines;
