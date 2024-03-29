'use server'

import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function getSegments() {
  const segments = await prisma.segment.findMany()

  revalidatePath('/admin/schedule')
  return segments
}

export async function createSegment(prevState: any, formData: FormData) {
  await prisma.segment.create({
    data: {
      title: String(formData.get('title')),
      startsAt: String(formData.get('startsAt')),
      duration: Number(formData.get('duration'))
    }
  })

  revalidatePath('/admin/schedule')
  redirect('/admin/schedule')
}

export async function deleteSegment(formData: FormData) {
  const id = String(formData.get('id'))

  await prisma.segment.delete({
    where: {
      id
    }
  })

  revalidatePath('/admin/schedule')
  redirect('/admin/schedule')
}
