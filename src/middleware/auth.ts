// middleware/auth.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

export interface AuthenticatedNextApiRequest extends NextApiRequest {
    user: {
        id: string;
        token: string;
    };
}

const authMiddleware = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session || !session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    (req as AuthenticatedNextApiRequest).user = {
        id: session.user.id as string,
        token: '', // Empty token for testing purposes
    };

    return handler(req, res);
};


export default authMiddleware;
