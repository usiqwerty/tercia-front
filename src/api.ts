import axios from "axios";


export type Course = {
    name: string;
    coverUrl: string;
    id: number;
};
export type Lesson = {
    title: string;
    videoUrl: string;
    id: number;
    courseId: number;
    number: number;
};
// Define API server address
export const API_SERVER = "http://130.193.58.142:8000";

// Course-specific API
export async function createCourse() {
    return await axios.post(`${API_SERVER}/add-course`, {name: "Новый курс", cover_url: "", id: 0}, {
        headers: {"Content-Type": "application/json"},
    });
}

export async function getCourses() {
    return await axios.get<Course[]>(`${API_SERVER}/get-courses`, {
        headers: {"Content-Type": "application/json"},
    });
}

export async function deleteCourse(id: number) {
    return await axios.delete<Lesson>(`${API_SERVER}/delete-course`, {params: {course_id: id}});
}

export async function createLesson(lesson: Lesson) {
    return await axios.post(`${API_SERVER}/add-lesson`, lesson, {
        headers: {"Content-Type": "application/json"},
    });
}

export async function patchCourses(formData: Course) {
    await axios.patch(`${API_SERVER}/edit-course`, formData, {
        headers: {"Content-Type": "application/json"},
    });
}

//Lesson-specific API
export async function getCourseLessons(course_id: number) {
    return await axios.get<Lesson[]>(`${API_SERVER}/get-course-lessons`, {params: {course_id: course_id}});
}

export async function getLesson(id: number) {
    return await axios.get<Lesson>(`${API_SERVER}/get-lesson`, {params: {lesson_id: id}});
}

export async function patchLesson(lesson: Lesson) {
    await axios.patch(`${API_SERVER}/edit-lesson`, lesson, {
        headers: {"Content-Type": "application/json"},
    });
}
export async function saveLessons(course_id: number, lessons: Lesson[]) {
    await axios.put(`${API_SERVER}/save-course-lessons`, lessons, {
        params: {courseId: course_id},
        headers: {"Content-Type": "application/json"},
    });
}