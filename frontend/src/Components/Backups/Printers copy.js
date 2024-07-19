import * as React from "react";

function Printers() {
    return (
        <div
            className="flex flex-col mx-auto w-full shadow-sm bg-[color:var(--sds-color-background-default-default)] max-w-[480px]">
            <div
                className="flex gap-5 justify-between px-4 py-4 mr-52 w-full shadow-sm bg-neutral-100 text-zinc-900">
                <div className="flex gap-1.5 my-auto text-xl font-bold leading-8">
                    <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/68aa5427e0e17cfdab46a42749ffee3818e37232e08404cf167980e0fb844fed?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                        className="shrink-0 self-start aspect-square w-[26px]"
                        alt=""/>
                    <div className="flex-auto">Printer System</div>
                </div>
                <div
                    className="justify-center px-4 py-3.5 text-sm leading-6 whitespace-nowrap rounded-2xl bg-[color:var(--sds-color-background-disabled-default)]">
                    Filter
                </div>
            </div>
            <div className="flex gap-3 self-start ml-3.5">
                <div className="flex flex-col grow shrink-0 self-start mt-7 basis-0 w-fit">
                    <div className="text-xl font-bold leading-8 text-zinc-900">
                        Printers
                    </div>
                    <div
                        className="flex flex-col px-5 pt-3 pb-8 mt-5 w-full bg-[color:var(--sds-color-background-disabled-default)] text-zinc-900">
                        <div className="flex gap-5 justify-between items-start leading-[160%]">
                            <div className="flex flex-col mt-4">
                                <div className="text-xl font-bold">Printer 1</div>
                                <div className="mt-3 text-base">Status: Online</div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b809c4c0630df90ae8b7d7aca3bf3b7e0fa601f23e72d556421b9c013845815?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="shrink-0 aspect-square w-[18px]"
                                alt=""/>
                        </div>
                        <div className="mt-2.5 text-sm leading-5">Location: Office 1</div>
                        <div className="mt-1.5 text-xs leading-5">IP: 192.168.1.1</div>
                        <div className="mt-4 text-sm font-bold leading-5">
                            Ink Level: 62%
                        </div>
                    </div>
                    <div
                        className="flex flex-col px-5 pt-3 pb-5 mt-3 w-full bg-[color:var(--sds-color-background-disabled-default)]">
                        <div className="flex gap-5 justify-between items-start text-zinc-900">
                            <div className="flex flex-col mt-4">
                                <div className="text-xl font-bold leading-8">Printer 2</div>
                                <div className="mt-3 text-base leading-6">Status: Offline</div>
                                <div className="mt-2.5 text-sm leading-5">
                                    Location: Office 2
                                </div>
                                <div className="mt-1.5 text-xs leading-5">IP: 192.168.1.2</div>
                                <div className="mt-4 text-sm font-bold leading-5">
                                    Ink Level: 50%
                                </div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b809c4c0630df90ae8b7d7aca3bf3b7e0fa601f23e72d556421b9c013845815?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="shrink-0 aspect-square w-[18px]"
                                alt=""/>
                        </div>
                        <div
                            className="flex overflow-hidden relative flex-col justify-center items-start mt-2 border-solid aspect-[62.4] border-[5px] border-zinc-200 stroke-[5px] stroke-zinc-200">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/48220dc5daf23a887ea6ac455212b391a416ff4e86b21412bda6ad041f4519cd?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="object-cover absolute inset-0 size-full"
                                alt=""/>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1399ed15860612c60652c01b28a2969eceb79458d821fc22bd643aa94a9fa5e6?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="max-w-full border-amber-400 border-solid aspect-[33.33] border-[5px] stroke-[5px] stroke-amber-400 w-[167px]"
                                alt=""/>
                        </div>
                    </div>
                    <div
                        className="flex flex-col px-5 pt-3 pb-5 mt-3 w-full bg-[color:var(--sds-color-background-disabled-default)]">
                        <div
                            className="flex gap-5 justify-between items-start leading-[160%] text-zinc-900">
                            <div className="flex flex-col mt-4">
                                <div className="text-xl font-bold">Printer 3</div>
                                <div className="mt-3 text-base">Status: Maintenance</div>
                                <div className="mt-2.5 text-sm leading-5">
                                    Location: Office 3
                                </div>
                                <div className="mt-1.5 text-xs leading-5">IP: 192.168.1.3</div>
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b809c4c0630df90ae8b7d7aca3bf3b7e0fa601f23e72d556421b9c013845815?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="shrink-0 aspect-square w-[18px]"
                                alt=""/>
                        </div>
                        <div className="mt-4 text-sm font-bold leading-5 text-zinc-900">
                            Ink Level: 23%
                        </div>
                        <div
                            className="flex overflow-hidden relative flex-col justify-center items-start mt-2 border-solid aspect-[62.4] border-[5px] border-zinc-200 stroke-[5px] stroke-zinc-200">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/48220dc5daf23a887ea6ac455212b391a416ff4e86b21412bda6ad041f4519cd?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="object-cover absolute inset-0 size-full"
                                alt=""/>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee8e249470e19583c521da5adb68a5f254910edd18dbfafc9e5777a8b39bd53b?apiKey=f150e26dbee348dda3dd1595d71fae64&"
                                className="border-red-500 border-solid aspect-[8.33] border-[5px] stroke-[5px] stroke-red-500 w-[41px]"
                                alt=""/>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-col justify-center px-1 py-20 border border-solid bg-[color:var(--sds-color-background-default-default)] border-zinc-200">
                    <div className="shrink-0 mt-16 rounded-md bg-neutral-300 h-[398px]"/>
                </div>
            </div>
            <div
                className="flex flex-col justify-center items-start px-4 py-4 w-full text-lg leading-7 whitespace-nowrap bg-gray-100 shadow text-zinc-900">
                <div
                    className="justify-center px-6 py-4 rounded-3xl bg-[color:var(--sds-color-background-disabled-default)]">
                    Settings
                </div>
            </div>
        </div>
    );
}

export default Printers;