import { useMemo } from "react"

function CorrectAnswerFilter({ column: { filterValue, setFilter, preFilteredRows, id }, }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = useMemo(() => {
        const options = ["Yes", "No"]
        preFilteredRows.forEach(row => {
        // options.add(row.values[id])
        })

        return [...options.values()]
    }, [preFilteredRows])


    // Render a multi-select box
    return (
        <div className="flex flex-col items-start font-normal px-4 text-sm">
        
            <div className="space-x-2">
                <input 
                    type="radio" 
                    value="" 
                    name="correct"
                    onChange={e => {
                        setFilter(e.target.value || undefined)
                    }}
                    />
                <label>All</label>
            </div>

            <div className="space-x-2">
                <input 
                    type="radio" 
                    value="Yes" 
                    name="correct"
                    onChange={e => {
                        setFilter(e.target.value || undefined)
                    }}
                    />
                <label>Correct</label>
            </div>
            
            <div className="space-x-2">
                <input 
                    type="radio" 
                    value="No" 
                    name="correct"
                    onChange={e => {
                        setFilter(e.target.value || undefined)
                    }}
                    />
                <label>Incorrect</label>
            </div>
        
            
        </div>
    )

}

export default CorrectAnswerFilter;