export const authenticate = () => {
    return (req, res, next) => {
        const header = req.headers["authorization"]

        if (!header) return next()

        if (!header.startsWith("Bearer")) {
            
        }
    }
}