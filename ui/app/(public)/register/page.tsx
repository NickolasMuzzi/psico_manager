"use client"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain } from "lucide-react"
import { useRouter } from "next/navigation"
import { Formik, Form, FormikValues } from 'formik'
import { axiosConfig } from "@/utils/axios.config"
import { toast } from 'react-toastify'
export default function RegisterPage () {
    const navigate = useRouter()
    const handleSubmit = ( values: FormikValues ) => {
        const senha = values.senha
        const repetir = values.repetir_senha
        if ( senha !== repetir ) {
            toast.error( 'As senhas são diferentes' )
            return
        }
        axiosConfig.post( '/users', values ).then( ( res ) => {
            if ( res.status === 200 ) {
                toast.success( 'Conta Criada com sucesso.' )
            }
        } )
    }

    return ( <div className="w-full h-full flex flex-col justify-center items-center ">
        <Card className="w-6/12 h-6/12 flex-col justify-center items-center p-12">
            <CardTitle className="w-full h-1/12 text-center flex justify-center">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-foreground">PsicoManager</h2>
                        <p className="text-xs text-muted-foreground">Gestão Clínica</p>
                    </div>
                </div>
            </CardTitle>
            <Formik initialValues={{}} onSubmit={( e ) => handleSubmit( e )}>
                {( formik ) => (
                    <Form>
                        <div className="w-12/12 h-12/12 grid grid-cols-2 grid-rows-6 border-1 gap-2 border-zinc-200 rounded-xl p-6">
                            <Input name="nome" placeholder="Nome" type="text" className="w-12/12" />
                            <Input name="idade" placeholder="Idade" type="text" className="w-12/12" />
                            <Input name="cpf" placeholder="CPF" type="text" className="w-12/12" />
                            <Input name="sexo" placeholder="Sexo" type="text" className="w-12/12" />
                            <Input name="email" placeholder="E-mail" type="text" className="w-12/12" />
                            <Input name="telefone" placeholder="Telefone" type="text" className="w-12/12" />
                            <Input name="data_nascimento" placeholder="Data de Nascimento" type="text" className="w-12/12" />
                            <Input name="senha" placeholder="Senha" type="password" className="w-12/12" />
                            <Input name="repetir_senha" placeholder="Confirmar Senha" type="password" className="w-12/12" />
                            <div className="w-12/12 col-span-2 flex justify-center">

                                <Button className="rounded-md" type='submit' >
                                    Cadastrar
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Card >
    </div > )
}
