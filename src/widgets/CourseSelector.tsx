import {Course, createCourse, deleteCourse} from "../api";
import React from "react";

export function CourseSelector(props: {
    selectedCourse: Course | null,
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    courses: Course[],
    setSelectedCourse: (c: Course | null) => void,
    fetchCourses: () => Promise<void>
}) {
    async function onCreateCourse(e: React.MouseEvent) {
        await createCourse();
        await props.fetchCourses();
        props.setSelectedCourse(null);
    }

    async function onDeleteCourse(e: React.MouseEvent) {
        if (props.selectedCourse == null)
            return;
        await deleteCourse(props.selectedCourse.id);
        await props.fetchCourses();
        props.setSelectedCourse(null);
    }

    return <>
        <div>
            <button onClick={onCreateCourse}>Создать курс</button>
            <button onClick={onDeleteCourse} disabled={!props.selectedCourse}>Удалить курс</button>
        </div>
        <select onChange={props.onSelect}
                value={props.selectedCourse?.id || ""}>
            <option value="" disabled>
                Выберите курс...
            </option>
            {props.courses.map(course =>
                <option key={course.id} value={course.id}>
                    {course.name}
                </option>)}
        </select>
    </>;
}