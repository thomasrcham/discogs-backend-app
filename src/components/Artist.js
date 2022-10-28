import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Artist() {
  const [artistArray, setArtistArray] = useState(null);
  const [albumArray, setAlbumArray] = useState(null);
  const [artistDetails, setArtistDetails] = useState(null);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    console.log("fetch");
    fetch(`http://localhost:9292/artists/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setArtistArray(d);
        console.log(d);
      })
      .then(
        fetch(`http://localhost:9292/artistAlbum/${id}`)
          .then((r) => r.json())
          .then((d) => {
            setAlbumArray(d);
            console.log(d);
          })
      )
      .then(
        fetch(`http://localhost:9292/artistInfo/${id}`)
          .then((r) => r.json())
          .then((d) => {
            setArtistDetails(d);
            console.log(d);
          })
      );
  }, []);

  let artistName = artistDetails
    ? artistDetails.name.charAt(artistDetails.name.length - 3) === "("
      ? artistDetails.name.substring(0, artistDetails.name.length - 4)
      : artistDetails.name
    : null;

  let artistDisplay = artistDetails ? (
    <div class="card artist-info border-secondary" style={{ width: "30rem" }}>
      <div class="card-body">
        <h3 class="card-title">{artistName}</h3>
        <p class="card-text">{artistDetails.profile}</p>
        <a
          href={artistDetails.uri}
          target="_blank"
          class="card-link"
          rel="noreferrer"
        >
          Discogs Link
        </a>
      </div>
    </div>
  ) : null;

  let albumDisplay = albumArray
    ? albumArray.map((a) => (
        <div
          class="card card border-secondary"
          style={{ width: "18rem" }}
          key={a.id}
        >
          <span
            onClick={() => {
              navigate(`/albums/${a.id}`);
            }}
            className=""
          >
            <img
              src={a.cover_image}
              class="card-img-top album-image"
              alt={a.name}
            />
          </span>
          <div class="card-body">
            <span
              onClick={() => {
                navigate(`/albums/${a.id}`);
              }}
            >
              <h5 class="card-title album-name">{a.name}</h5>
            </span>

            <div class="card-text">
              <span>Released in: {a.year}</span>
              <br />
              <span
                class="listens-text"
                onClick={() => navigate(`/albums/${a.id}`)}
              >
                Go to Album Page
              </span>
            </div>
          </div>
        </div>
      ))
    : null;

  return (
    <>
      <div className="artist-row">{artistDisplay}</div>
      <div className="most-listens-window">{albumDisplay}</div>
    </>
  );
}
export default Artist;
