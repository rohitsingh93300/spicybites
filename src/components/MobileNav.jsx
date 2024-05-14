import { SheetContent, Sheet, SheetTrigger } from '../components/ui/sheet'
import { AlignJustify } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger aschild>
                <AlignJustify className='cursor-pointer' />
            </SheetTrigger>
            <SheetContent>
                <div className='flex flex-col items-center justify-between h-full py-8'>
                    <div className='flex flex-col items-center gap-y-32'>
                        <Link href="/" className="text-primary font-semibold flex gap-1">
                            <Image src={'/chili-pepper.png'} width={24} height={24} />
                            <div className='text-red-500'>
                                Spicy
                                <span className="text-gray-800 font-semibold">Bites</span>
                            </div>
                        </Link>
                        <nav className="flex flex-col items-center gap-y-6 text-gray-500 font-semibold">
                            {/* <Link href={'/'}>Home</Link> */}
                            <Link href={'/'}>Menu</Link>
                            <Link href={'/'}>About</Link>
                            <Link href={'/'}>Contact</Link>
                            <Link href={'/login'} className="" >Login</Link>
                            <Link href={'/register'} className="bg-red-500 rounded-full text-white px-4 py-2">Register</Link>
                        </nav>
                    </div>
                    {/* <Socials containerStyles='flex  gap-x-4' iconsStyles='text-2xl' /> */}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav