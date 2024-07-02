import { ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode, Key } from "react";

export default function MultiSelectDropdown({ formFieldName, options, onChange, onBlur, value }:{formFieldName:string; options:any, onChange:any; onBlur:any; value:any}) {
    return (
        <>

            <label className="relative z-20 ">
                <input type="checkbox" className="hidden peer" />
                <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
                    {"Select multiple or one blog category"}
                </div>

                <div className="absolute h-40 overflow-y-auto inset-0 top-10 bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
                    <ul>
                        {options.map((option:any , i: number) => {
                            return (
                                <li key={i}>
                                    <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                                        <input
                                            type="checkbox"
                                            name={formFieldName}
                                            defaultValue={option.id}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className="cursor-pointer"
                                        />
                                        <span className="ml-1">{option.name}</span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </label>
        </>
    );
}