import { useRecoilValue } from "recoil"
import { artistItemsState } from "../../recoil/selectors"
import Row from "../Row";


function Similar() {
    const similar = useRecoilValue(artistItemsState("relatedArtists"))
    if (!similar.artists) return
    return (
        <div className="similar-container">
            <h2>Fans Also Like</h2>

            <div className="artists">
                <Row array={similar.artists}/>

            </div>
        </div>

    )
}

export default Similar;