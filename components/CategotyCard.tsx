const images= [
    {
        url: "/./icon/samsung.png",
        Name: "Samsung"
    },
    {
        url: "/./icon/apple.png",
        Name: "Apple"
    },
    {
        url: "/./icon/honor.png",
        Name: "Honor"
    },
    {
        url: "/./icon/xiaomi.png",
        Name: "Xiaomi"
    }
]

export const CategoryCard: React.FC= () =>{
    return (
      <>
        {images.map((el, index) =>(
            <div key={index} className="size-36 bg-gray-100 rounded-2xl flex items-center px-5 cursor-pointer">
                <img src={el.url} alt={el.Name} />
            </div>
        ))}
      </>
    )
}