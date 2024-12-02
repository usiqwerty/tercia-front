import {Lesson} from "./api";

export default function LessonList({lessons, selectLesson, selectedLesson}: { lessons: Lesson[], selectLesson: (a: number) => void, selectedLesson: Lesson|null }) {

    return <div className={"editor-block lesson-list"}>
        {lessons.map(lesson =>
            <div>
                <button onClick={e => selectLesson(lesson.id)}
                        disabled={lesson.id === selectedLesson?.id}>{lesson.title}</button>
            </div>
        )}
    </div>
}