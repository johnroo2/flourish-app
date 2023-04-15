import React from "react";

export default function GardenDropDown({optionSetter, options}){
    const[open, setOpen] = React.useState("");
    const[select, setSelect] = React.useState("---");

    return(
        <div>
            <button className="bg-white border-jet border-[2px] w-[225px] h-[2em] text-left pl-[10px]"
            onClick={function(){
                setOpen(!open);
            }}>
                <div className="flex flex-row justify-between items-center">
                    {(select === "---") ? "Select..." : select} 
                    {!open ? 
                        <><img className="h-[1em] pr-[10px]" alt="drop down" src={require("./../../imgs/dropdownarrow.png")}/> 
                        </>:<>
                        <img className="h-[1em] pr-[10px]" alt="drop down" src={require("./../../imgs/dropleftarrow.png")}/></>}
                </div>
            </button>

            {open && 
            <>
            {options.map(function(opt, key){
                return(
                    <div>
                        <button className="bg-white border-jetbright border-[1px] w-[225px] h-[1.75em] text-left pl-[10px]"
                        onClick={function(){
                            optionSetter(opt);
                            setSelect(opt);
                            setOpen(!open);
                        }}>{opt}</button>
                    </div>
                )
            })}
            </>}
        </div>
    )
}