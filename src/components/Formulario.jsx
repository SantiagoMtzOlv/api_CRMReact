import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import AlertaError from './AlertaError';
import Spinner from './Spinner';

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto.').max(20, 'El Nombre es muy largo').required('El Nombre del Cliente es Obligatorio.'),
        empresa: Yup.string().required('El Nombre de la Empresa es obligatorio.'),
        email: Yup.string().email('Email no válido').required('El Email es obligatorio'),
        telefono: Yup.number().positive('Número no válido').integer('Número no válido').typeError('El Número no es válido'),
    });

    const handleSubmit = async (valores) => {
        try{
            let respuesta;
            if(cliente.id){
                /* Editando registro */
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })

            }
            else{
                /* Nuevo Registro */
                const url = 'http://localhost:4000/clientes';
                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })
            }
            await respuesta.json();
            navigate('/clientes');
        }
        catch(error){
            console.log(error)
        }
    }

  return (
      cargando ? <Spinner /> : (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }</h1>

            <Formik
                initialValues={{ 
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}
                enableReinitialize={true}
                onSubmit={ async(values, {resetForm}) => {
                    await handleSubmit(values);

                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) =>{
                    return (

                    <Form
                        className='mt-10'
                    >
                        <div className='mb-4'>
                            <label 
                                htmlFor="nombre"
                                className='text-gray-800'
                            >Nombre:</label>
                            <Field 
                                type="text"
                                id="nombre"
                                name="nombre"
                                className={`mt-2 block w-full p-3 bg-gray-50 ${errors.nombre && touched.nombre ? 'border-2 border-red-600 outline-red-600' : ''}`}
                                placeholder="Nombre del Cliente"
                            />
                            {errors.nombre && touched.nombre ? (
                                <AlertaError error={errors.nombre} />
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor="empresa"
                                className='text-gray-800'
                            >Empresa:</label>
                            <Field 
                                type="text"
                                id="empresa"
                                name="empresa"
                                className={`mt-2 block w-full p-3 bg-gray-50 ${errors.empresa && touched.empresa ? 'border-2 border-red-600 outline-red-600' : ''}`}
                                placeholder="Empresa del Cliente"
                            />
                            {errors.empresa && touched.empresa ? (
                                <AlertaError error={errors.empresa} />
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor="email"
                                className='text-gray-800'
                            >Email:</label>
                            <Field 
                                type="email"
                                id="email"
                                name="email"
                                className={`mt-2 block w-full p-3 bg-gray-50 ${errors.email && touched.email ? 'border-2 border-red-600 outline-red-600' : ''}`}
                                placeholder="Email del Cliente"
                            />
                            {errors.email && touched.email ? (
                                <AlertaError error={errors.email} />
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor="telefono"
                                className='text-gray-800'
                            >Teléfono:</label>
                            <Field 
                                type="tel"
                                id="telefono"
                                name="telefono"
                                className={`mt-2 block w-full p-3 bg-gray-50 ${errors.telefono && touched.telefono ? 'border-2 border-red-600 outline-red-600' : ''}`}
                                placeholder="Teléfono del Cliente"
                            />
                            {errors.telefono && touched.telefono ? (
                                <AlertaError error={errors.telefono} />
                            ) : null}
                        </div>
                        <div className='mb-4'>
                            <label 
                                htmlFor="notas"
                                className='text-gray-800'
                            >Notas:</label>
                            <Field 
                                as="textarea"
                                type="text"
                                id="notas"
                                name="notas"
                                className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                placeholder="Notas sobre el Cliente"
                            />
                        </div>
                        <input 
                            type="submit" 
                            value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente' }
                            className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg hover:bg-blue-700' 
                        />
                    </Form>
                )}}
            </Formik>
        </div>
    )
  )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario