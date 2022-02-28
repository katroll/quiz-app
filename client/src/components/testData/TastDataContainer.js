import TestDataTable from "./testDataTable";
import { useState, useEffect, useMemo } from "react";
import * as Excel from "exceljs";

import {saveAs} from "file-saver";

import SelectColumnFilter from "./SelectColumnFilter";

import FilteredDataTable from "./FilteredDataTable";





function TestDataContainer() {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("/grades")
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate);
        });
    }, [])
    
    //const columns = ["Student Name", "Username", "Student ID", "Test Name", "Test Score", "Question Number", "Correct", "Day/Time Completed"]

    const columns = useMemo(
        () => [
            
            {
            Header: 'First Name',
            accessor: 'firstName',
            },
            {
            Header: 'Last Name',
            accessor: 'lastName',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
            },
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Student ID',
                accessor: 'studentId',
            },
            {
                Header: 'Test Name',
                accessor: 'testName',
            },
            {
                Header: 'Test Category',
                accessor: 'testCategory',
                Filter: SelectColumnFilter,
            },
            {
                Header: 'Test Score',
                accessor: 'testScore',
            },
            {
                Header: 'Question Number',
                accessor: 'questionNumber',
            },
            {
                Header: 'Correct?',
                accessor: 'correct',
            },
            {
                Header: 'Day/Time Completed',
                accessor: 'completedAt',
            },
        ],
        []
      )

    const data = grades.map(grade => {
        const results = grade.results;
        return grade.quiz_data.questions.sort((a, b) => a.number - b.number).map((question, index) => {
            return {
                key: `${grade.id}-${question.id}`,
                firstName: grade.user.first_name,
                lastName: grade.user.last_name,
                username: grade.user.username,
                studentId: grade.user.id,
                testName: grade.quiz_data.quiz.name,
                testCategory: grade.quiz_data.quiz.category,
                testScore: grade.score,
                questionNumber: index + 1,
                correct: results[index] === question.answer ? "Yes" : "No",
                completedAt: grade.updated_at
            }
        })
    }).flat();

    async function handleExcelExport(rows) {
        const exportData = rows.map(row => {
            return row.values
        })
       
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("My Sheet");

        worksheet.columns = [
            {header: 'First Name', key: 'firstName', width: 10},
            {header: 'Last Name', key: 'lastName', width: 32}, 
            {header: 'Username', key: 'username', width: 15,},
            {header: 'Student ID', key: 'studentId', width: 15,},
            {header: 'Test Name', key: 'testName', width: 15,},
            {header: 'Test Category', key: 'testCategory', width: 15,},
            {header: 'Test Score', key: 'testScore', width: 15,},
            {header: 'Question Number', key: 'questionNumber', width: 15,},
            {header: 'Correct?', key: 'correct', width: 15,},
            {header: 'Day/Time Completed', key: 'completedAt', width: 15,},
          ];

      
        worksheet.addRows(exportData);
    
        const buffer = await workbook.xlsx.writeBuffer();
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileExtension = '.xlsx';

        const blob = new Blob([buffer], {type: fileType});

        saveAs(blob, 'test-data' + fileExtension);

    }


    return (
        <div className="pt-10 flex justify-center">
        <div className="flex flex-col items-center">
            <p className="font-bold text-4xl text-th-title-text">Testing Data</p>
            <div className="w-full overflow-x-hidden overflow-x-scroll">
                <FilteredDataTable data={data} columns={columns} handleExcelExport={handleExcelExport}/>
            </div>
        </div>
    </div>
    )
}

export default TestDataContainer;
