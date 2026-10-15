import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { db, AdminUser } from './db';

// Strong fallback secret with environment override
const JWT_SECRET = process.env.JWT_SECRET || 'sweet_bakery_super_secret_jwt_key_2026_xyz';
const TOKEN_EXPIRY = '24h';

export interface AuthPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  adminUser?: AuthPayload;
}

// Initialize default admin user if none exists
export function initializeAdminAuth() {
  const existingAdmins = db.getAdminUsers();
  if (existingAdmins.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync('SweetBakery2026!', salt);

    const defaultAdmin: AdminUser = {
      id: 'admin-1',
      email: 'admin@sweetbakery.id',
      name: 'Adit (Tim Dapur Sweet Bakery)',
      role: 'superadmin',
      passwordHash,
      createdAt: new Date().toISOString()
    };

    db.saveAdminUsers([defaultAdmin]);
    console.log('[AUTH] Admin default terinisialisasi: admin@sweetbakery.id');
  }
}

// Generate JWT token
export function generateAdminToken(user: AdminUser): string {
  const payload: AuthPayload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// Verify JWT token
export function verifyAdminToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch (err) {
    return null;
  }
}

// Express Middleware: Protect admin routes
export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.query.token && typeof req.query.token === 'string') {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak: Anda harus login sebagai admin untuk mengakses data ini.'
    });
  }

  const payload = verifyAdminToken(token);

  if (!payload) {
    return res.status(401).json({
      success: false,
      message: 'Sesi login telah kedaluwarsa atau tidak valid. Silakan login kembali.'
    });
  }

  req.adminUser = payload;
  next();
}
