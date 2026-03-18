'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { YouTubeVideo } from './YouTubeVideo'

interface YouTubeModalProps {
  url: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title?: string
}

export function YouTubeModal({
  url,
  isOpen,
  onOpenChange,
  title = "Video Guide"
}: YouTubeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full aspect-video">
          <YouTubeVideo 
            url={url} 
            autoplay={true}
            minimal={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
