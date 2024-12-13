interface IChildren{
    children: React.ReactNode | React.JSX.Element | React.JSX.Element[]
}
interface IPageParams<T= { slug: string }>{
    params: Promise<T>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}