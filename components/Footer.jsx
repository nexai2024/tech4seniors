export default function Footer(){
    return (
        <footer className="bg-gray-900 text-white py-8 px-6 md:px-12 mt-12">
          <div className="container mx-auto text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Tech4Seniors. All rights reserved.</p>
            <p className="mt-2">Empowering Seniors with Technology, One Step at a Time.</p>
          </div>
        </footer>
    )
}