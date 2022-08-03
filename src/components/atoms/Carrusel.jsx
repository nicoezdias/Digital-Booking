import { Carousel } from "react-carousel-minimal";

function CarouselImages({ images, thumbnails }) {
  const objImages = []
  images && images.forEach(item => {
    objImages.push({
      image: item.url
    })
  })

  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#dfe4ea",
    position: "absolute",
    right: "0",
    bottom: "0"
  };
  return (
    <div className="carousel">
      <Carousel
        data={objImages}
        slideNumberStyle={slideNumberStyle}
        thumbnails={thumbnails}
        automatic={true}
        time={3000}
        slideNumber={true}
        width="100%"
        height="390px"
        radius="5px"
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnailWidth="5%"
        style={{
          textAlign: "center",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "40px auto",
        }}
      />
    </div>
  );
}

export default CarouselImages;