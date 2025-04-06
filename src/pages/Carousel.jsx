import { sliderClasses } from "@mui/material";

export default function Carousel({children:slides}) {
    return (
        <div>
            <div className="carousel-style">{slides}</div>
        </div>
    )
}
