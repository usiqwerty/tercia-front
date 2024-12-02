import React, {useEffect, useState} from "react";
import {Course, getCourses, patchCourses} from "./api";

export default function CourseEditor({selectedCourse, setLoading, setError, setSelectedCourse}:
                                         { selectedCourse: Course | null, setLoading: (a: boolean) => void, setError: (a: string | null) => void, setSelectedCourse: (a: Course | null) => void }) {
    const [courses, setCourses] = useState([] as Course[]);
    const [formData, setFormData] = useState({
        name: "",
        cover_url: "",
        id: 0,
    } as Course);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };
    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            setCourses((await getCourses()).data);
        } catch (err) {
            setError("Не удалось загрузить курсы");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSave = async () => {
        if (!formData || !selectedCourse) return;
        try {
            setLoading(true);
            setError(null);
            await patchCourses(formData);
            alert("Информация сохранена");
            fetchCourses();
        } catch (err) {
            setError("Не удалось сохранить информацию " + err);
        } finally {
            setLoading(false);
        }
    };
    const handleCourseSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(e.target.value);
        const course = courses.find((c) => c.id === selectedId) || null;
        setSelectedCourse(course);
        if (course) setFormData(course);
        else
            setFormData({
                name: "",
                cover_url: "",
                id: 0,
            });
    };


    return <div className={"editor-block"}>
        <h2>Информация о курсе</h2>
        <select onChange={handleCourseSelected}
                value={selectedCourse?.id || ""}>
            <option value="" disabled>
                Выберите курс...
            </option>
            {courses.map((course) => (
                <option key={course.id} value={course.id}>
                    {course.name}
                </option>
            ))}
        </select>


        <label>
            Название:

            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!selectedCourse}
            />
        </label>

        <label>
            URL обложки:

            <input
                type="text"
                name="cover_url"
                value={formData.cover_url}
                onChange={handleInputChange}
                disabled={!selectedCourse}
            />
        </label>
        <button disabled={!selectedCourse} onClick={(e) => handleSave()}>
            Сохранить
        </button>
    </div>;
}