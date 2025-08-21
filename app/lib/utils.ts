import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Obtiene la IP real del usuario desde la request
 * Maneja casos de proxy, load balancer, etc.
 */
export function getClientIP(request: Request): string {
  // Intentar obtener IP de headers comunes de proxy
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for puede contener múltiples IPs, tomar la primera
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback para desarrollo local
  return "127.0.0.1";
}

/**
 * Verifica si una IP está en la lista de IPs permitidas (para desarrollo)
 */
export function isAllowedIP(ip: string): boolean {
  // Para testing: NO permitir ninguna IP (ni siquiera localhost)
  return false;

  // O si quieres ser más específico:
  // return false; // Esto forzará el rate limiting para TODAS las IPs
}
