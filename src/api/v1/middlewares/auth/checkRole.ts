import { Request, Response, NextFunction } from 'express';
import { Role } from '../../types/auth/JWTPayload';
import { CustomError } from '../../responses/customError';
import { DBConnectionHandler } from '../../../../DBConnection/FestivalsDatabase/DBConnectionHandler';

export const checkRole = (roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.jwtPayload;

    if (roles.indexOf(role) === -1) {
      const errors = [
        'Unauthorized - Insufficient user rights',
        `Current role: ${role}. Required role: ${roles.toString()}`,
      ];

      const customError = new CustomError(401, 'Unauthorized', 'Unauthorized - Insufficient user rights', errors);
      return next(customError);
    }

    switch(role) {
      case 'ADMIN':
        req.pool =  DBConnectionHandler.getInstance().getAdminPoolConnection;
      case 'BASIC':
        req.pool =  DBConnectionHandler.getInstance().getBasicPoolConnection;
      case 'NOAUTH':
        req.pool = DBConnectionHandler.getInstance().getNoAuthPoolConnection;
    }
    return next();
  };
};
