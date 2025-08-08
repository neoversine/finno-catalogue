
const sectors = ["North Kolkata", "South Kolkata", "Newtown", "Howrah"];

export default function AddressModal({ address, setAddress, onConfirm }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const allFilled = Object.values(address).every((val) => val.trim() !== "");
        if (allFilled) {
            onConfirm();
        } else {
            alert("Please fill in all fields.");
        }
    };

    return (
        <div className="md:fixed md:inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-10 overflow-auto min-h-screen min-w-screen">
            <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md space-y-6">
                {/* Heading */}
                <h2 className="text-xl font-semibold text-center text-gray-800">Enter Address Details</h2>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                    {[
                        { name: "flat", label: "Flat No." },
                        { name: "street", label: "Street" },
                        { name: "area", label: "Area" },
                        { name: "city", label: "City" },
                        { name: "state", label: "State" },
                        { name: "pincode", label: "Pincode" },
                    ].map(({ name, label }) => (
                        <div key={name} className="relative">
                            <input
                                type="text"
                                name={name}
                                id={name}
                                value={address[name]}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 pt-4 pb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                            <label
                                htmlFor={name}
                                className={`absolute left-4 -translate-y-1/2 text-sm transition-all  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 bg-white peer-focus:text-sm peer-focus:text-blue-600 px-1 peer-focus:border-transparent ${address[name] != '' ? 'top-0 text-blue-600' : 'top-1/2 text-gray-500 '}`}
                            >
                                {label}
                            </label>
                        </div>
                    ))}

                    {/* Sector Dropdown - full width on all screen sizes */}
                    <div className="relative col-span-1 md:col-span-2">
                        <select
                            name="sector"
                            value={address.sector}
                            onChange={handleChange}
                            className="peer w-full appearance-none px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700 bg-white"
                        >
                            <option value="" disabled hidden></option>
                            {sectors.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                        <label
                            htmlFor="sector"
                            className={`absolute left-4 -translate-y-1/2 text-sm transition-all peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 bg-white px-1
                            ${address.sector != '' ? 'top-0 text-blue-600' : 'top-1/2 text-gray-500 '}`}
                        >
                            Sector
                        </label>
                    </div>
                </form>


                {/* Buttons */}
                <div className="pt-2">
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-medium"
                    >
                        Confirm
                    </button>
                    {/* <button
                        onClick={onClose}
                        className="w-full mt-2 text-gray-500 hover:text-gray-700 text-sm underline"
                    >
                        Cancel
                    </button> */}
                </div>
            </div >
        </div >

    );
}
