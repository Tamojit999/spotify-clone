import { Button } from '@/components/ui/button';
import SectionGridSkeleton from '@/components/ui/SectionGridSkeleton';
import type { Song } from '@/type'
import React from 'react'
import PlayButton from './PlayButton';
type SectionGrid={
    title:string;
    songs:Song[];
    isLoading:boolean;
}
const SectionGrid = ({title,songs,isLoading}:SectionGrid) => {
    if(isLoading)return <SectionGridSkeleton/> 
  return (
    <div className='mb-8'>
        <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
            <Button variant='link' className='text-sm text-zinc-400 hover:text-white'>Show all</Button>
        </div>
        <div  className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap '>
             {songs.map((song)=>(
                <div key={song._id} className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'>
                    <div className='relative mb-4'>
                        <div className='aspect-spuare rounded-md shadow-lg overflow-hidden '>
                            <img src={song.imageUrl} alt={song.title}
                            className=' object-cover transition-transform duration-300 h-full w-full
							group-hover:scale-105 ' />

                        </div>
                        <PlayButton song={song}/>
                    </div>
                    <h3 className='font-medium mb-2 truncate'>{song.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
                </div>

             ))}
        </div>




    </div>
  )
}

export default SectionGrid