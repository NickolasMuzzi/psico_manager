"use client"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Brain, Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Formik, Form, FormikValues } from 'formik'
import { axiosConfig } from "@/utils/axios.config"
import { toast } from 'react-toastify'
import { InputFormik } from "@/components/InputFormik"
import { SelectInput } from "@/components/SelectInput"
import { DateTime } from 'luxon'
import { MdArrowBack, MdArrowForward, MdArrowRight, MdSkipNext } from 'react-icons/md'
export default function RegisterPage () {
    const navigate = useRouter()
    const handleSubmit = ( values: FormikValues ) => {
        const senha = values.senha
        const repetir = values.repetir_senha
        if ( senha !== repetir ) {

            toast.error( 'As senhas são diferentes' )
            return
        }
        delete values.repetir_senha
        const formattedValues = { ...values, data_nascimento: DateTime.fromISO( values.data_nascimento ).toFormat( "dd/MM/yyyy" ) }
        axiosConfig.post( '/users/create', formattedValues ).then( ( res ) => {
            if ( res.status === 200 ) {
                toast.success( 'Conta Criada com sucesso.' )
            }
        } ).catch( () => {
            values.senha = ''
            values.repetir_senha = ''
        } )
    }

    return ( <div className="w-full h-full flex flex-col justify-center items-center ">
        <Card className="w-8/12 h-6/12 flex-col justify-center items-center p-12">
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
            <Formik initialValues={{
                nome: '',
                idade: 0,
                cpf: '',
                sexo: '',
                email: '',
                telefone: '',
                data_nascimento: '',
                senha: '',
                repetir_senha: ''
            }} onSubmit={( values ) => handleSubmit( values )}>
                {( formik ) => (
                    <Form className="w-full h-full">
                        <div className="w-full h-12/12 grid grid-cols-2 grid-rows-6 border-1 gap-2 border-zinc-200 rounded-xl p-6">
                            <InputFormik name="nome" placeholder="Nome" type="text" />
                            <InputFormik name="cpf" mask={'000.000.000-00'} placeholder="CPF" type="text" />
                            <SelectInput
                                name='sexo'
                                placeholder="Sexo"
                                options={[
                                    { id: '1', value: 'Masculino' },
                                    { id: '2', value: 'Feminino' },
                                    { id: '3', value: 'Outro' }
                                ]}
                                getOptionValue={( option ) => option.id}
                                getOptionLabel={( option ) => option.value}
                            />
                            <InputFormik name="email" placeholder="E-mail" type="email" />
                            <InputFormik mask="(00) 00000-0000" name="telefone" placeholder="Telefone" type="tel" />
                            <InputFormik name="data_nascimento" placeholder="Data de Nascimento" type="date" />
                            <InputFormik name="senha" placeholder="Senha" type="password" />
                            <InputFormik name="repetir_senha" placeholder="Confirmar Senha" type="password" />

                            <div className="w-12/12  flex justify-end">
                                <Button className="rounded-sm border-1 border-black cursor-pointer" type='submit' >
                                    Já possuo cadastro<MdArrowBack />
                                </Button>
                            </div>
                            <div className="w-12/12  flex justify-start">
                                <Button className="rounded-sm bg-black cursor-pointer text-white" type='submit' >
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
