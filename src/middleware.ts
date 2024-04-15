import * as jose from 'jose'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export interface UserRequest extends NextRequest {
  token: any
}

export async function middleware(req: UserRequest) {
  const token = req.cookies.get('token')

  console.log('Middleware', { token })

  try {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' })
    } else {
      console.log('WILL Decode')
      console.log('JWT_SECRET_TOKEN', process.env.JWT_SECRET_TOKEN)
      const decode = await jose.jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string)
      )

      console.log('Decode', decode)

      if (decode) {
        console.log('next')
        return NextResponse.next()
      } else {
        return NextResponse.json({ error: 'Unauthorized' })
      }
    }
  } catch (error) {
    console.log('Error', error)

    return NextResponse.json({ error: 'Unauthorized' })
  }
}
export const config = {
  matcher: ['/api/user'],
}
