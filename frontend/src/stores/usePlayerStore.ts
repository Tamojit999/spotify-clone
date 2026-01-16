import {create} from "zustand";
import type { Song } from "@/type";
interface PlayerStore{
    currentSong:Song|null; // song that is currently playing
    isPlaying:boolean; // true if the song is currently playing
    queue:Song[]; // list of songs
    currentindex:number; // index of the current song
    


    initializeQueue:(songs:Song[])=>void; // initialize the queue
    playAlbum: (songs: Song[], startIndex?: number) => void; // playing the song in the album
    setCurrentSong:(song:Song|null)=>void; // set the current song
    togglePlay:()=>void; // play and pause 
    playNext:()=>void; // switch to next song
    playPrevious:()=>void; // switch to the previous song

}
export const usePlayerStore=create<PlayerStore>((set,get)=>({
 currentSong:null,
 isPlaying:false,
 queue:[],
 currentindex:-1,
 initializeQueue:(songs:Song[])=>set({
    queue:songs,
    currentSong:get().currentSong || songs[0],
    currentindex:get().currentindex===-1?0:get().currentindex,
}),
 playAlbum:(songs:Song[],startIndex=0)=>{
    if(songs.length==0)return;
    const song=songs[startIndex];

    
    
    
    set({
        queue:songs,
        currentindex:startIndex,
        currentSong:song,
        isPlaying:true,
    });
 },
 setCurrentSong:(song:Song|null)=>{
    if(!song)return;
    const songIndex=get().queue.findIndex((s)=>s._id===song._id);
    set({
        currentSong:song,
        isPlaying:true,
        currentindex:songIndex,
    });
},
 togglePlay:()=>{
    const willStartPlaying=!get().isPlaying;
    set({isPlaying:willStartPlaying});
 },
 playNext:()=>
    {
        const nextIndex=get().currentindex+1;
        if(nextIndex < get().queue.length)
        {
            const nextSong=get().queue[nextIndex];
        
        set({currentSong:nextSong,currentindex:nextIndex,isPlaying:true});
            
        }
        else{
            set({isPlaying:false});
        }
        
    },
 playPrevious:()=>
    {
        const previousIndex=get().currentindex-1;
        if(previousIndex >= 0)
        {
            const previousSong=get().queue[previousIndex];
        
        set({currentSong:previousSong,currentindex:previousIndex,isPlaying:true});
            
        }
        else{
            set({isPlaying:false});
        }


    },
}));