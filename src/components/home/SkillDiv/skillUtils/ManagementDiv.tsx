import gantt from "@images/logoDev/management/gantt.png";
import pert from "@images/logoDev/management/PERT.png";
import scrum from "@images/logoDev/management/scrum-icon.png";
import trello from "@images/logoDev/management/trello.png";
import swot from "@images/logoDev/management/swot.png";


import Image from "next/image";

export default function ManagementDiv() {
    return (
        <div className={"flex flex-wrap justify-center items-center gap-4 w-full"}>
            <Image className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" src={gantt}
                   alt="burp"/>
            <Image className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" src={pert}
                   alt="docker"/>
            <Image className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" src={scrum}
                   alt="figma"/>
            <Image className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" src={trello}
                   alt="git"/>
            <Image className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" src={swot}
                   alt="swot"/>
        </div>
    );
}
