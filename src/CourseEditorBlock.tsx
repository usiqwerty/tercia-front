import React, {useEffect, useState} from "react";
import {Course, getCourses, patchCourses} from "./api";
import {CourseSelector} from "./widgets/CourseSelector";

export default function CourseEditorBlock(props: {
    selectedCourse: Course | null,
    setLoading: (a: boolean) => void,
    setError: (a: string | null) => void,
    setSelectedCourse: (a: Course | null) => void
}) {
    const [courses, setCourses] = useState([] as Course[]);
    const [courseName, setCourseName] = useState("");
    const [coverUrl, setCoverUrl] = useState("");
    const [courseId, setCourseId] = useState(0);

    const refreshCourseList = async () => {
        try {
            props.setLoading(true);
            props.setError(null);
            setCourses((await getCourses()).data);
        } catch (err) {
            props.setError("Не удалось загрузить курсы");
        } finally {
            props.setLoading(false);
        }
    };
    useEffect(() => {
        refreshCourseList();
    }, []);

    const handleSave = async () => {
        if (!courseId || !props.selectedCourse) return;
        try {
            props.setLoading(true);
            props.setError(null);
            await patchCourses({name: courseName, coverUrl: coverUrl, id: courseId});
            alert("Информация сохранена");
            await refreshCourseList();
        } catch (err) {
            props.setError("Не удалось сохранить информацию " + err);
        } finally {
            props.setLoading(false);
        }
    };
    const handleCourseSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const course = courses.find((c) => c.id === selectedId) || null;
        props.setSelectedCourse(course);
        if (course) {
            setCourseName(course.name);
            setCourseId(course.id);
            setCoverUrl(course.coverUrl)
        } else {
            setCourseName("");
            setCourseId(0);
            setCoverUrl("")
        }
    };

    return <div className={"editor-block"} id={"course-editor"}>
        <h2>Информация о курсе</h2>
        <CourseSelector selectedCourse={props.selectedCourse}
                        onSelect={handleCourseSelected}
                        courses={courses}
                        setSelectedCourse={props.setSelectedCourse}
                        fetchCourses={refreshCourseList}/>


        <label className={"doule-row"}>
            Название:

            <input
                type="text"
                name="name"
                value={courseName}
                onChange={e => setCourseName(e.target.value)}
                disabled={!props.selectedCourse}
            />
        </label>

        <label className={"doule-row"}>
            URL обложки:

            <input
                type="text"
                name="cover_url"
                value={coverUrl}
                onChange={e => setCoverUrl(e.target.value)}
                disabled={!props.selectedCourse}
            />
        </label>
        <button disabled={!props.selectedCourse} onClick={(e) => handleSave()}>
            Сохранить
        </button>
    </div>;
}