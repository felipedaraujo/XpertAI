import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import User from '@/app/db/schema'

interface TextCheckRequests {
  text: string
  language: string
  _id: string
}
interface Expert {
  id: string
  job: string
  instructions: string
}

export async function POST(req: Request) {
  const { text, language, _id }: TextCheckRequests = await req.json()
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_SECRET_KEY,
  })

  const experts: Expert[] = [
    {
      id: 'helicopter-pilot',
      job: 'Helicopter Pilot',
      instructions:
        'Assist the Helicopter Pilot by providing real-time weather updates, flight path suggestions, and airspace information to ensure safe and efficient operations. Offer technical manuals and emergency procedure guides as needed.',
    },
    {
      id: 'helicopter-copilot',
      job: 'Helicopter Co-Pilot',
      instructions:
        'Support the Helicopter Co-Pilot by delivering checklists for pre-flight, in-flight, and post-flight procedures. Provide navigational assistance and facilitate communication with ground control, enhancing overall mission effectiveness.',
    },
    {
      id: 'aircraft-loadmaster',
      job: 'Aircraft Loadmaster',
      instructions:
        'Help the Aircraft Loadmaster by calculating weight distribution and balance for aircraft loads. Provide guidelines for securing cargo and accessing loading equipment manuals, ensuring adherence to safety regulations.',
    },
  ]

  const prompt = `Review the purchase contract below and provide feedback from military experts' point of view. Expert's feedback must flag potential issues and provide recommendations for improvement or approval. Group the feedback by expert's job title.
  <purchase contract>
  ${text}
  </purchase contract>
  <experts>
  ${experts
    .map(
      (expert) => `Expert: ${expert.job} Description: ${expert.instructions}`
    )
    .join('')}
  </experts>`

  const user = await User.findOne({ _id: _id })

  if (user.plan == 'free') {
    if (user.prompts <= 1000) {
      if (text) {
        await User.findByIdAndUpdate(
          { _id: _id },
          { prompts: user.prompts + 1 }
        )

        const responseGrammar = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            {
              role: 'user',
              content: `${text}`,
            },
          ],
          temperature: 0,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })
        if (responseGrammar.choices[0].message?.content == text) {
          return NextResponse.json({
            success: {
              correct: true,
              text: responseGrammar.choices[0].message?.content,
            },
          })
        } else {
          return NextResponse.json({
            success: {
              correct: false,
              text: responseGrammar.choices[0].message?.content,
            },
          })
        }
      } else {
        return NextResponse.json({ error: 'No content' })
      }
    } else {
      return NextResponse.json({ error: 'You used your free plan ai prompts' })
    }
  }

  if (user.plan == 'premium') {
    if (user.prompts <= 10000) {
      if (text) {
        await User.findByIdAndUpdate(
          { _id: _id },
          { prompts: user.prompts + 1 }
        )
        const responseGrammar = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            {
              role: 'user',
              content: `${text}`,
            },
          ],
          temperature: 0,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })

        if (responseGrammar.choices[0].message?.content == text) {
          return NextResponse.json({
            success: {
              correct: true,
              text: responseGrammar.choices[0].message?.content,
            },
          })
        } else {
          return NextResponse.json({
            success: {
              correct: false,
              text: responseGrammar.choices[0].message?.content,
            },
          })
        }
      } else {
        return NextResponse.json({ error: 'No content' })
      }
    } else {
      return NextResponse.json({
        error: 'You used your premium plan ai prompts',
      })
    }
  }

  if (user.plan == 'business') {
    if (user.prompts <= 20000) {
      if (text) {
        await User.findByIdAndUpdate(
          { _id: _id },
          { prompts: user.prompts + 1 }
        )

        const responseGrammar = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: prompt,
            },
            {
              role: 'user',
              content: `${text}`,
            },
          ],
          temperature: 0,
          // max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        })

        if (responseGrammar.choices[0].message?.content == text) {
          return NextResponse.json({
            success: {
              correct: true,
              text: responseGrammar.choices[0].message?.content,
            },
          })
        } else {
          return NextResponse.json({
            success: {
              correct: false,
              text: responseGrammar.choices[0].message?.content,
            },
          })
        }
      } else {
        return NextResponse.json({ error: 'No content' })
      }
    } else {
      return NextResponse.json({
        error: 'You used your business plan ai prompts',
      })
    }
  }
}
