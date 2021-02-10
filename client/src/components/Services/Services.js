export const validation = (style, item) => {
    const el = item.trim().replace(/(<([^>]+)>)/gi, "");
    switch (style) {
        case "email":
            if (el.match(/^[^@]+@[^@]+\.[^@]{2,4}$/)) {
                return el
            } else {
                return false
            }
        case "password":
            if (el.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/)) {
                return el
            } else {
                return false
            }
        default:
            if (item.match(/^.*\/(jpg|JPG|jpeg|gif|GIF|png|PNG|tiff|TIFF)$/)) {
                return item
            } else {
                return false
            }
    }
}