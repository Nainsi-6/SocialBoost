'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface YouTubeVideoProps {
  /** YouTube video URL (standard or shortened e.g. youtu.be) */
  url?: string
  /** Raw iframe code from YouTube share menu */
  iframeCode?: string
  /** Optional heading to display above the video */
  heading?: string
  /** Additional CSS classes for the container */
  className?: string
}

/**
 * A responsive, premium YouTube video component.
 * Supports both direct links and iframe snippets.
 */
export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  url,
  iframeCode,
  heading,
  className,
}) => {
  // Logic to extract video ID and create embed URL if url is provided
  const getEmbedUrl = (videoUrl: string) => {
    try {
      const urlObj = new URL(videoUrl)
      let videoId = ''
      
      if (urlObj.hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || ''
        // Handle short links inside youtube.com (rare but possible)
        if (!videoId) {
            if (urlObj.pathname.startsWith('/embed/')) {
                videoId = urlObj.pathname.split('/')[2]
            } else if (urlObj.pathname.startsWith('/shorts/')) {
                videoId = urlObj.pathname.split('/')[2]
            }
        }
      } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1)
      }
      
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl
    } catch {
      // If it's just a video ID, return the embed URL
      if (videoUrl.length === 11 && !videoUrl.includes('/')) {
          return `https://www.youtube.com/embed/${videoUrl}`
      }
      return videoUrl
    }
  }

  const renderVideoContent = () => {
    if (iframeCode) {
      // Clean up iframe code if it has hardcoded width/height to make it responsive
      const cleanedCode = iframeCode
        .replace(/width="\d+"/, 'width="100%"')
        .replace(/height="\d+"/, 'height="100%"')
        .replace(/style="[^"]*"/, 'style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"')
      
      // Ensure it has basic styles if not present
      const finalCode = cleanedCode.includes('style') 
        ? cleanedCode 
        : cleanedCode.replace('<iframe', '<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"')

      return (
        <div 
          className="absolute inset-0 w-full h-full"
          dangerouslySetInnerHTML={{ __html: finalCode }} 
        />
      )
    }

    if (url) {
      return (
        <iframe
          src={getEmbedUrl(url)}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        />
      )
    }

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
        <p>No video source provided</p>
      </div>
    )
  }

  return (
    <div className={cn("w-full max-w-5xl mx-auto my-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700", className)}>
      {heading && (
        <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {heading}
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-red-600 to-rose-400 mt-2 rounded-full" />
        </div>
      )}
      
      <div className="group relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] hover:-translate-y-1 bg-white p-2 md:p-3">
        {/* The aspect ratio wrapper (16:9) */}
        <div className="relative w-full pt-[56.25%] bg-black rounded-lg md:rounded-[1.5rem] overflow-hidden shadow-inner">
            {renderVideoContent()}
        </div>
        
        {/* Glossy overlay effect on group-hover */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Decorative reflection/shadow */}
      <div className="mx-auto mt-4 w-[90%] h-6 bg-black/5 blur-2xl rounded-[100%]" />
    </div>
  )
}
