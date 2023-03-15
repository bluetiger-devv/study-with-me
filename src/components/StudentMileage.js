export default function StudentMileage({ name, mileage, studySeconds, classSubName, mentor, rank }) {

    const convertSeconds = seconds => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor(seconds % 60)
        return `${hours}시간 ${minutes}분`
    }

    return (
        <tr className={{'rank1': rank === 1, 'rank2': rank === 2, 'rank3': rank === 3}}>
            <td>{name}</td>
            <td>{mileage}</td>
            <td>{convertSeconds(studySeconds)}</td>
            <td>{classSubName}</td>
            <td>{mentor}</td>
        </tr>
    )
}