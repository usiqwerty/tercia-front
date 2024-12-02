import React, {useEffect, useState} from "react";
import {Course, getCourseLessons, getCourses, getLesson, Lesson, patchCourses} from "./api";
import CourseEditor from "./CourseEditor";
import LessonEditor from "./LessonEditor";
import "./App.css";
import LessonList from "./LessonList";

function App() {
    const [selectedCourse, setSelectedCourse] = useState(null as Course | null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null as string | null);
    const [lessons, setLessons] = useState([] as Lesson[]);
    const [selectedLesson, setSelectedLesson] = useState(null as Lesson | null);

    async function fetchLessons() {
        if (selectedCourse != null)
            setLessons((await getCourseLessons(selectedCourse.id)).data)
    }
    useEffect(() => {
        fetchLessons();
    }, [selectedCourse]);
    return (
        <>
            <h1>Редактор курсов</h1>
            <div id={'editor-container'}>

                {error && <p style={{color: "red"}}>{error}</p>}
                {loading && <p>Загрузка...</p>}

                <CourseEditor selectedCourse={selectedCourse} setError={setError} setLoading={setLoading}
                              setSelectedCourse={setSelectedCourse}/>
                <LessonEditor lesson={selectedLesson} setError={setError} setLoading={setLoading}/>
                <LessonList lessons={lessons} selectedLesson={selectedLesson} selectLesson={async id => setSelectedLesson((await getLesson(id)).data)}/>
            </div>
        </>

    );
}

export default App;
