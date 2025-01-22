import medinaLogo from '../assets/medinaLogo.jpg'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { ArrowCircleRight } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function Home() {
    const navigate = useNavigate();
    const [isAnimating, setIsAnimating] = useState(false)



    const handleButtonClick = () => {
        setIsAnimating(true)
        setTimeout(() => {
            navigate('/main')
        }, 1000)
    }

    return (
        <div className="h-screen w-screen bg-slate-950 overflow-hidden flex items-center justify-center">
            <motion.div key="modal" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }}>
                <main className="flex flex-col items-center justify-center gap-8 pb-20">
                    <img src={medinaLogo} alt="Medina Logo" className="h-32 w-32 rounded-lg" />
                    <div className="flex flex-col items-center gap-4">
                        <h2 className="text-3xl text-slate-200 font-bold">Bem-vindo ao MedinaConsultancy</h2>
                        <p className="text-slate-200 text-center opacity-11">O seu parceiro de negócios para a transformação digital</p>
                    </div>
                    <Button className='p-6 mt-6 bg-slate-900 font-bold items-center' onClick={handleButtonClick}>Vamos lá <ArrowCircleRight size={32} /></Button>
                </main>
            </motion.div>
            {isAnimating && (
                <motion.div
                    className="fixed top-0 left-0 w-full h-full bg-slate-950"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                />
            )}
        </div>
    )
}