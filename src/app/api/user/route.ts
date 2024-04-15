import { NextResponse } from 'next/server'
import * as jose from 'jose'
import type { NextRequest } from 'next/server'
import connectMongo from '@/app/db/database'
import User from '@/app/db/schema'

export interface UserRequest extends NextRequest {
  token: any
}

export async function GET(req: UserRequest) {
  const token = req.cookies.get('token')
  console.log({ token })

  try {
    if (token) {
      console.log('WILL Connect to Mongo')
      await connectMongo()
      console.log('WILL Decode', process.env.JWT_SECRET_TOKEN)
      const decode = await jose.jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET_TOKEN as string)
      )
      console.log('Get user decode', { decode })
      const { _id }: string | any = decode.payload.user
      console.log('Get user ID', { _id })
      const user = await User.findOne({ _id: _id })
      return NextResponse.json(user)
    } else {
      return NextResponse.json({ error: 'Unauthorized' })
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unauthorized' })
  }
}
