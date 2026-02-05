const InputHeader = () => {
    return (
        <div className="w-full ">
            <div className="relative flex h-10 w-full">
                <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-gray-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </div>

                <input
                    type="text"
                    placeholder="Ba mẹ muốn tìm gì..."
                    className="h-full w-full rounded-full border border-gray-300 bg-white pr-4 pl-10 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
};
export default InputHeader;
