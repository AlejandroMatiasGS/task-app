import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

export function middleware(req) {
  let user

  try {
    const userCookie = req.cookies.get('user').value
    const decryptedCookie = CryptoJS.AES.decrypt(userCookie, process.env.NEXT_PUBLIC_SECRET_KEY)
    user = JSON.parse(decryptedCookie.toString(CryptoJS.enc.Utf8))
  } catch (e) { user = undefined }

  if (!user) return NextResponse.redirect(new URL('/', req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};