import {Lesson} from "./api";

export default function LessonList({lessons, selectLesson, selectedLesson}: { lessons: Lesson[], selectLesson: (a: number) => void, selectedLesson: Lesson|null }) {

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
    </div>
}