import React, {useEffect, useState} from "react";
import {Course, createLesson, getCourseLessons, getCourses, getLesson, Lesson, patchCourses} from "./api";
import CourseEditorBlock from "./CourseEditorBlock";
import LessonEditorBlock from "./LessonEditorBlock";
import "./App.css";
import LessonListBlock from "./LessonListBlock";

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

    async function onCreateLesson() {
        if (selectedCourse == null)
            return;

        let lesson = {
            title: "Новый урок",
            videoUrl: "",
            id: 0,
            courseId: selectedCourse.id,
            number: lessons.length + 1
        };
        await createLesson(lesson);
        await fetchLessons()
    }

    return (
        <>
            <h1>Редактор курсов</h1>
            {error && <p style={{color: "red"}}>{error}</p>}
            {loading && <p>Загрузка...</p>}
            <div id={'editor-container'}>
                <CourseEditorBlock selectedCourse={selectedCourse}
                                   setError={setError}
                                   setLoading={setLoading}
                                   setSelectedCourse={setSelectedCourse}/>
                <LessonListBlock lessons={lessons}
                                 selectedLesson={selectedLesson}
                                 selectLesson={async id => setSelectedLesson((await getLesson(id)).data)}
                                 onCreateLesson={onCreateLesson}
                                 setLessons={setLessons}
                                 courseId={selectedCourse?.id || null}/>
                <LessonEditorBlock lesson={selectedLesson}
                                   setError={setError}
                                   setLoading={setLoading}
                                   fetchLessons={fetchLessons}
                                   error={error}/>
            </div>
        </>

    );
}

export default App;
