import { rateLimit } from "express-rate-limit";


export const limitRequests = (rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    limit: 2000, 
    legacyHeaders: true,
    standardHeaders: 'draft-7',
    message: 'You  have exceeded the number of requests. Try again in 15 minutes',
    statusCode: 403
    }))