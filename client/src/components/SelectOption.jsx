const SelectOption = ({option}) => {
    return (
            <option value={option.id}>{option.name}</option>
        )
}

export default SelectOption