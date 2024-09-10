import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { getAllStudents } from "../students/students.slice";
import { getAllLessons, addRate } from "./classbook.slice";
import styles from './style.module.css';
import { AddLesson } from "../../utils/add-lesson";
import { Box, Button, Modal } from "@mui/material";
import { IStudent } from "../students/types";

export const ClassBook = () => {

    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<IStudent | null>(null);
    const [currentRate, setCurrentRate] = useState<number>(0);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
    console.log(currentRate);

    const students = useAppSelector(state => state.students.list);
    const lessons = useAppSelector(state => state.classbook.lessons);
    const dispatch = useAppDispatch();

    const empty = new Array(12 - lessons.length).fill(null);

    const handleRate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentUser && selectedLessonId) {
            const data = new FormData(e.currentTarget);
            const rate = Number(data.get('rate'));
            setCurrentRate(rate);
            await dispatch(addRate({ lessonId: selectedLessonId, rating: { id: new Date().toISOString(), student: currentUser.id, rate: rate.toString() } }));
            setOpen(false);
        }
    };

    const handleOpen = (lessonId: string) => {
        setSelectedLessonId(lessonId);
        setOpen(true);
    };

    useEffect(() => {
        dispatch(getAllStudents());
        dispatch(getAllLessons());
    }, [dispatch]);

    return <>
        <div className={styles.info}>
            <h1>Classbook</h1>
            <Link to={'/students'}>Students</Link>
            <h3>Students: {students.length}</h3>
            <p>Lessons: {lessons.length}</p>
        </div>

        <hr />
        <div className={styles.info}>
            <AddLesson />
        </div>
        <hr />

        <table className={styles.table}>
            <thead>
                <tr>
                    <th rowSpan={2}>Student</th>
                    <th colSpan={12}>Lessons</th>
                </tr>
                <tr>
                    {
                        lessons.map(lesson => <th key={lesson.id} className={styles.vertical}>{lesson.title}</th>)
                    }
                    {
                        empty.map((less, index) =>
                            <th key={index}></th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    students.map(student =>
                        <tr key={student.id}>
                            <td>{student.name} {student.surname}</td>
                            {
                                lessons.map(lesson => {
                                    const found = lesson.ratings.find(rate => rate.student === student.id);
                                    return <td key={lesson.id}>
                                        {found?.rate || <Button className={styles.button} onClick={() => {
                                            setCurrentUser(student);
                                            handleOpen(lesson.id);
                                        }}>Rate</Button>}
                                    </td>
                                })
                            }
                            {
                                empty.map((emp, i) =>
                                    <td key={i}></td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Button onClick={() => setOpen(false)} style={{ position: 'absolute', right: 0, top: 0 }}>X</Button>

                <h1>Rate Here</h1>
                <p>{currentUser?.name} {currentUser?.surname}</p>

                <form onSubmit={handleRate}>
                    <input
                        type="number"
                        max={10}
                        min={2}
                        name="rate"
                        onChange={(e) => setCurrentRate(+e.target.value)}
                    />
                    <Button type="submit">Rate</Button>
                </form>
                <div style={{
                    color: currentRate <= 4 ? 'red' :
                        currentRate <= 6 ? 'yellow' :
                            'green',
                }}>
                    {currentRate === 0 ? 'No rating' :
                        currentRate <= 4 ? 'Rate is low' :
                            currentRate <= 6 ? 'Rate is acceptable' :
                                'Rate is great'}
                </div>
            </Box>
        </Modal>
    </>
}
