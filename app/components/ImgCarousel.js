import React from "react"
import Carousel from "react-material-ui-carousel"

function ImgCarousel({ images }) {
  return (
    <Carousel
      sx={{ width: "100%", padding: 0, margin: 0 }}
      //   navButtonsAlwaysVisible={true}
      indicators={true}
    >
      {images.map((item, i) => (
        <img key={i} width={"100%"} src={item} alt="shoe carousel imgs" />
      ))}
    </Carousel>
  )
}

export default ImgCarousel
