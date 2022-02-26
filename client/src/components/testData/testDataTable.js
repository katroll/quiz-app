
function TestDataTable({ data, columns }) {
    

    return (
        <div className="mt-2 overflow-x-scroll overflow-y-scroll">
                <div className="flex flex-col max-h-[80vh] max-w-[75vw]">
                    <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block overflow-hidden align-middle border-b border-light-gray shadow sm:rounded-lg">
                            <table className="reletive">
                                <thead className="">
                                    <tr>
                                        {columns.map(name => {
                                            return (
                                                <th key={name} className="px-6 py-3 border-b text-gray border-light-gray bg-white">
                                                    {name}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>

                                <tbody className="bg-white">
                                    {data.map((row) => {
                                        return (
                                            <tr key={data.key}>
                                                {columns.map(column => {
                                                    return (
                                                        <td key={column} className="px-6 py-4 whitespace-no-wrap border-b border-light-gray text-sm leading-5 text-gray">
                                                            {row[column]}
                                                        </td>
                                                    )
                                                })}
                                             </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default TestDataTable;