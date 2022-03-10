import { useMemo } from "react"

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id }, }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
        const options = ["beginner", "intermediate", "advanced", "english", "misc"]
        preFilteredRows.forEach(row => {
        // options.add(row.values[id])
        })

        return [...options.values()]
    }, [preFilteredRows])


    // Render a multi-select box
    return (
        <select
        value={filterValue}
        onChange={e => {
            setFilter(e.target.value || undefined)
        }}
        className="rounded ml-8 text-sm"
        >
        <option value="">All</option>
        {options.map((option, i) => (
            <option key={i} value={option}>
            {option}
            </option>
        ))}
        </select>
    )

}

export default SelectColumnFilter;