import { buttonVariants } from '@/components/ui/button'
import PlaylistSkeleton from '@/components/ui/PlaylistSkeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useMusicStore } from '@/stores/useMusicStore'
import { useUser } from '@clerk/clerk-react'

import { Album,  HomeIcon, Library } from 'lucide-react'
import { useEffect } from 'react'

import { Link } from 'react-router-dom'

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const { user } = useUser();
  useEffect(() => {
    fetchAlbums();

  }, [fetchAlbums]);
  if (!user) {
    return (
      <div className="h-full rounded-lg bg-zinc-900">
        <LoginPrompt />
      </div>
    );
  }
  return (
    <div className=' h-full  flex flex-col gap-2'>
      {/*navigation menu*/}
      <div className='rounded-lg bg-zinc-900 p-4'>



        {/*home*/}
        <div className='space-y-2 '>
          <Link to={'/'}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white",
              })
            )}

          >
            <HomeIcon className='mr-2 size-5' />
            <span className='hidden md:inline'>Home</span>
          </Link>


        </div>
      </div>
      <div className=' h-full rounded-lg bg-zinc-900 p-4 overflow-hidden'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center text-white px-2'>
            <Library className='size-5 mr-2' />
            <span className='hidden md:inline'>PlayLists</span>
          </div>
        </div>
        <ScrollArea className='h-[calc(100vh-300px)]'>
          <div className='space-y-2'>
            {
              isLoading ? (<PlaylistSkeleton />) : (
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'>
                    <img
                      src={album.imageUrl}
                      alt='PlayList img'
                      className='size-12 rounded-md shrink-0 object-cover' />

                    <div className='flex-1 min-w-0 hidden md:block'>
                      <p className='font-medium truncate'>{album.title}</p>
                      <p className='text-sm text-zinc-400 truncate'>Album •     {album.artist}</p>
                    </div>

                  </Link>
                ))

              )
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default LeftSidebar

const LoginPrompt = () => (
  <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
    <div className='relative'>
      <div
        className='absolute -inset-1 bg-linear-to-r from-purple-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
        aria-hidden='true'
      />
      <div className='relative bg-zinc-900 rounded-full p-4'>
        <Album className='size-8 text-teal-400' />
      </div>
    </div>

    <div className="space-y-2 max-w-xs">
      <h3 className="text-lg font-semibold text-white">
      Login to Access 
      </h3>
      <h4 className="hidden sm:block text-sm text-zinc-300">
        Explore albums, playlists, and enjoy your favorite tracks.
      </h4>
    </div>
  </div>
);