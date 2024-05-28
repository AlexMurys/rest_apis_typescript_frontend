import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { getProductsById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";


export async function loader({ params }: LoaderFunctionArgs) {
    const id = params.id;
    if (id) {
        const product = await getProductsById(+id)
        if (!product) {
            return redirect('/')
        }
        return product

    }

}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = '';

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
        console.log(error)
    }
    if (error.length) { return error }
    if (params.id) {
        await updateProduct(data, +params.id)
        return redirect('/')
    }
}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

const EditProduct = () => {

    const error = useActionData() as string
    const product = useLoaderData() as Product

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Productos</h2>
                <Link to={"/"} className="rounded-md bg-indigo-600 text-white p-3 text-sm font-bold shadow-sm hover:bg-indigo-500">
                    Volver a Productos
                </Link>
            </div>
            {
                error && <ErrorMessage>{error}</ErrorMessage>
            }
            <Form
                className="mt-10"
                method="POST"

            >

                <ProductForm product={product} />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />

            </Form>
        </>
    )
}

export default EditProduct