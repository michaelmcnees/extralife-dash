'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { BookmarkIcon } from '@heroicons/react/24/solid'
import { ClipboardIcon } from '@heroicons/react/24/outline'

import Card from './card'
import resources from '@/data/resources.json'
import { Button } from '@/components/ui/button'

export const QuickResources = () => {
  return (
    <Card title='Quick Resources' icon={<BookmarkIcon />}>
      <ol className='divide-y'>
        {resources.map(r => (
          <li key={r.name} className='flex justify-between py-2'>
            <div>
              <Link href={r.url} target='_blank' rel='noreferrer' className='font-semibold'>
                {r.name}
              </Link>
              <p className='text-xs text-primary'>{r.subtitle}</p>
            </div>
            <Button
              size='icon'
              onClick={() => {
                if (r.url.length > 0) {
                  navigator.clipboard.writeText(r.url)
                  toast.success(`Copied ${r.name} to clipboard!`)
                } else {
                  toast.error(`No URL found for ${r.name}`)
                }
              }}>
              <span className='sr-only'>Copy link</span>
              <ClipboardIcon className='h-4 w-4' aria-hidden='true' />
            </Button>
          </li>
        ))}
      </ol>
    </Card>
  )
}
