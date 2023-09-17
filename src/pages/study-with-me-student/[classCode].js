import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import StudentMileage from '../../components/StudentMileage'

const endpoint = 'https://script.google.com/macros/s/AKfycbzczX-owa5cqglIRbxZ6BisMUhn__wMTadIcrMz_qSNXfuePz-Otk6w3v0D5LJDqE18/exec'

export default function StudyWithMe() {
    const router = useRouter();

    const [studentsByClassCode, setStudentsByClassCode] = useState({})
    const [classByCode, setClassByCode] = useState({})
    const [viewMode, setViewMode] = useState('all')
    
    useEffect(() => {
        fetch(endpoint)
            .then((res) => res.json())
            .then((data) => {
                setStudentsByClassCode(data.studentsByClassCode)
                setClassByCode(data.classByCode)
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

                <div className="d-flex mb-2">
                    <div className="btn-group btn-group-sm">
                        <button type="button" className={'btn btn-outline-secondary' + (viewMode === 'all' ? ' active': '')} onClick={() => setViewMode('all')}>누적</button>
                        <button type="button" className={'btn btn-outline-secondary' + (viewMode === 'week' ? ' active': '')} onClick={() => setViewMode('week')}>이번주</button>
                    </div>
                </div>                

                <div className="row">

                    <div className="col-md-12">

                        <table className="content-table table table-striped">
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th style={{textAlign: 'center'}}>마일리지</th>
                                    <th>참여시간</th>
                                    <th>반</th>
                                    <th>멘토</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsByClassCode[router.query.classCode]?.sort(sort).map((item, index) => {
                                    return (
                                        <StudentMileage key={index} 
                                                           name={item.name} 
                                                           mileage={item.mileage[viewMode].mileage}
                                                           studySeconds={item.mileage[viewMode].studySeconds}
                                                           classSubName={item.classSubName}
                                                           mentor={item.mentor}
                                                           rank={index + 1}
                                                           />
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           
        </section>
    )
}
