import { Link } from "react-router-dom"
import { AddStudent } from './add-student';

export const Students = () => {
    return <>
        <h3>Students</h3>
        <Link to={'/'}>classbook</Link>
        <AddStudent />
    </>
}