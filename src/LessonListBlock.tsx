import {Lesson, saveLessons} from "./api";
import React, {useState} from "react";

export default function LessonListBlock({lessons, selectLesson, selectedLesson, onCreateLesson, setLessons, courseId}: {
    lessons: Lesson[],
    selectLesson: (a: number) => void,
    selectedLesson: Lesson | null,
    onCreateLesson: () => void,
    setLessons: (a: Lesson[]) => void,
    courseId: number | null
}) {
    const [orderChanged, setOrderChanged] = useState(false);

    function moveUp(index: number) {
        if (index <= 0)
            return;
        let newLessons: Lesson[] = [];
        lessons.forEach(val => newLessons.push(Object.assign({}, val)));
        console.log(lessons, index);
        const lower = newLessons[index];
        const upper = newLessons[index - 1];
        lower.number--;
        upper.number++;
        newLessons[index - 1] = lower;
        newLessons[index] = upper;
        setLessons(newLessons);
        setOrderChanged(true);
    }

    function onSaveList(e: React.MouseEvent){
        saveLessons(courseId as number, lessons);
        setOrderChanged(false)
    }
    return <div className={"editor-block lesson-list"}>
        <h2>Список уроков</h2>

        {lessons.map(lesson =>
            <div key={lesson.id}>
                <button onClick={e => selectLesson(lesson.id)}
                        disabled={lesson.id === selectedLesson?.id}>{lesson.number}. {lesson.title}</button>
                <button onClick={e => moveUp(lesson.number - 1)}>{"/\\"}</button>
                <button onClick={e => moveUp(lesson.number)}>{"\\/"}</button>
            </div>
        )}
        <button onClick={(e) => onCreateLesson()}>Добавить урок</button>
        <button onClick={onSaveList} disabled={!orderChanged || courseId == null}>Сохранить</button>
    </div>
}