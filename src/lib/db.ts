import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ADMINS_FILE = path.join(DATA_DIR, "admins.json");

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  role_slug: string;
  roleSlug: string;
  user_type: string;
  permissions: string[];
  created_at: string;
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ADMINS_FILE)) {
    const defaultAdmins: AdminUser[] = [
      {
        id: 1,
        name: "Super Administrator",
        email: "admin@letscod.com",
        password: "admin",
        role: "admin",
        role_slug: "admin",
        roleSlug: "admin",
        user_type: "admin",
        permissions: ["*"],
        created_at: new Date().toISOString(),
      },
    ];
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(defaultAdmins, null, 2), "utf-8");
  }
}

export function getAllAdmins(): AdminUser[] {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(ADMINS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function findAdminByEmail(email: string): AdminUser | undefined {
  const admins = getAllAdmins();
  return admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}

export function findAdminById(id: number): AdminUser | undefined {
  const admins = getAllAdmins();
  return admins.find((a) => a.id === id);
}

export function saveAdmin(data: {
  name: string;
  email: string;
  password: string;
  role?: string;
}): AdminUser {
  ensureDataFile();
  const admins = getAllAdmins();
  const existing = admins.find(
    (a) => a.email.toLowerCase() === data.email.toLowerCase()
  );
  if (existing) {
    throw new Error("Admin user with this email already exists");
  }

  const roleName = data.role || "admin";
  const newAdmin: AdminUser = {
    id: admins.length > 0 ? Math.max(...admins.map((a) => a.id)) + 1 : 1,
    name: data.name,
    email: data.email,
    password: data.password,
    role: roleName,
    role_slug: roleName,
    roleSlug: roleName,
    user_type: "admin",
    permissions: ["*"],
    created_at: new Date().toISOString(),
  };

  admins.push(newAdmin);
  fs.writeFileSync(ADMINS_FILE, JSON.stringify(admins, null, 2), "utf-8");
  return newAdmin;
}
