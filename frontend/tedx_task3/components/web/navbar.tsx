export default function Nav() {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center border-b px-4 sm:px-15">
            <div>
                <div className="flex flex-row justify-center items-center gap-2 text-primary-foreground font-medium tracking-[2.1px] text-sm py-5">
                    <span className="wrap-break-word"><img src="/globeIcon.svg" alt="globe" className="pr-1" /></span>{" "}
                    <span className="wrap-break-word">TEDX</span>{" "}
                    <span className="text-[#E62B1E] wrap-break-word">X</span>{" "}
                    <span className="wrap-break-word">TERRA INCOGNITA</span>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center gap-5 text-primary-foreground">
                <span className="text-[10px] sm:text-xs font-normal tracking-[1.2px] wrap-break-word">ARCHIVE</span>
                <span className="text-[10px] sm:text-xs font-normal tracking-[1.2px] wrap-break-word">PROGRAMS</span>
                <span className="text-[10px] sm:text-xs font-normal tracking-[1.2px] wrap-break-word">ACQUISITIONS</span>
            </div>
        </div>
    );
}