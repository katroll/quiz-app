import TestDataTable from "./testDataTable";

function TestDataContainer() {


    return (
        <div className="pt-10 flex justify-center w-full">
        <div className="flex flex-col items-center">
            <p className="font-bold text-4xl text-dark-gray">Testing Data</p>
            <div className="flex w-full justify-end">
                <button
                    className="p-2 rounded text-white bg-dark-blue hover:bg-hover-blue">
                    Export All Testing Data to Excel
                </button>
            </div>
            <TestDataTable />
        </div>
    </div>
    )
}

export default TestDataContainer;