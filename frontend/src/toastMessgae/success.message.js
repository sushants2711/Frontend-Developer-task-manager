import { Slide, toast } from "react-toastify";

export const handleSuccessMessage = (msg) => {
    toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
};