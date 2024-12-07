import {Lesson, patchLesson} from "./api";
import React, {useEffect, useState} from "react";

export default function LessonEditor({lesson, setError, setLoading, fetchLessons}: {
    lesson: Lesson | null,
    setError: (a: string | null) => void,
    setLoading: (a: boolean) => void,
    fetchLessons: () => void
}) {
    const [lessonTitle, setLessonTitle] = useState("");
    const [playerUrl, setPlayerUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [manualPlayerUrl, setManualPlayerUrl] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    useEffect(() => {
        setLessonTitle(lesson?.title || "");
        setPlayerUrl(lesson?.videoUrl || "");
    }, [lesson]);

    function save() {
        if (lesson != null)
            patchLesson({
                id: lesson.id,
                title: lessonTitle,
                videoUrl: playerUrl,
                courseId: lesson.courseId,
                number: lesson.number
            });
        fetchLessons();
        setHasChanged(false);
    }

    useEffect(() => {
        try {
            const url = new URL(videoUrl);
            const video_id = url.pathname.split('-')[1];
            const [oid, id] = video_id.split('_');
            // https://vk.com/video_ext.php?oid=-227293370&id=456239078
            const newPlayerUrl = new URL("https://vk.com/video_ext.php");
            newPlayerUrl.searchParams.set("oid", "-" + oid);
            newPlayerUrl.searchParams.set("id", id);
            setPlayerUrl(newPlayerUrl.toString());
        } catch {
            return
        }
        //https://vk.com/video-227293370_456239078

    }, [videoUrl]);

    return <div className={"editor-block"} id={"lesson-editor"}>
        <h2>{lessonTitle}</h2>
        <label className={"doule-row"}>
            Тема урока <input name={"title"}
                              onChange={e => {
                                  setLessonTitle(e.target.value);
                                  setHasChanged(true);
                              }}
                              disabled={!lesson}
                              value={lessonTitle}/>
        </label>
        <label className={"doule-row"}>
            Ссылка на ВК видео

            <input placeholder={'https://vk.com/video-...'}
                   onChange={e => {
                       setVideoUrl(e.target.value);
                       setHasChanged(true);
                   }}/>
        </label>
        <details>
            <summary>Плеер</summary>
            <label>
                Указать ссылку на плеер вручную
                <input type={"checkbox"} onChange={e => setManualPlayerUrl(e.target.checked)}></input>
            </label><br/>
            <label className={"doule-row"}>
                Ссылка на плеер <input name={"video-url"}
                                       onChange={e => {
                                           setPlayerUrl(e.target.value);
                                           setHasChanged(true);
                                       }}
                                       disabled={!manualPlayerUrl || !lesson}
                                       value={playerUrl}/>
            </label>
        </details>


        <button onClick={e => save()} disabled={!lesson || !hasChanged}>Сохранить</button>

    </div>;
}