import TestDataTable from "./testDataTable";
import { useContext, useState, useEffect, useMemo } from "react";
import * as Excel from "exceljs";

import SelectColumnFilter from "./SelectColumnFilter";
import { StudentsContext } from "../../App";
import { QuizzesContext } from "../../App";

import FilteredDataTable from "./FilteredDataTable";
import styled from 'styled-components'


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function TestDataContainer() {
    const students = useContext(StudentsContext);
    const quizzes = useContext(QuizzesContext);

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch("/grades")
        .then(resp => resp.json())
        .then(grades => {
            const gradesByDate = grades.reverse();
            setGrades(gradesByDate);
        });
    }, [])

    console.log("grades: ", grades);
    
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
        return grade.quiz_data.questions.map((question, index) => {
            return {
                key: `${grade.id}-${question.id}`,
                firstname: `${grade.user.first_name}`,
                lastname: `${grade.user.last_name}`,
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


    return (
        <div className="pt-10 flex justify-center max-w-screen">
        <div className="flex flex-col items-center">
            <p className="font-bold text-4xl text-dark-gray">Testing Data</p>
            <div className="flex w-full justify-end">
                <button
                    className="p-2 rounded text-white bg-dark-blue hover:bg-hover-blue">
                    Export All Testing Data to Excel
                </button>
            </div>
            <div className="w-full overflow-x-hidden overflow-x-scroll">
                <FilteredDataTable data={data} columns={columns}/>
            </div>
        </div>
    </div>
    )
}

export default TestDataContainer;