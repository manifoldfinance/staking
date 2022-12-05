
import Image from 'next/image'
import foldlogo from '../public/foldlogo.png'

export default function Footer() {
    return (
        <>
            <hr className='border mt-[160px] border-gray-800' />
            <footer className=" ring-fresh sm:p-6 md:w-[720px] mx-auto px-3 dark:bg-gray-900">
    <div className="md:flex pb-8 md:pb-0 md:justify-between">
        <div className="mb-6 md:mb-0 text-sm font-proxima justify-center font-semibold">
            <a href="https://manifoldfinance.com/" className="items-center">
                <Image src={foldlogo} className="mr-3 h-8" alt="Manifold logo" />
                    </a>
                    <p className=''>
                    <span className='text-almostwhite brightness-50'>Copyright 2022 </span> <br />
                    Manifold Finance, Inc..
                    </p>
        </div>
        <div className="grid sm:gap-6 md:space-x-2 space-x-3 text-xs font-semibold grid-cols-3">
            <div>
                <h2 className="mb-3 text-xs font-bold uppercase dark:text-white">Resources</h2>
                <ul className="text-almostwhite space-y-3 brightness-50">
                    <li>
                        <a href="https://kb.manifoldfinance.com/" className="hover:underline ">Documentation</a>
                    </li>
                    <li>
                        <a href="https://manifoldfinance.github.io/primitives/" className="hover:underline">Blog</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-3 text-xs font-bold uppercase dark:text-white">Community</h2>
                <ul className="text-almostwhite space-y-3 brightness-50 ">
                    <li>
                        <a href="https://github.com/manifoldfinance" className="hover:underline">GitHub</a>
                    </li>
                                 <li>
                        <a href="https://twitter.com/foldfinance" className="hover:underline">Twitter</a>
                    </li>
                    <li>
                        <a href="https://t.me/manifoldfinance" className="hover:underline">Telegram</a>
                    </li>
                </ul>
            </div>
            <div>
                <h2 className="mb-3 text-xs font-bold uppercase dark:text-white">Contact</h2>
                <ul className="text-almostwhite brightness-50 space-y-3">
                    <li>
                        <a href="https://github.com/manifoldfinance/support" className="hover:underline">Helpdesk</a>
                    </li>
                    <li>
                        <a href="https://notionforms.io/forms/46b2a6bb-ac53-467c-ac3d-73623986c74f" className="hover:underline">Partner Inquiry</a>
                        </li>
                     <li>
                        <a href="https://forums.manifoldfinance.com/" className="hover:underline">Forums</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
            </footer>
            </>
    )
    
}