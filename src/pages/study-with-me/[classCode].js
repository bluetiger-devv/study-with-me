import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

const endpoint = 'https://script.google.com/macros/s/AKfycbyQiPjSWnLoAQXWf_umft9IJ2RkqJ_ZHUVonkaBapIjGhXpOGqPvK8dUHsnjPql_c8o/exec'

export default function StudyWithMe() {
    const router = useRouter();

    const [studentsByClassCode, setStudentsByClassCode] = useState({})
    const [viewMode, setViewMode] = useState('all')
    
    useEffect(() => {
        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                setStudentsByClassCode(data.studentsByClassCode)
            })
    }, [])

    const sort = (a, b) => {
        if (a.mileage[viewMode].mileage === b.mileage[viewMode].mileage) {
            return a.mileage[viewMode].studySeconds > b.mileage[viewMode].studySeconds ? -1 : 1
        }

        return a.mileage[viewMode].mileage > b.mileage[viewMode].mileage ? -1 : 1
    }

    const convertSeconds = seconds => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds % 60)
        return `${hours}시간 ${minutes}분`
    }

    return (
        <section className="swm">
            <div className="container-fluid">
                <h1 className="title text-center mt-2 mb-3">STUDY WITH ME 마일리지</h1>

                <div className="row">
                    <div className="col-md-9">
                        <div className="mb-2">
                            <div className="btn-group btn-group-sm">
                                <button type="button" className={'btn btn-outline-secondary' + (viewMode === 'all' ? ' active': '')} onClick={() => setViewMode('all')}>누적</button>
                                <button type="button" className={'btn btn-outline-secondary' + (viewMode === 'week' ? ' active': '')} onClick={() => setViewMode('week')}>이번주</button>
                            </div>
                        </div>
                        <table className="content-table table table-striped">
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>마일리지</th>
                                    <th>참여시간</th>
                                    <th>반</th>
                                    <th>멘토</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsByClassCode[router.query.classCode]?.sort(sort).map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.mileage[viewMode].mileage}</td>
                                            <td>{convertSeconds(item.mileage[viewMode].studySeconds)}</td>
                                            <td>{item.classSubName}</td>
                                            <td>{item.mentor}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3">
                        <div>
                            <h4>클래스 목록</h4>
                            <ul className="list-group">
                            {
                                Object.keys(studentsByClassCode).map(classCode => {
                                    return (
                                        <li key={classCode} className={'list-group-item list-group-item-action' + (router.query.classCode == classCode ? ' active': '')}>
                                            <Link key={classCode} href={`/study-with-me/${classCode}`} className="link">{classCode}</Link>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>
    )
}