import getLength from "../../getLength";

function Track({track, num, hide}) {

    return(
        <div className="track" style={{display: hide ? "none" : "flex"}}>
            <div id="num">{num}</div>
            <img id="img" src={track.album.images[0].url}></img>
            <div id="trackname">{track.name}</div>
            <div id="tracklength">{getLength(track)}</div>
        </div>
    )
}

export default Track;