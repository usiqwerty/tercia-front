import {createLesson, Lesson} from "./api";

export default function LessonList({lessons, selectLesson, selectedLesson, onCreateLesson}: {
    lessons: Lesson[],
    selectLesson: (a: number) => void,
    selectedLesson: Lesson | null,
    onCreateLesson: () => void
}) {

    return <div className={"editor-block lesson-list"}>
        <h2>Список уроков</h2>
        {lessons.map(lesson =>
            <div key={lesson.id}>
                <button onClick={e => selectLesson(lesson.id)}
                        disabled={lesson.id === selectedLesson?.id}>{lesson.title}</button>
                <button disabled>{"/\\"}</button>
                <button disabled>{"\\/"}</button>
            </div>
        )}
        <button onClick={(e)=>onCreateLesson()}>Добавить урок</button>
    </div>
}