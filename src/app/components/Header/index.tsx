'use client';

import Image from 'next/image';
import Link from 'next/link';
import IconButton from '../IconButton';
import { usePathname } from 'next/navigation';

export default function Header() {
    const path = usePathname();
    const manuBarItems = [
        {
            name: 'Recursos',
            href: '/',
            icon: 'recursos',
        },
        {
            name: 'Adicionar Recurso',
            href: '/addRecurso',
            icon: 'add-recurso',
        },
    ];
    return (
        <div
            className='flex flex-col md:flex-row px-14 py-5 w-full z-10 h-fit max-h-15 rounded-2xl bg-white/30 justify-center md:justify-between content-center gap-4 mb-2'
            data-testid="menu-bar"
        >
                <Image
                    className=" self-center pt-1"
                    src='/icons/logo-sme-files.svg'
                    alt="SME Files"
                    data-testid="button-icon"
                    width={220}
                    height={100}
                />
                <ul
                    className='flex gap-1 md:gap-5 flex-wrap justify-center'
                >
                    {manuBarItems.map((item, index) => (
                        <li key={item.name} className='flex h-auto self-center flex-wrap'>
                            <Link href={item.href}>
                                <IconButton
                                    state={path === item.href ? 'active' : 'default'}
                                    darkmode={false}
                                    icon={item.icon}
                                    label={item.name}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
    );

}
