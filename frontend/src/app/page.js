'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth-hook'
import { useTheme } from '@/contexts/theme-context'

export default function Login() {
    const { signin, error, isAuthenticated } = useAuth()
    const { handleCheck, checked } = useTheme()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const pass = document.getElementById('password').value;

        if (await signin({
            email: email,
            password: pass
        })) router.push('/dashboard')
    }

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/dashboard')
        }
    }, [])

    return (
        <main>
            <div className='w-full h-12 dark:bg-gray-900 bg-white p-6'>
                <label className="inline-flex items-center cursor-pointer mx-4 p-2 border border-gray-500 dark:border-gray-700 rounded-lg">
                    <input type="checkbox" className="sr-only peer" onChange={handleCheck} checked={checked} />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
                        peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                        after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Modo oscuro</span>
                </label>
            </div>
            <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 bg-white">
                <div className='flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border shadow-2xl rounded-2xl
                border-gray-700 bg-gray-50 dark:border-gray-800 dark:bg-gray-800'>

                    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center px-8'>
                        <span className='text-4xl text-black dark:text-white mt-14 mb-10'>Inicia Sesión</span>
                        <div className="w-11/12 flex flex-col text-black dark:text-white mb-5">
                            <label htmlFor="email" className="w-full text-lg ms-1 mb-1">Email</label>
                            <input type="email" id="email" required
                                className="w-full h-12 text-xl text-center rounded-lg border bg-white border-gray-800 dark:bg-gray-800 dark:border-white" />
                        </div>

                        <div className="w-11/12 flex flex-col text-black dark:text-white mb-8">
                            <label htmlFor="password" className="w-full text-lg ms-1 mb-1">Contraseña</label>
                            <input type="password" id="password" required
                                className="w-full h-12 text-xl text-center rounded-lg border bg-white border-gray-800 dark:bg-gray-800 dark:border-white" />
                        </div>

                        <div className="w-11/12 mb-8">
                            <button type="submit"
                                className="w-full h-14 bg-transparent font-semibold border hover:border-transparent rounded active:scale-[98%]
                                hover:bg-blue-700 text-blue-700 hover:text-white  border-blue-700 dark:text-white">
                                Iniciar sesión
                            </button>
                        </div>

                        <p className='mb-8 text-black dark:text-white'>¿No tienes una cuenta? <a href='/register' className='text-green-700'>crea una cuenta</a></p>

                        {(error !== '' ? (<p className='text-red-800 mb-8'>{error}</p>) : undefined )}

                    </form>
                </div>
            </div>
        </main>
    );
}
