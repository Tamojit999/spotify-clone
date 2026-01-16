import { useMusicStore } from "@/stores/useMusicStore";
import TopBar from "../../components/ui/TopBar";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import SectionGrid from "./components/SectionGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePlayerStore } from "@/stores/usePlayerStore";
const HomePage = () => {
  const {fetchFeaturedSongs,isLoading,fetchTrendingSongs,fetchMadeForSongs,featuredSong,trendingSong,madeForSong}=useMusicStore();

  const {initializeQueue}=usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForSongs();
  },[fetchFeaturedSongs,fetchTrendingSongs,fetchMadeForSongs]);


  useEffect(()=>{
	if(madeForSong.length>0 && featuredSong.length>0 && trendingSong.length>0)
	{
		const allSongs=[...featuredSong,...trendingSong,...madeForSong];
		initializeQueue(allSongs);
	}

  },[initializeQueue,madeForSong,featuredSong,trendingSong]);
  return (
    <main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<TopBar />
			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
					<FeaturedSection />

					<div className='space-y-8'>
						<SectionGrid title='Made For You' songs={madeForSong} isLoading={isLoading} />
						<SectionGrid title='Trending' songs={trendingSong} isLoading={isLoading} />
					</div>
				</div>
			</ScrollArea>
		</main>
  )
}
export default HomePage