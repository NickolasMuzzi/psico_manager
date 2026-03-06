import { useField, useFormikContext } from "formik"
import ReactSelect, { SingleValue } from "react-select"

type Option = {
    id: string
    value: string
}



export function SelectInput ( props: React.ComponentProps<typeof ReactSelect<Option>> & { name: string, options: Option[] } ) {
    const [field] = useField( props.name )
    const { setFieldValue } = useFormikContext()

    function handleChange ( option: SingleValue<Option> ) {
        setFieldValue( props.name, option )
    }

    return (
        <ReactSelect<Option>
            {...props}
            {...field}
            options={props.options}
            onChange={handleChange}
        />
    )
}
