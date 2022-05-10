import { useColor } from "color-thief-react";



function FadeColor({ data }) {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.6) 0,#121212 100%), ${data}`,
      }}
      className="backgroundcolor"
    >
      &#8203;
    </div>
  );
}

export const useGetColor = (src) => {
  console.log(src)
  const { data } = useColor(src, "rgbString", {
    crossOrigin: "anonymous",
    quality: "1000",
  });
  console.log(data)
  return data
}

export default FadeColor;
