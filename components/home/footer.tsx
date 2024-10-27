export default function Footer(){
    return(
        <footer className="bg-gray-200/20 flex flex-col items-center h-20 mb-2 pt-6 px-12 z-20 relative overflow-hidden">
            <p className="text-md">All Rights Reserved, {new Date().getFullYear()}</p>
            <a href="https://x.com/@kirtirajThakor" className="text-xl text-indigo-500 font-semibold" target="_blank">Built by Kirtiraj</a>
        </footer>
    )
}