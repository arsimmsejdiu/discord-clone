import { useEffect, useState } from "react"

export const useOrigin = () => {
    /**
     * Returns the origin of the current window location.
     * 
     * @returns {string} The origin of the current window location.
     * If the component has not yet mounted, an empty string is returned.
     */
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const origin = typeof window !== "undefined" && location.origin ? window.location.origin : "";

    if(!mounted) {
        return ""
    }

    return origin
}