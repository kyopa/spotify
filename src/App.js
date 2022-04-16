import { useEffect, useState } from "react";



function App() {


  const [token, setToken] = useState()



  const client_id = "de8735e4e92a4bbe8bb99948f6dfbb1d"
  const client_secret = "7a1e27603bd84785a7d5b3465a5cbfe1"

  

  useEffect(() => {
    fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        "Authorization": `Basic ` + window.btoa(`${client_id}:${client_secret}`),
        "Content-Type": "application/x-www-form-urlencoded"
      },
    })
    .then(data => data.json())
    .then(res => {
      fetch("https://api.spotify.com/v1/search?q=travis scott&type=track%2Cartist%2Calbum%2Cplaylist%2Cshow%2Cepisode", {
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${res.access_token}`,
          "Content-Type": "application/json"
        }
      })
      .then(data => data.json())
      .then(res => console.log(res))
    })


  })
  
  return (
    <div>
      hello wrod
    </div>
  )
}



export default App;
