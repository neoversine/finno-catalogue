import { toast } from "react-toastify";

export const notify = (message, type = "default") => {
    switch (type) {
        case "success":
            toast.success(message);
            break;
        case "error":
            toast.error(message);
            break;
        case "info":
            toast.info(message);
            break;
        case "warn":
        case "warning":
            toast.warn(message);
            break;
        default:
            toast(message); // default or custom type
    }
};