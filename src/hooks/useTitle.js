import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Kosa`;
    }, [title])
}

export default useTitle;