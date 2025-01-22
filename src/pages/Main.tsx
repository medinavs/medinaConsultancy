import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { request } from "@/axios";
import { DataItem } from "./types";
import { CSVDownload } from "react-csv";

const schemaType = z.object({
    search: z.string().nonempty(),
    city: z.string().nonempty(),
})

type SchemaType = z.infer<typeof schemaType>


export function Main() {
    const { register, handleSubmit } = useForm<SchemaType>({
        resolver: zodResolver(schemaType),
    });

    const csvRef = useRef<any>(null)
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [data, setData] = useState<DataItem[]>([])

    function handleFormatDataToCSV(data: DataItem[]) {
        setCompleted(false)
        const formattedData: DataItem[] = data.map((item: DataItem) => {
            return {
                ...item,
                "Nome": item.name,
                "Endereço": item.formatted_address,
                "Número": item.formatted_phone_number,
                "Email": item.email,
                "Geometria": item.geometry,
            }
        })

        setData(formattedData)
        setCompleted(true)
    }

    const mutation = useMutation({
        mutationFn: async (data: SchemaType) => {
            setLoading(true);
            console.log(data)
            const response = await request.post("consultancy/search", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast({
                title: "Consulta realizada com sucesso!",
                description: "aqui estão seus dados!",
                action: <Button onClick={() => handleFormatDataToCSV(data)}>Exportar Dados</Button>,
            });
            setLoading(false);
        },
        onError: (error: any) => {
            toast({
                title: "Erro ao realizar a consulta",
                description: error.response?.data?.message || "Ocorreu um erro inesperado",
                duration: 5000,
            });
            setLoading(false);
        },
    });


    const onSubmit = (data: SchemaType) => {
        setLoading(true);
        mutation.mutate(data);
    };

    return (
        <div className="h-screen w-screen bg-slate-950 overflow-hidden flex items-center justify-center">
            <motion.div key="modal" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 2 } }}>
                <main className="flex flex-col items-center justify-center gap-8 pb-20">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
                        <div className="grid w-full max-w-sm items-center gap-2.5" >
                            <Label className="text-slate-200">De que cidade deseja consultar?</Label>
                            <Input
                                placeholder="Digite algo..."
                                className="bg-black outline-none border-none focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 text-slate-200"
                                style={{ '--tw-ring-offset-color': 'transparent' } as React.CSSProperties}
                                {...register('city')}
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2.5" >
                            <Label className="text-slate-200">Qual tipo de informação deseja consultar?</Label>
                            <Input
                                placeholder="Digite algo..."
                                className="bg-black outline-none border-none focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 text-slate-200"
                                style={{ '--tw-ring-offset-color': 'transparent' } as React.CSSProperties}
                                {...register('search')}
                            />
                        </div>
                        <Button
                            className={`p-6 mt-2 bg-slate-900 font-bold items-center flex ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    Consultando
                                    <span className="flex gap-0.5">
                                        <span className="animate-jump [animation-delay:200ms]">.</span>
                                        <span className="animate-jump [animation-delay:400ms]">.</span>
                                        <span className="animate-jump [animation-delay:800ms]">.</span>
                                    </span>
                                </>
                            ) : (
                                <>
                                    Consultar <MagnifyingGlass size={22} />
                                </>
                            )}
                        </Button>
                    </form>
                </main>
            </motion.div>
            {completed && (
                <CSVDownload
                    separator=";"
                    ref={csvRef}
                    data={data.length > 0 ? data : []}
                    asyncOnClick={true}
                    filename={`data.csv`}
                />
            )}
        </div>

    );
}