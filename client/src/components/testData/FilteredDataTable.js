import ReactTable from "react-table";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";
import { useMemo, useState } from "react";



function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <span>
        Search:{' '}
        <input
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: '1.1rem',
            border: '0',
          }}
        />
      </span>
    )
  }

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }


function FilteredDataTable({ data, columns, handleExcelExport }) {

    const filterTypes = useMemo(
        () => ({
        // Add a new fuzzyTextFilterFn filter type.
        //fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
            return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
        },
        }),
        []
    )
    
    const defaultColumn = useMemo(
        () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
        }),
        []
    )
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy
    )
    
  
    return (
      <div className="flex flex-col">
        <div className="flex w-full justify-end">
            <button
                className="p-2 rounded text-white bg-th-button hover:bg-th-secondary text-th-light-text"
                onClick={() => handleExcelExport(rows)}>
                Export Table to Excel
            </button>
        </div>
        <div className="mt-2 max-h-[75vh] max-w-[75vw] overflow-x-scroll overflow-y-scroll bg-gray-50 rounded">
          <div className="flex flex-col">
            <div className="sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="inline-block overflow-hidden align-middle border-b border-gray-100 shadow sm:rounded-lg">
                    
                  <table {...getTableProps()} className="reletive">
                      <thead>
                      {headerGroups.map(headerGroup => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map(column => (
                            <th className="bg-th-table-header-bg shadow px-1">
                                <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                  {column.render("Header")}
                                  <span>
                                    {column.disableSortBy ? "" : column.isSorted ? column.isSortedDesc ? "↑" : "↓" : "⇵"}
                                  </span>
                                </div>
                                <div>
                                  {column.canFilter ? column.render("Filter") : null}
                                </div>
                              </th>
                          ))}
                          </tr>
                      ))}
                      <tr>
                          <th
                          colSpan={visibleColumns.length}
                          style={{
                              textAlign: 'left',
                          }}
                          >
                          <GlobalFilter
                              preGlobalFilteredRows={preGlobalFilteredRows}
                              globalFilter={state.globalFilter}
                              setGlobalFilter={setGlobalFilter}
                          />
                          </th>
                      </tr>
                      </thead>
                      <tbody {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                          prepareRow(row)
                          return (
                          <tr {...row.getRowProps()} className="">
                              {row.cells.map(cell => {
                              return <td {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap border-b bg-th-card-bg border-gray-100 text-sm leading-5 text-gray-900">{cell.render('Cell')}</td>
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
    </div>
    )
    }

export default FilteredDataTable;
