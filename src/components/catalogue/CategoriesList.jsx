import { useState } from "react";

export default function CategoriesList({ Categories }) {
    const [active, setActive] = useState(Categories[0].name);

    const handleClick = (name) => {
        const id = name.replace(/\s+/g, "-"); // safe IDs
        setActive(name);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="flex flex-col gap-2 mt-4 pl-2 py-3 md:px-6 md:py-4">
            {Categories.map((ele, i) => (
                <div
                    key={i}
                    onClick={() => handleClick(ele.name)}
                    className={`flex max-md:flex-col md:items-center gap-2 px-2 py-1 cursor-pointer rounded-lg transition
            ${active === ele.name ? "bg-green-100/70 border border-green-400" : "hover:bg-gray-100"}
          `}
                >
                    <div className="h-8 w-8 rounded-full border border-gray-300/40 shadow overflow-hidden">
                        <img
                            src={ele.imgSrc}
                            alt={ele.name}
                            className="object-cover h-full"
                        />
                    </div>
                    <p
                        className={`text-sm font-medium ${active === ele.name ? "text-green-600" : "text-gray-800"
                            }`}
                    >
                        {ele.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
