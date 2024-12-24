const images= [
    {
        url: "/./icon/samsung.png",
        name: "Samsung"
    },
    {
        url: "/./icon/apple.png",
        name: "Apple"
    },
    {
        url: "/./icon/honor.png",
        name: "Honor"
    },
    {
        url: "/./icon/xiaomi.png",
        name: "Xiaomi"
    }
]

export const CategoryCard: React.FC= () =>{
    return (
      <>
        {images.map((image, index) =>(
            <div key={index} className="size-36 bg-gray-100 rounded-2xl flex items-center px-5 cursor-pointer">
                <img src={image.url} alt={image.name} />
            </div>
        ))}
      </>
    )
}