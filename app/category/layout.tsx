import SideBar from "@/components/SideBar";
import "../globals.css";

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="flex gap-x-5">
            <div className="w-[20%] h-96 border"><SideBar/></div>
            <div className="w-[80%]">{children}</div>
        </div>
    )
}