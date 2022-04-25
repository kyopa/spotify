import { useState } from "react";
import { useEffect } from "react";
import useArtists from "./useArtists";
import blackImg from "../../extra/blackImage.webp"
import { useMemo } from "react";


function Row({array, album}) {

    return (
        <div>
            <div className="item-row">
               {array && (
                   array.length > 1 ? array.map(item => {
                       return (
                           <Item key={crypto.randomUUID()}
                            album={album} item={item} 
                            artist={item.type === "artist"
                           ? true : false}/>
                       )
                   }) :  <h2>hello</h2>
               )}
           </div>

            
        </div>
    )
}

function Item({item, artist, album}) {
    

    const img = useMemo(() => {
        if (!item) return

        if (item.images === undefined || item.images.length === 0) {
            return blackImg
        } else return item.images[0].url
    })

    return (
        <div className="item-details">


            <img className={album === true ? "album" : ""} src={img} ></img>

            
            
            <div className="item-name">{item.name}</div>
            {artist && (
                <div className="type">Artist</div>
            )}
            {!artist && (<div className="album-details">
                <span>{item.release_date.substring(0, 4)}</span> <span id="dot">  • </span> 
                {item.artists.map((artist, index) => {
                    return (
                         <span key={crypto.randomUUID()}>
                            {index !== item.artists.length - 1 ? (
                                <a > {artist.name}, </a>
                            ): <a > {artist.name}</a>}
                            
                        </span>
                    )
                })}
                </div>
            )}
        </div>
    )
}

export default Row;