import React from 'react';

interface HistoryRouterProps {
    isActive?: boolean;
}

const HistoryIconinSidebar: React.FC<HistoryRouterProps> = ({ isActive = false }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="history">
                <path id="Vector" d="M3 12C3 13.78 3.52784 15.5201 4.51677 17.0001C5.50571 18.4802 6.91131 19.6337 8.55585 20.3149C10.2004 20.9961 12.01 21.1743 13.7558 20.8271C15.5016 20.4798 17.1053 19.6226 18.364 18.364C19.6226 17.1053 20.4798 15.5016 20.8271 13.7558C21.1743 12.01 20.9961 10.2004 20.3149 8.55585C19.6337 6.91131 18.4802 5.50571 17.0001 4.51677C15.5201 3.52784 13.78 3 12 3C9.48395 3.00947 7.06897 3.99122 5.26 5.74L3 8M3 8V3M3 8H8M12 7V12L16 14"
                    stroke={isActive ? "#FFFFFF" : "#A099FF"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </g>
        </svg>
    )
}
export default HistoryIconinSidebar;